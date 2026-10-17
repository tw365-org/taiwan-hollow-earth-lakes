/**
 * 地底聲納與深層水脈合成音效引擎 (Web Audio API Synthesizer)
 * 零外部音訊檔案依賴，純演算法即時合成：
 * - 地底聲納探測波 (Sonar Ping)
 * - 湖泊浮出共鳴水晶音 (Bioluminescent Surface Chime)
 * - 任務成功 / 問答正確交響和弦 (Victory Fanfare)
 * - 警告與答錯低頻脈衝 (Alert Buzz)
 * - 深層地心水脈環境白噪音與低頻共鳴 (Subterranean Ambient Drone)
 */

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ambientNodes = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleAudio() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.initContext();
      this.playSonarPing(920);
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }
    return this.enabled;
  }

  startAmbientDrone() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || this.ambientNodes) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const masterGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.value = 55; // A1 深海地心低頻
      osc2.type = 'triangle';
      osc2.frequency.value = 82.41; // E2 五度共鳴

      lfo.type = 'sine';
      lfo.frequency.value = 0.18; // 緩慢呼吸的水脈律動
      lfoGain.gain.value = 35;

      filter.type = 'lowpass';
      filter.frequency.value = 140;

      masterGain.gain.value = 0.035;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      this.ambientNodes = { osc1, osc2, lfo, masterGain };
    } catch (e) {
      console.warn('Ambient audio init skipped:', e);
    }
  }

  stopAmbientDrone() {
    if (!this.ambientNodes) return;
    try {
      this.ambientNodes.osc1.stop();
      this.ambientNodes.osc2.stop();
      this.ambientNodes.lfo.stop();
      this.ambientNodes.masterGain.disconnect();
    } catch {}
    this.ambientNodes = null;
  }

  playSonarPing(freq = 1046.5) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + 1.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.45);
  }

  playSurfaceChime() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    // 生物發光水晶和弦 (C5 - E5 - G5 - B5 - D6)
    const notes = [523.25, 659.25, 783.99, 987.77, 1174.66];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.065;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.95);
    });
  }

  playSuccess() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const chord = [587.33, 739.99, 880, 1174.66];
    chord.forEach((freq, i) => {
      const now = this.ctx.currentTime + i * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.linearRampToValueAtTime(125, now + 0.32);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  playClick(freq = 720) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.06);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}
