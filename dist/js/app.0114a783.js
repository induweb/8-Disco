(function(t){function e(e){for(var s,o,r=e[0],c=e[1],l=e[2],h=0,p=[];h<r.length;h++)o=r[h],n[o]&&p.push(n[o][0]),n[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,l||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],s=!0,r=1;r<i.length;r++){var c=i[r];0!==n[c]&&(s=!1)}s&&(a.splice(e--,1),t=o(o.s=i[0]))}return t}var s={},n={app:0},a=[];function o(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=s,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(i,s,function(e){return t[e]}.bind(null,s));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var s=i("c21b"),n=i.n(s);n.a},"0bdf":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("097d");var s=i("2b0e"),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("Index")],1)},a=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h1",[t._v("8-Disco")]),t._m(0),i("button",{directives:[{name:"show",rawName:"v-show",value:!t.drumsPlaying,expression:"!drumsPlaying"}],staticClass:"btn",on:{click:t.playDrums}},[t._v("Play drums")]),i("button",{directives:[{name:"show",rawName:"v-show",value:t.drumsPlaying,expression:"drumsPlaying"}],staticClass:"btn",on:{click:t.stopDrums}},[t._v("Stop drums")]),i("button",{directives:[{name:"show",rawName:"v-show",value:t.drumsPlaying&&t.chord.length,expression:"drumsPlaying && chord.length"}],staticClass:"btn",on:{click:t.stopChord}},[t._v("Stop chords")]),i("section",{staticClass:"form container with-title"},[i("h2",{staticClass:"title"},[t._v("Options")]),i("div",{staticClass:"field is-inline"},[i("label",[t._v("Tempo")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.tempo,expression:"tempo"}],staticClass:"input",attrs:{type:"number",min:"50",max:"150",disabled:t.drumsPlaying},domProps:{value:t.tempo},on:{input:function(e){e.target.composing||(t.tempo=e.target.value)}}})]),i("div",{staticClass:"field is-inline"},[i("label",{attrs:{for:"#"}},[t._v("Melody VOL")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.melodyVolume,expression:"melodyVolume"}],staticClass:"input",attrs:{type:"range",min:"0",max:"1",step:"0.1"},domProps:{value:t.melodyVolume},on:{__r:function(e){t.melodyVolume=e.target.value}}})]),i("div",{staticClass:"field is-inline"},[i("label",{attrs:{for:"#"}},[t._v("BASS FREQ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bassFreq,expression:"bassFreq"}],staticClass:"input",attrs:{type:"range",min:"1000",max:"10000"},domProps:{value:t.bassFreq},on:{__r:function(e){t.bassFreq=e.target.value}}})])]),t.drumsPlaying&&t.chord.length?i("section",[i("div",{staticClass:"message -right"},[i("div",{staticClass:"balloon from-right"},[i("p",[t._v("Playing chord: "+t._s(t.chordName))])]),i("i",{staticClass:"bcrikko"})])]):t._e(),t._m(1),t._m(2)])},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"container with-title"},[i("h2",{staticClass:"title"},[t._v("Hello")]),i("div",[i("p",[t._v("This project presents the power of Web Audio API. No sound files, just a few oscillators.")]),i("p",[t._v("You can play music on your keyboard:")]),i("p",[i("strong",[t._v("Melody")]),t._v(" - keys (asdfghjkl;')")]),i("p",[i("strong",[t._v("Chords")]),t._v(" - keys (zxcvbnm) - only with drums")]),i("p",[t._v("Made with Vue.js and NES.css")]),i("p",[i("a",{attrs:{href:"https://web.facebook.com/indu.frontend/",target:"_blank"}},[i("i",{staticClass:"icon facebook is-large"})]),i("a",{attrs:{href:"https://github.com/induweb/",target:"_blank"}},[i("i",{staticClass:"icon github is-large"})])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"container with-title"},[i("h2",{staticClass:"title"},[t._v("Music type (not yet)")]),i("div",[i("label",[i("input",{staticClass:"radio",attrs:{type:"radio",name:"type",checked:""}}),i("span",[t._v("8-BIT")])]),i("label",[i("input",{staticClass:"radio",attrs:{type:"radio",name:"type"}}),i("span",[t._v("Normal")])])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",[i("a",{staticClass:"footer-link",attrs:{href:"http://www.induweb.pl"}},[t._v("induweb.pl")])])}],c=(i("7f7f"),i("ac6a"),i("7514"),[{type:"melody",key:"a",value:1047},{type:"melody",key:"s",value:1175},{type:"melody",key:"d",value:1319},{type:"melody",key:"f",value:1397},{type:"melody",key:"g",value:1568},{type:"melody",key:"h",value:1760},{type:"melody",key:"j",value:1976},{type:"melody",key:"k",value:2093},{type:"melody",key:"l",value:2349},{type:"melody",key:";",value:2637},{type:"melody",key:"'",value:2794},{type:"melody",key:"\\",value:3136},{type:"melody",key:"enter",value:3520},{type:"drum",key:"8",value:"kick"},{type:"drum",key:"9",value:"hiHat"},{type:"drum",key:"0",value:"snare"},{type:"chord",key:"z",name:"C",value:[65,82,98]},{type:"chord",key:"x",name:"D",value:[73,87,110]},{type:"chord",key:"c",name:"E",value:[82,98,123]},{type:"chord",key:"v",name:"F",value:[87,110,131]},{type:"chord",key:"b",name:"G",value:[98,123,146]},{type:"chord",key:"n",name:"A",value:[110,130,165]},{type:"chord",key:"m",name:"H",value:[123,146,174]}]),l=i("c665"),u=i("aa9a"),h=function(){function t(e,i){Object(l["a"])(this,t),this.audio=e,this.gain=this.audio.createGain(),this.gain.connect(this.audio.destination)}return Object(u["a"])(t,[{key:"setup",value:function(){this.osc=this.audio.createOscillator(),this.osc2=this.audio.createOscillator(),this.osc.type="sawtooth",this.osc.detune.value=-10,this.osc2.type="triangle",this.osc2.detune.value=10,this.osc.connect(this.gain),this.osc2.connect(this.gain)}},{key:"play",value:function(t,e){return this.setup(),this.gain.gain.setValueAtTime(e,this.audio.currentTime),this.osc.frequency.value=t,this.osc2.frequency.value=t,this.osc.start(this.audio.currentTime),this.osc2.start(this.audio.currentTime),{freq:t,oscillators:[this.osc,this.osc2]}}}]),t}(),p=function(){function t(e){Object(l["a"])(this,t),this.context=e}return Object(u["a"])(t,[{key:"setup",value:function(){this.osc=this.context.createOscillator(),this.gain=this.context.createGain(),this.osc2=this.context.createOscillator(),this.gain2=this.context.createGain(),this.osc.type="sine",this.osc2.type="square",this.osc2.frequency.value="40",this.osc.connect(this.gain).connect(this.context.destination),this.osc2.connect(this.gain2).connect(this.context.destination)}},{key:"play",value:function(t){this.setup(),this.osc.frequency.setValueAtTime(100,t),this.osc.frequency.setTargetAtTime(50,t,.05),this.gain.gain.setValueAtTime(1,t),this.gain.gain.setTargetAtTime(0,t,.1),this.gain2.gain.setValueAtTime(1,t),this.gain2.gain.setTargetAtTime(0,t,.01),this.osc.start(t),this.osc.stop(t+1),this.osc2.start(t),this.osc2.stop(t+1)}}]),t}(),d=function(){function t(e){Object(l["a"])(this,t),this.context=e}return Object(u["a"])(t,[{key:"setup",value:function(){this.noise=this.context.createBufferSource(),this.noise.buffer=this.noiseBuffer();var t=this.context.createBiquadFilter();t.type="highpass",t.frequency.value=1e3,this.noise.connect(t),this.noiseEnvelope=this.context.createGain(),t.connect(this.noiseEnvelope),this.noiseEnvelope.connect(this.context.destination),this.osc=this.context.createOscillator(),this.osc.type="triangle",this.oscEnvelope=this.context.createGain(),this.osc.connect(this.oscEnvelope),this.oscEnvelope.connect(this.context.destination)}},{key:"noiseBuffer",value:function(){for(var t=this.context.sampleRate,e=this.context.createBuffer(1,t,this.context.sampleRate),i=e.getChannelData(0),s=0;s<t;s++)i[s]=2*Math.random()-1;return e}},{key:"play",value:function(t){this.setup(),this.noiseEnvelope.gain.setValueAtTime(1,t),this.noiseEnvelope.gain.exponentialRampToValueAtTime(.01,t+.2),this.noise.start(t),this.osc.frequency.setValueAtTime(100,t),this.oscEnvelope.gain.setValueAtTime(.7,t),this.oscEnvelope.gain.exponentialRampToValueAtTime(.01,t+.1),this.osc.start(t),this.osc.stop(t+.2),this.noise.stop(t+.2)}}]),t}(),y=function(){function t(e){Object(l["a"])(this,t),this.context=e}return Object(u["a"])(t,[{key:"noiseBuffer",value:function(){for(var t=this.context.createBuffer(1,this.context.sampleRate,this.context.sampleRate),e=t.getChannelData(0),i=0;i<e.length;i++)e[i]=2*Math.random()-1;return t}},{key:"setup",value:function(){this.source=this.context.createBufferSource(),this.source.buffer=this.noiseBuffer(),this.gain=this.context.createGain(),this.filter=this.context.createBiquadFilter(),this.filter.type="highpass",this.filter.frequency.value=5e3}},{key:"play",value:function(t){this.setup(),this.gain.gain.setValueAtTime(1,t),this.gain.gain.setTargetAtTime(0,t,.02),this.source.connect(this.gain).connect(this.filter).connect(this.context.destination),this.source.start(t)}}]),t}(),f=function(){function t(e){Object(l["a"])(this,t),this.context=e}return Object(u["a"])(t,[{key:"setup",value:function(){this.osc1=this.context.createOscillator(),this.osc2=this.context.createOscillator(),this.filter=this.context.createBiquadFilter(),this.gain=this.context.createGain(),this.osc1.connect(this.filter).connect(this.gain).connect(this.context.destination),this.osc2.connect(this.filter)}},{key:"play",value:function(t,e,i){this.setup(),this.osc1.frequency.setValueAtTime(e,t),this.osc2.frequency.setValueAtTime(e,t),this.osc2.detune.value=20,this.osc1.type="sawtooth",this.osc2.type="sawtooth",this.gain.gain.setValueAtTime(.3,t),this.gain.gain.setTargetAtTime(0,t,.1),this.filter.Q.setValueAtTime(20,t),this.filter.frequency.setValueAtTime(300,t),this.filter.frequency.setTargetAtTime(i,t,.01),this.filter.type="lowpass",this.osc1.start(t),this.osc2.start(t),this.osc1.stop(t+1),this.osc2.stop(t+1)}}]),t}(),m={name:"Index",data:function(){return{tempo:100,melodyVolume:.2,bassFreq:5e3,drumsPlaying:!1,drumsInterval:null,oscillators:[],accordion:null,kick:null,hiHat:null,snare:null,bass:null,audio:new AudioContext,chord:[],chordName:""}},mounted:function(){this.accordion=new h(this.audio),this.kick=new p(this.audio),this.hiHat=new y(this.audio),this.snare=new d(this.audio),this.bass=new f(this.audio),this.addEventListeners()},methods:{playMelody:function(t){var e=this.accordion.play(t,this.melodyVolume);this.oscillators.push(e)},stopMelody:function(t){var e=this,i=null,s=this.oscillators.find(function(e,s){if(e.freq===t)return i=s,e});s&&s.oscillators.forEach(function(t){t.stop(e.audio.currentTime)}),this.oscillators.splice(i,1)},playDrums:function(){var t=this;this.drumsPlaying=!0;var e=10*(200-parseInt(this.tempo));this.drumsInterval=setInterval(function(){t.playKick(),t.playChord(1),setTimeout(function(){t.playHiHat(),t.playChord(0)},e/4),setTimeout(function(){t.playKick(),t.playSnare(),t.playChord(1)},e/2),setTimeout(function(){t.playHiHat(),t.playChord(2)},e/4*3)},e)},stopDrums:function(){clearInterval(this.drumsInterval),this.drumsPlaying=!1},playChord:function(t){this.chord.length&&this.playBass(this.chord[t])},stopChord:function(){this.chord=[]},playKick:function(){this.kick.play(this.audio.currentTime)},playSnare:function(){this.snare.play(this.audio.currentTime)},playHiHat:function(){this.hiHat.play(this.audio.currentTime)},playBass:function(t){this.bass.play(this.audio.currentTime,t,this.bassFreq)},keydownHandler:function(t){var e=this.getFrequency(t.key);if(!e)return!1;switch(e.type){case"chord":this.chord=e.value,this.chordName=e.name;break;case"drum":"kick"===e.value?this.playKick():"snare"===e.value?this.playSnare():"hiHat"===e.value&&this.playHiHat();break;case"melody":var i=this.oscillators.find(function(t){return t.freq===e.value});i||this.playMelody(e.value);break}},keyupHandler:function(t){var e=this.getFrequency(t.key);if(!e)return!1;"melody"===e.type&&this.stopMelody(e.value)},getFrequency:function(t){return c.find(function(e){return t===e.key})},addEventListeners:function(){window.addEventListener("keydown",this.keydownHandler.bind(this)),window.addEventListener("keyup",this.keyupHandler.bind(this))}}},v=m,g=(i("e99c"),i("2877")),b=Object(g["a"])(v,o,r,!1,null,"5105a4cb",null);b.options.__file="Index.vue";var k=b.exports,x={name:"app",components:{Index:k}},w=x,_=(i("034f"),Object(g["a"])(w,n,a,!1,null,null,null));_.options.__file="App.vue";var T=_.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(T)}}).$mount("#app")},c21b:function(t,e,i){},e99c:function(t,e,i){"use strict";var s=i("0bdf"),n=i.n(s);n.a}});
//# sourceMappingURL=app.0114a783.js.map