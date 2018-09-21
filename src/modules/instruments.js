class Accordion {
    constructor(context, volume) {
        this.audio = context;
        this.gain = this.audio.createGain();
        this.gain.connect(this.audio.destination);
    }

    setup() {
        this.osc = this.audio.createOscillator();
        this.osc2 = this.audio.createOscillator();
        this.osc.type = "sawtooth";
        this.osc.detune.value = -10;

        this.osc2.type = 'triangle';
        this.osc2.detune.value = 10;

        this.osc.connect(this.gain);
        this.osc2.connect(this.gain);
    }

    play(freq, volume) {
        this.setup();

        this.gain.gain.setValueAtTime(volume, this.audio.currentTime);
        this.osc.frequency.value = freq;
        this.osc2.frequency.value = freq;
        this.osc.start(this.audio.currentTime);
        this.osc2.start(this.audio.currentTime);

        return {
            freq,
            oscillators: [this.osc, this.osc2]
        };
    }
}

class Kick {
	constructor(context) {
        this.context = context;
    }

    setup() {
        this.osc = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.osc2 = this.context.createOscillator();
        this.gain2 = this.context.createGain();

        this.osc.type = "sine";
        this.osc2.type = "square";
        this.osc2.frequency.value = "40";

        this.osc.connect(this.gain).connect(this.context.destination);
        this.osc2.connect(this.gain2).connect(this.context.destination);
    }
    
    play(t) {
        this.setup();

        this.osc.frequency.setValueAtTime(100, t);
        this.osc.frequency.setTargetAtTime(50, t, 0.05);

        this.gain.gain.setValueAtTime(1.0, t);
        this.gain.gain.setTargetAtTime(0.0, t, 0.1);
        this.gain2.gain.setValueAtTime(1.0, t);
        this.gain2.gain.setTargetAtTime(0.0, t, 0.01);

        this.osc.start(t);
        this.osc.stop(t + 1.0);
        this.osc2.start(t);
        this.osc2.stop(t + 1.0);
    };
};


class Snare {
    constructor(context){
        this.context = context;
    }
    
    setup() {
        this.noise = this.context.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
      
        const noiseFilter = this.context.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        this.noise.connect(noiseFilter);
      
        this.noiseEnvelope = this.context.createGain();
        noiseFilter.connect(this.noiseEnvelope);
      
        this.noiseEnvelope.connect(this.context.destination);
      
        this.osc = this.context.createOscillator();
        this.osc.type = 'triangle';
      
        this.oscEnvelope = this.context.createGain();
        this.osc.connect(this.oscEnvelope);
        this.oscEnvelope.connect(this.context.destination);
      };
      
      noiseBuffer() {
        const bufferSize = this.context.sampleRate;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const output = buffer.getChannelData(0);
      
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      
        return buffer;
      };
      
      play(t) {
        this.setup();
      
        this.noiseEnvelope.gain.setValueAtTime(1, t);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        this.noise.start(t)
      
        this.osc.frequency.setValueAtTime(100, t);
        this.oscEnvelope.gain.setValueAtTime(0.7, t);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        this.osc.start(t)
      
        this.osc.stop(t + 0.2);
        this.noise.stop(t + 0.2);
      };
  };
  
  class HiHat {
    constructor(context) {
        this.context = context;
    }

    noiseBuffer(){
        const nb = this.context.createBuffer(1, this.context.sampleRate,this.context.sampleRate);
        var cd = nb.getChannelData(0);
        for (var i = 0; i < cd.length; i++) {
            cd[i] = Math.random() * 2 - 1;
        }
        return nb;
    }

    setup() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.noiseBuffer();
        this.gain = this.context.createGain();
        this.filter = this.context.createBiquadFilter();
        this.filter.type = "highpass";
        this.filter.frequency.value = 5000;
    }
    
    play(t) {
        this.setup();

        this.gain.gain.setValueAtTime(1.0, t);
        this.gain.gain.setTargetAtTime(0.0, t, 0.02);
        this.source.connect(this.gain).connect(this.filter).connect(this.context.destination);
        this.source.start(t);
    }
  };

  class Bass {
    constructor(context) {
          this.context = context;
      }
  
      setup() {
          this.osc1 = this.context.createOscillator();
          this.osc2 = this.context.createOscillator();
          this.filter = this.context.createBiquadFilter();
          this.gain = this.context.createGain();

          this.osc1.connect(this.filter).connect(this.gain).connect(this.context.destination);
          this.osc2.connect(this.filter);
      };
      
      play(t, note, freq) {
          this.setup();

          this.osc1.frequency.setValueAtTime(note, t);
          this.osc2.frequency.setValueAtTime(note, t);
          this.osc2.detune.value = 20;
          this.osc1.type = "sawtooth";
          this.osc2.type = "sawtooth";

          this.gain.gain.setValueAtTime(0.3, t);
          this.gain.gain.setTargetAtTime(0.0, t, 0.1);

          this.filter.Q.setValueAtTime(20, t);
          this.filter.frequency.setValueAtTime(300, t);
          this.filter.frequency.setTargetAtTime(freq, t, 0.01);
          this.filter.type = "lowpass";

          this.osc1.start(t);
          this.osc2.start(t);
          this.osc1.stop(t+1);
          this.osc2.stop(t+1);
      };
  };
  
export {Accordion, Kick, Snare, HiHat, Bass};