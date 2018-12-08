<template>
  <div>
    <h1>8-Disco</h1>

    <section class="container with-title">
        <h2 class="title">Hello</h2>
        <div>
           <p>This project presents the power of Web Audio API. No sound files, just a few oscillators.</p>
           <p>You can play music on your keyboard:</p>
           <p><strong>Melody</strong> - keys (asdfghjkl;')</p>
           <p><strong>Chords</strong> - keys (zxcvbnm) - only with drums</p>
           <p>
               <a href="https://web.facebook.com/indu.frontend/" target="_blank"><i class="icon facebook is-large"></i></a>
               <a href="https://github.com/induweb/" target="_blank"><i class="icon github is-large"></i></a>
           </p>
        </div>
    </section>

    <section v-if="drumsPlaying && chord.length">
        <div class="message -right">
          <div class="balloon from-right">
            <p>Playing chord: {{chordName}}</p>
          </div>
          <i class="bcrikko"></i>
        </div>
    </section>

    <section class="container with-title">
        <h2 class="title">Music type</h2>
        <div>
            <label>
                <input type="radio" class="radio" name="type" checked="">
                <span>8-BIT</span>
            </label>
            <label>
                <input type="radio" class="radio" name="type">
                <span>Normal</span>
            </label>
        </div>
    </section>

    <section class="form container with-title">
        <h2 class="title">Options</h2>
        <div class="field is-inline">
            <label>Tempo</label>
            <input class="input" type="number" min="50" max="150" v-model="tempo" :disabled="drumsPlaying">
        </div>
        <div class="field is-inline">
            <label for="#">Melody VOL</label>
            <input class="input" type="range" min="0" max="1" step="0.1" v-model="melodyVolume">
        </div>
        <div class="field is-inline">
            <label for="#">BASS FREQ</label>
            <input class="input" type="range" min="1000" max="10000" v-model="bassFreq">
        </div>
    </section>

    <button class="btn" v-on:click="playDrums" v-show="!drumsPlaying">Play drums</button>
    <button class="btn" v-on:click="stopDrums" v-show="drumsPlaying">Stop drums</button>
    <button class="btn" v-on:click="stopChord" v-show="drumsPlaying && chord.length">Stop chords</button>
    <p>
      <a class="footer-link" href="http://www.induweb.pl">induweb.pl</a>
    </p>
  </div>
</template>

<script>

import { frequencies } from '../modules/frequencies.js';
import { Accordion, Kick, HiHat, Snare, Bass } from '../modules/instruments.js';

export default {
  name: 'Index',
  data() {
    return {
      tempo: 100,
      melodyVolume: 0.2,
      bassFreq: 5000,
      drumsPlaying: false,
      drumsInterval: null,
      oscillators: [],
      accordion: null,
      kick: null,
      hiHat: null,
      snare: null,
      bass: null,
      audio: new AudioContext(),
      chord: [],
      chordName: ''
    }
  },
  mounted() {
        this.accordion = new Accordion(this.audio);
        this.kick = new Kick(this.audio);
        this.hiHat = new HiHat(this.audio);
        this.snare = new Snare(this.audio);
        this.bass = new Bass(this.audio);
        this.addEventListeners();
  },
  methods: {
    playMelody(frequency) {
        const note = this.accordion.play(frequency, this.melodyVolume);
        this.oscillators.push(note);
    },

    stopMelody(frequency) {
        let currentOscillatorIndex = null;
        const currentOscillator = this.oscillators.find((oscillator, index) => {
            if(oscillator.freq === frequency) {
                currentOscillatorIndex = index;
                return oscillator;
            }
        });

        if(currentOscillator) {
            currentOscillator.oscillators.forEach(oscillator => {
                oscillator.stop(this.audio.currentTime);
            });
        }

        this.oscillators.splice(currentOscillatorIndex, 1);
    },

    playDrums(){
        this.drumsPlaying = true;
        const tempo = (200 - parseInt(this.tempo)) * 10;
        this.drumsInterval = setInterval(() => {
            this.playKick();
            this.playChord(1);  
            setTimeout(()=>{
                this.playHiHat();
                this.playChord(0);
            }, tempo / 4);
            setTimeout(()=>{
                this.playKick();
                this.playSnare();
                this.playChord(1);
            }, tempo / 2);
            setTimeout(()=>{
                this.playHiHat();
                this.playChord(2);
            }, tempo / 4 * 3);
        }, tempo);
    },

    stopDrums() {
        clearInterval(this.drumsInterval);
        this.drumsPlaying = false;
    },

    playChord(index) {
        if (this.chord.length) {
            this.playBass(this.chord[index]);
        }
    },

    stopChord() {
        this.chord = [];
    },

    playKick() {
        this.kick.play(this.audio.currentTime);
    },

    playSnare(){
        this.snare.play(this.audio.currentTime);
    },

    playHiHat() {
        this.hiHat.play(this.audio.currentTime);
    },

    playBass(note) {
        this.bass.play(this.audio.currentTime, note, this.bassFreq);
    },
    
    keydownHandler(e) {
        const frequency = this.getFrequency(e.key);

        if(!frequency) {
            return false;
        }

        switch (frequency.type) {
            case 'chord':
                this.chord = frequency.value;
                this.chordName = frequency.name;
                break;
            case 'drum':
                if (frequency.value === 'kick') {
                    this.playKick();
                } else if (frequency.value === 'snare') {
                    this.playSnare();
                } else if (frequency.value === 'hiHat') {
                    this.playHiHat();
                }
                break;
            case 'melody': 
                const existingOscillator = this.oscillators
                    .find((oscillator) => oscillator.freq === frequency.value);
                
                if (!existingOscillator){
                    this.playMelody(frequency.value);
                }
                break;
        }
    },

    keyupHandler(e) {
        const frequency = this.getFrequency(e.key);

        if(!frequency) {
            return false;
        }

        if (frequency.type === 'melody') {
            this.stopMelody(frequency.value);
        }
    },

    getFrequency(key) {
        return frequencies.find(freq => {
            return key === freq.key
        });
    },

    addEventListeners() {
        window.addEventListener('keydown', this.keydownHandler.bind(this));
        window.addEventListener('keyup', this.keyupHandler.bind(this));
    }
  }
};

</script>

<style scoped lang="scss">

.container {
    margin-bottom: 30px;
}

.icon {
    margin-right: 20px;
}

.field {
    margin-bottom: 10px;
}

.footer-link {
    display: block;
    margin: 20px;
    text-align: center;
    color: #333;
    text-shadow: 0 12px 20px rgba(20,18,21,.2);
}

.message {
    position: fixed;
    top: 10%;
    right: 50px;
    z-index: 9999;
    display: flex;
    align-items: flex-end;
}
</style>
