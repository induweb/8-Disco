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

import {getFrequency} from '../utils/getFrequency.js';
import chords from '../modules/chords.js';
import {Kick, HiHat, Snare, Bass} from '../modules/drums.js';

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
      audio: new AudioContext(),
      chord: '',
    }
  },
  mounted() {
    this.addEventListeners();
  },
  methods: {
    play(frequency) {
        this.createOscillator(frequency);
    },

    stop(frequency) {
        if (frequency===1 || frequency === 2 || frequency === 3) {
            return;
        }

        let currentOscillatorIndex = null;
        const currentOscillator = this.oscillators.filter((oscillator, index) => {
            if(oscillator.freq === frequency) {
                currentOscillatorIndex = index;
                return oscillator;
            }
        })[0];

        if(currentOscillator) {
            currentOscillator.oscillators.forEach(oscillator => {
                oscillator.stop(this.audio.currentTime);
            });
        }

        this.oscillators.splice(currentOscillatorIndex, 1);
        console.log(this.oscillators);
    },

    playDrums(){
        this.drumsPlaying = true;
        const tempo = (200 - parseInt(this.tempo)) * 10;
        this.drumsInterval = setInterval(() => {
            // this.hihat();
            this.kick();
            setTimeout(()=>{
                this.hihat();
                this.playChord(0);
            }, tempo / 4);
            setTimeout(()=>{
                // this.hihat();
                this.snare();
                this.playChord(1);
            }, tempo / 2);
            setTimeout(()=>{
                this.hihat();
                this.playChord(2);
            }, tempo / 4 * 3);
        }, tempo);
    },

    playChord(index) {
        if (this.chord) {
            const chordToPlay = chords.filter(chord => chord.chord === this.chord)[0];
            this.bass(chordToPlay.freqs[index]);
        }
    },

    stopDrums() {
        clearInterval(this.drumsInterval);
        this.drumsPlaying = false;
    },

    createOscillator(freq) {
        const gain = this.audio.createGain();//can be moved up?
        const osc = this.audio.createOscillator();
        const osc2 = this.audio.createOscillator();
        gain.gain.setValueAtTime(this.melodyVolume, this.audio.currentTime);

        gain.connect(this.audio.destination);

        osc.frequency.value = freq;
        osc.type = "sawtooth";
        osc.detune.value = -10;

        osc2.frequency.value = freq;
        osc2.type = 'triangle';
        osc2.detune.value = 10;

        osc.connect(gain);
        osc2.connect(gain);

        this.oscillators.push({
            freq,
            oscillators: [osc, osc2]
        });

        osc.start(this.audio.currentTime);
        osc2.start(this.audio.currentTime);
    },

    keydownHandler(e) {
        const keyName = e.key;
        const frequency = getFrequency(keyName);
        const existingOscillator = this.oscillators
            .filter((oscillator) => oscillator.freq === frequency)[0];
        
        if (frequency === 1) {
            this.kick();
        } else if (frequency === 3) {
            this.snare();
        } else if (frequency === 2) {
            this.hihat();
        } else if (frequency === 'c' || frequency === 'f' || frequency === 'd' || frequency === 'g' ||
        frequency === 'e' || frequency === 'a' || frequency === 'b') {
            this.chord = frequency;
        } else if (!existingOscillator) {
            this.play(frequency);
        }
    },

    keyupHandler(e) {
        const keyName = e.key;
        const frequency = getFrequency(keyName);
        this.stop(frequency);
    },

    kick() {
        const kick = new Kick(this.audio);
        kick.trigger(this.audio.currentTime);
    },

    snare(){
        const snare = new Snare(this.audio);
        snare.trigger(this.audio.currentTime);
    },

    hihat() {
        const hiHat = new HiHat(this.audio);
        hiHat.trigger(this.audio.currentTime);
    },

    bass(note) {
        const bass = new Bass(this.audio);
        bass.trigger(this.audio.currentTime, note, this.bassFreq);
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
  // letter-spacing: 1px;
  text-shadow: 0 12px 20px rgba(20,18,21,.2);
}

</style>
