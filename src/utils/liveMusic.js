/**
 * Live music fallback — a gentle veena-and-tanpura piece in Raga Mohanam,
 * generated in the browser with the Web Audio API. Used only if none of
 * the music files can be played, so the music button always works.
 */
const RATIO = { S: 1, R: 9 / 8, G: 5 / 4, P: 3 / 2, D: 5 / 3 };
const PHRASES = [
  "G P D S' D P G - R G P G R S R -",
  "G G P D P G R S D. S R G S - - -",
  "P D S' R' S' D P - P D S' D P G P -",
  "G' R' S' D S' D P - G P D P G R S -",
];

function parse(line) {
  return line.split(" ").map((tok) => {
    if (tok === "-") return null;
    let r = RATIO[tok[0]];
    for (const c of tok.slice(1)) r *= c === "'" ? 2 : c === "." ? 0.5 : 1;
    return r;
  });
}

export class LiveRaga {
  constructor({ sa = 277.18, bpm = 84, volume = 0.5 } = {}) {
    this.sa = sa;
    this.beat = 60 / bpm;
    this.volume = volume;
    this.ctx = null;
    this.timer = null;
  }

  async start() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) throw new Error("Web Audio not supported");
    if (!this.ctx) {
      this.ctx = new AC();
      const c = this.ctx;
      this.master = c.createGain();
      this.master.gain.value = 0;
      // simple reverb from decaying noise
      const len = c.sampleRate * 2.4;
      const ir = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.5));
      }
      this.verb = c.createConvolver();
      this.verb.buffer = ir;
      this.wet = c.createGain();
      this.wet.gain.value = 0.35;
      this.verb.connect(this.wet).connect(this.master);
      this.master.connect(c.destination);
    }
    await this.ctx.resume();
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.5);
    this.next = this.ctx.currentTime + 0.1;
    this.step = 0;
    this.notes = PHRASES.flatMap(parse);
    this.droneNext = this.ctx.currentTime + 0.05;
    this.droneStep = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => this.schedule(), 100);
  }

  stop() {
    clearInterval(this.timer);
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(0, t + 0.5);
    setTimeout(() => this.ctx?.suspend(), 600);
  }

  pluck(freq, when, dur, gain, bright = 2400) {
    const c = this.ctx;
    const osc = c.createOscillator();
    const osc2 = c.createOscillator();
    osc.type = "sawtooth";
    osc2.type = "triangle";
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 2.001;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(bright, when);
    lp.frequency.exponentialRampToValueAtTime(400, when + dur);
    const env = c.createGain();
    env.gain.setValueAtTime(0.0001, when);
    env.gain.exponentialRampToValueAtTime(gain, when + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(lp);
    osc2.connect(lp);
    lp.connect(env);
    env.connect(this.master);
    env.connect(this.verb);
    osc.start(when);
    osc2.start(when);
    osc.stop(when + dur + 0.05);
    osc2.stop(when + dur + 0.05);
  }

  schedule() {
    const c = this.ctx;
    const horizon = c.currentTime + 0.4;
    // tanpura: P S S S. repeating
    const drone = [0.75, 1, 1, 0.5];
    while (this.droneNext < horizon) {
      this.pluck((this.sa / 2) * drone[this.droneStep % 4], this.droneNext, 3.2, 0.09, 1600);
      this.droneNext += 1.25;
      this.droneStep++;
    }
    while (this.next < horizon) {
      const r = this.notes[this.step % this.notes.length];
      if (r) this.pluck(this.sa * r, this.next, 1.6, 0.16, 3200);
      this.next += this.beat;
      this.step++;
    }
  }
}
