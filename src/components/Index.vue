<template>
  <div>
    <h1>8-Disco</h1>
    <h2>8-bit Disco Polo Player</h2>
    <div>
      <label for="#">Tempo: </label>
      <input type="number" min="50" max="150" v-model="tempo" :disabled="drumsPlaying">
    </div>
    <div>
      <label for="#">Melody VOLUME: </label>
      <input type="range" min="0" max="1" step="0.1" v-model="melodyVolume">
    </div>
    <div>
      <label for="#">BASS FREQ: </label>
      <input type="range" min="1000" max="10000" v-model="bassFreq">
    </div>
    <button v-on:click="playDrums" v-show="!drumsPlaying">Play drums</button>
    <button v-on:click="stopDrums" v-show="drumsPlaying">Stop drums</button>
    <img src="../assets/bg.png" alt="">
    <p>
      <a href="http://www.induweb.pl">induweb.pl</a>
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
      chord: '',
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
        if (this.chord) {
            this.playBass(this.chord[index]);
        }
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

        const existingOscillator = this.oscillators
            .find((oscillator) => oscillator.freq === frequency.value);
        
        if (frequency.type === 'melody' && !existingOscillator){
            this.playMelody(frequency.value);
        }

        if (frequency.type === 'drum'){
            if (frequency.value === 'kick') {
                this.playKick();
            } else if (frequency.value === 'snare') {
                this.playSnare();
            } else if (frequency.value === 'hiHat') {
                this.playHiHat();
            }
        }

        if (frequency.type === 'chord') {
            this.chord = frequency.value;
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

h1 {
  margin: 40px 0 0;
  font-size: 90px;
  letter-spacing: 2px;
  text-shadow: 0 12px 20px rgba(20,18,21,.2);
}

h2 {
  font-size: 40px;
  letter-spacing: 1px;
}

img {
  width: 800px;
  max-width: 100%;
  opacity: .1;
}

a{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #fff;
  text-shadow: 0 12px 20px rgba(20,18,21,.2);
}

</style>
