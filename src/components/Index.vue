<template>
  <div>
    <h1>8-Disco</h1>
    <h2>8-bit Disco Polo Player</h2>
    <input type="number" min="50" max="150" v-model="tempo" :disabled="drumsPlaying">
    <button v-on:click="playDrums" v-show="!drumsPlaying">Play drums</button>
    <button v-on:click="stopDrums" v-show="drumsPlaying">Stop drums</button>
    <img src="../assets/bg.png" alt="">
    <p>
      <a href="http://www.induweb.pl">induweb.pl</a>
    </p>
  </div>
</template>

<script>

import player from '../modules/player.js';

export default {
  name: 'Index',
  data() {
    return {
      player: null,
      tempo: 100,
      drumsPlaying: false
    }
  },
  mounted() {
    this.player = new player();
  },
  methods: {
    playDrums() {
      this.player.playDrums(200 - parseInt(this.tempo));
      this.drumsPlaying = true;
    },
    stopDrums() {
      this.player.stopDrums();
      this.drumsPlaying = false;
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