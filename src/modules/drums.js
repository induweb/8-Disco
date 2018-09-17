class Kick {
	constructor(context) {
        this.ac = context;
    }

    setup() {
        // this.osc = this.context.createOscillator();
        // this.osc2 = this.context.createOscillator();
        // this.gainOsc = this.context.createGain();
        // this.gainOsc2 = this.context.createGain();

        // this.osc.type = "triangle";
        // this.osc2.type = "sine";

        // this.osc.connect(this.gainOsc);
        // this.osc2.connect(this.gainOsc2);
    };
    
    trigger(t) {
        // this.setup();
        
        // this.gainOsc.gain.setValueAtTime(1, time);
        // this.gainOsc.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        // this.gainOsc2.gain.setValueAtTime(1, time);
        // this.gainOsc2.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        // this.osc.frequency.setValueAtTime(120, time);
        // this.osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

        // this.osc2.frequency.setValueAtTime(50, time);
        // this.osc2.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);


        // this.gainOsc.connect(this.context.destination);
        // this.gainOsc2.connect(this.context.destination);

        // this.osc.start(time);
        // this.osc2.start(time);

        // this.osc.stop(time + 0.5);
        // this.osc2.stop(time + 0.5);


        var osc = this.ac.createOscillator();
        var gain = this.ac.createGain();
        var osc2 = this.ac.createOscillator();
        var gain2 = this.ac.createGain();
        osc.type = "sine";
        osc2.type = "square";
        osc2.frequency.value = "40";
        osc.connect(gain).connect(this.ac.destination);
        osc2.connect(gain2).connect(this.ac.destination);
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.setTargetAtTime(50, t, 0.05);
        gain.gain.setValueAtTime(1.0, t);
        gain.gain.setTargetAtTime(0.0, t, 0.1);
        gain2.gain.setValueAtTime(1.0, t);
        gain2.gain.setTargetAtTime(0.0, t, 0.01);
        osc.start(t);
        osc.stop(t + 1.0);
        osc2.start(t);
        osc2.stop(t + 1.0);
    };
};


class Snare {
    constructor(context){
        this.context = context;
    }
    
    setup() {
        this.noise = this.context.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
      
        var noiseFilter = this.context.createBiquadFilter();
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
        var bufferSize = this.context.sampleRate;
        var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        var output = buffer.getChannelData(0);
      
        for (var i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      
        return buffer;
      };
      
      trigger(time) {
        this.setup();
      
        this.noiseEnvelope.gain.setValueAtTime(1, time);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        this.noise.start(time)
      
        this.osc.frequency.setValueAtTime(100, time);
        this.oscEnvelope.gain.setValueAtTime(0.7, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        this.osc.start(time)
      
        this.osc.stop(time + 0.2);
        this.noise.stop(time + 0.2);
      };
  };
  
  class HiHat {
    constructor(context) {
        this.ac = context;
    }

    noiseBuffer(){
        const nb = this.ac.createBuffer(1,this.ac.sampleRate,this.ac.sampleRate);
        var cd = nb.getChannelData(0);
        for (var i = 0; i < cd.length; i++) {
            cd[i] = Math.random() * 2 - 1;
        }
        return nb;
    }
    

      trigger(t) {
        var s = this.ac.createBufferSource();
        s.buffer = this.noiseBuffer();
        var gain = this.ac.createGain();
        var hpf = this.ac.createBiquadFilter();
        hpf.type = "highpass";
        hpf.frequency.value = 5000;
        gain.gain.setValueAtTime(1.0, t);
        gain.gain.setTargetAtTime(0.0, t, 0.02);
        s.connect(gain).connect(hpf).connect(this.ac.destination);
        s.start(t);
      }
    //   constructor(context, buffer) {
    //     this.context = context;
    //     this.gain = context.createGain();
    //     this.fundamental = 40;
    //     this.ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];
    //   }

    //   setup() {

    //   };
      
    //   trigger(time) {
    //     this.setup();
        
    //     // Bandpass
    //     var bandpass = this.context.createBiquadFilter();
    //     bandpass.type = "bandpass";
    //     bandpass.frequency.value = 10000;
        
    //     // Highpass
    //     var highpass = this.context.createBiquadFilter();
    //     highpass.type = "highpass";
    //     highpass.frequency.value = 7000;
        
    //     // Connect the graph
    //     bandpass.connect(highpass);
    //     highpass.connect(this.gain);
    //     this.gain.connect(this.context.destination);
        
    //     // Create the oscillators
    //     this.ratios.forEach(ratio => {
    //       var osc = this.context.createOscillator();
    //       osc.type = "square";
    //       // Frequency is the fundamental * this oscillator's ratio
    //       osc.frequency.value = this.fundamental * ratio;
    //       osc.connect(bandpass);
    //       osc.start(time);
    //       osc.stop(time + 0.3);
    //     });
        
    //     // Define the volume envelope
    //     this.gain.gain.setValueAtTime(0.00001, time);
    //     this.gain.gain.exponentialRampToValueAtTime(1, time + 0.02);
    //     this.gain.gain.exponentialRampToValueAtTime(0.3, time + 0.03);
    //     this.gain.gain.exponentialRampToValueAtTime(0.00001, time + 0.3);
    //   };
  };

  class Bass {
    constructor(context) {
          this.context = context;
          this.gain = context.createGain();
          this.freq = 5000;
      }
  
      setup() {
          this.osc1 = this.context.createOscillator();
          this.osc2 = this.context.createOscillator();
          this.filter = this.context.createBiquadFilter();

          this.osc1.connect(this.filter).connect(this.gain).connect(this.context.destination);
          this.osc2.connect(this.filter);
      };
      
      trigger(t, note, freq) {
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
  
export {Kick, Snare, HiHat, Bass};