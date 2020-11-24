<template>
  <div style="width:100%">
    <v-row class="text-center">
      <v-col cols="12">
        <knob-control
          :min="0"
          :max="100"
          v-model="volume"
          @change="changeVolume"
          primary-color="green"
          text-color="green"
        ></knob-control>

        <audio
          id="player"
          ref="player"
          :src="audio"
          preload="auto"
          @ended="musicEnded"
        ></audio>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4">
        <button @click="previous">
          <v-icon color="white">
            mdi-skip-previous
          </v-icon>
        </button>
      </v-col>
      <v-col cols="4">
        <button @click="play" v-if="!isPlaying">
          <v-icon color="white">
            mdi-play
          </v-icon>
        </button>
        <button @click="pause" v-else>
          <v-icon color="white">
            mdi-pause
          </v-icon>
        </button>
      </v-col>
      <v-col cols="4">
        <button @click="next">
          <v-icon color="white">
            mdi-skip-next
          </v-icon>
        </button>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col cols="3" style="text-align:right;">
        {{
          new Date(this.timestamp * 1000)
            .toISOString()
            .substr(11, 8)
            .substr(3, 5)
        }}
      </v-col>
      <v-col cols="6">
        <v-slider
          v-model="timestamp"
          @change="moveTimestamp"
          :max="songDuration"
          color="green"
          track-color="white"
        ></v-slider>
      </v-col>
      <v-col cols="3" style="text-align:left;">{{
        new Date(this.songDuration * 1000)
          .toISOString()
          .substr(11, 8)
          .substr(3, 5)
      }}</v-col>
    </v-row>
    <v-row v-if="nextToPlay !== null">
      <v-col cols="12"> Prochaine musique : {{ nextToPlay.title }} </v-col>
    </v-row>
  </div>
</template>

<script>
import KnobControl from "vue-knob-control";

export default {
  data() {
    return {
      inputFileUpdated: this.inputFile,
      nextToPlay: this.nextSong,
      player: null,
      audio: null,
      isPlaying: false,
      volume: 5,
      timestamp: 0,
      songDuration: 0,
    };
  },
  props: {
    inputFile: Object,
    nextSong: Object,
  },
  created() {
    this.audio = this.inputFileUpdated.url;
  },
  mounted() {
    this.changeVolume();
    this.$refs.player.addEventListener("timeupdate", () => {
      this.timestamp = this.$refs.player.currentTime;
    });
  },
  methods: {
    play: function() {
      this.$refs.player.play();
      this.isPlaying = true;
      this.songDuration = Math.round(this.$refs.player.duration);
    },
    pause: function() {
      this.$refs.player.pause();
      this.isPlaying = false;
    },
    moveTimestamp: function() {
      this.$refs.player.currentTime = this.timestamp;
    },
    changeVolume: function() {
      this.$refs.player.volume = this.volume / 100;
    },
    volMinus: function() {
      if (this.volume - 0.1 >= 0) {
        this.volume -= 0.1;
        this.changeVolume();
      } else {
        this.volume = 0;
        this.changeVolume();
      }
    },
    volPlus: function() {
      if (this.volume + 0.1 <= 1) {
        this.volume += 0.1;
        this.changeVolume();
      } else {
        this.volume = 1;
        this.changeVolume();
      }
    },
    musicEnded: function() {
      this.$emit("musicEnded");
    },
    previous: function() {
      this.$emit("previousMusic");
    },
    next: function() {
      this.$emit("nextMusic");
    },
  },
  watch: {
    inputFile: function(val) {
      this.inputFileUpdated = val;
      this.audio = this.inputFileUpdated.url;
      this.$refs.player.addEventListener("canplaythrough", this.play, false);
    },
    nextSong: function(val) {
      this.nextToPlay = val;
    },
    volume: function() {
      this.changeVolume();
    },
  },
  components: {
    KnobControl: KnobControl,
  },
};
</script>
