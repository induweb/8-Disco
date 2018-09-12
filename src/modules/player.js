import {getFrequency} from '../utils/getFrequency.js';
import chords from './chords.js';
import {Kick, HiHat, Snare, Bass} from './drums.js';

class Player {
    constructor() {
        console.log('welcome to la playa');
        this.drumsInterval = null;
        this.oscillators = [];
        this.audio = new AudioContext();
        this.chord = '';

        this.addEventListeners();
    }

    play(frequency) {
        this.createOscillator(frequency);
    }

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
    }

    playDrums(t){
        const tempo = t * 10;
        this.drumsInterval = setInterval(() => {
            this.hihat();
            this.kick();
            setTimeout(()=>{
                this.hihat();
                this.playChord(0);
            }, tempo / 4);
            setTimeout(()=>{
                this.hihat();
                this.snare();
                this.playChord(1);
            }, tempo / 2);
            setTimeout(()=>{
                this.hihat();
                this.playChord(2);
            }, tempo / 4 * 3);
        }, tempo);
    }

    playChord(index) {
        if (this.chord) {
            const chordToPlay = chords.filter(chord => chord.chord === this.chord)[0];
            this.bass(chordToPlay.freqs[index]);
        }
    }

    stopDrums() {
        clearInterval(this.drumsInterval);
    }

    createOscillator(freq) {
        const gain = this.audio.createGain();//can be moved up?
        const osc = this.audio.createOscillator();
        const osc2 = this.audio.createOscillator();

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
    }

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
        } else if (frequency === 'c' || frequency === 'f' || frequency === 'd' ||
         frequency === 'g' || frequency === 'e' || frequency === 'a' || frequency === 'b') {
            this.chord = frequency;
        } else if (!existingOscillator) {
            this.play(frequency);
        }
    }

    keyupHandler(e) {
        const keyName = e.key;
        const frequency = getFrequency(keyName);
        this.stop(frequency);
        this.isPlaying = false;
    }

    kick() {
        const kick = new Kick(this.audio);
        kick.trigger(this.audio.currentTime);
    }

    snare(){
        const snare = new Snare(this.audio);
        snare.trigger(this.audio.currentTime);
    }

    hihat() {
        const hiHat = new HiHat(this.audio);
        hiHat.trigger(this.audio.currentTime);
    }

    bass(note) {
        const bass = new Bass(this.audio);
        bass.trigger(this.audio.currentTime, note);
    }

    addEventListeners() {
        window.addEventListener('keydown', this.keydownHandler.bind(this));
        window.addEventListener('keyup', this.keyupHandler.bind(this));
    }
}

export default Player;