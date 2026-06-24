/**
 * Zero-dependency Web Audio API synthesizer for retro-futuristic aerospace cockpit UI sounds.
 * Avoids any missing static asset errors.
 */

class SoundManager {
  private static ctx: AudioContext | null = null;
  private static isMuted = false;

  private static getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  public static toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('hud_sound_muted', this.isMuted ? 'true' : 'false');
    } catch (e) {
      // Ignored
    }
    return this.isMuted;
  }

  public static initMuteState() {
    try {
      const stored = localStorage.getItem('hud_sound_muted');
      if (stored !== null) {
        this.isMuted = stored === 'true';
      }
    } catch (e) {
      // Ignored
    }
  }

  public static getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Quick mechanical click sound (sine oscillator decay)
   */
  public static playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // AudioContext blocks before user interaction, fail silently
    }
  }

  /**
   * High-pitch short tick sound for hovers
   */
  public static playHover() {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2000, ctx.currentTime);
      osc.frequency.setValueAtTime(2200, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      // Ignored
    }
  }

  /**
   * System telemetry lock chirps (dual oscillator detune alarm tone)
   */
  public static playWarning() {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(800, ctx.currentTime);
      osc2.frequency.setValueAtTime(808, ctx.currentTime);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.25);
      osc2.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Ignored
    }
  }

  /**
   * Success sequence tone for completing items
   */
  public static playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const duration = 0.08;

      notes.forEach((freq, index) => {
        const time = ctx.currentTime + index * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.015, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
      });
    } catch (e) {
      // Ignored
    }
  }

  /**
   * Synthesizes a jet plane flyby sound (doppler sweep noise/sawtooth)
   */
  public static playFlyby() {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(70, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.6); // approach
      osc.frequency.exponentialRampToValueAtTime(45, now + 1.6); // fly away

      filter.type = 'lowpass';
      filter.Q.setValueAtTime(3.0, now);
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1000, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(120, now + 1.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.6); // peak proximity
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6); // fading

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.6);
    } catch (e) {
      // Ignored
    }
  }
}

// Initialize mute state right away
SoundManager.initMuteState();

export default SoundManager;
