<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Spoteezer</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-card
        class="d-block"
        style="background-color:#2C2F33;  color: white; width:350px"
        elevation="2"
      >
        <v-card-title style="padding:0; margin:0;">
          <v-img :src="currentFile.cover" contain></v-img>
        </v-card-title>

        <v-row class="text-center">
          <v-col cols="12">
            {{ currentFile.title }}
          </v-col>
        </v-row>
        <v-row class="text-center">
          <Music
            :inputFile="currentFile"
            color="success"
            @musicEnded="next"
            @previousMusic="previous"
            @nextMusic="next"
          ></Music>
        </v-row>
      </v-card>
      <v-card class="d-block card-spoteezer" elevation="2">
        <v-card-title>
          <span class="text-center" style="width:100%">Liste de lecture</span>
          <span style="width:100%; align-items:right">
            <button @click="randomPlaying">
              <v-icon :color="isRandom ? 'green' : 'white'"
                >mdi-strategy</v-icon
              >
            </button>
            <button @click="normalPlaying">
              <v-icon :color="isRandom ? 'white' : 'green'"
                >mdi-playlist-play</v-icon
              >
            </button>
          </span>
        </v-card-title>
        <v-list class="card-spoteezer">
          <v-list-item v-for="item in musics" :key="item.id"
            ><button style="margin-right:5px;" @click="playMusic(item.id)">
              <v-icon color="white">
                mdi-play-circle-outline
              </v-icon>
            </button>
            <span :class="item.isPlaying ? 'text-green' : 'text-white'">{{
              item.title
            }}</span></v-list-item
          >
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Music from "./Music";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function() {
    return {
      musics: [
        {
          id: 1,
          title: "Hail to the King - Avenged Sevenfold",
          url: require("../assets/musics/hail.mp3"),
          cover: require("../assets/musics/hail.jpg"),
          isPlaying: true,
        },
        {
          id: 2,
          title: "Nightmare - Avenged Sevenfold",
          url: require("../assets/musics/nightmare.mp3"),
          cover: require("../assets/musics/nightmare.jpg"),
        },
        {
          id: 3,
          title: "A Little Piece of Heaven - Avenged Sevenfold",
          url: require("../assets/musics/heaven.mp3"),
          cover: require("../assets/musics/heaven.jpg"),
        },
        {
          id: 4,
          title: "The Trooper - Iron Maiden",
          url: require("../assets/musics/trooper.mp3"),
          cover: require("../assets/musics/trooper.jpg"),
        },
        {
          id: 5,
          title: "Ghost Love Score - Live at Wacken - Nightwish",
          url: require("../assets/musics/ghost.mp3"),
          cover: require("../assets/musics/ghost.jpg"),
        },
        {
          id: 6,
          title: "Blue Orchid - The White Stripes",
          url: require("../assets/musics/orchid.mp3"),
          cover: require("../assets/musics/orchid.jpg"),
        },
        {
          id: 7,
          title: "In the end - Linkin Park",
          url: require("../assets/musics/end.mp3"),
          cover: require("../assets/musics/end.jpg"),
        },
      ],
      currentFile: null,
      index: 0,
      isRandom: false,
    };
  },
  created() {
    this.loadMusic();
  },
  methods: {
    previous: function() {
      this.musics[this.index].isPlaying = false;
      if (this.index > 1) {
        this.index--;
      } else {
        this.index = this.musics.length - 1;
      }
      this.loadMusic();
    },
    next: function() {
      this.musics[this.index].isPlaying = false;
      if (this.isRandom) {
        this.index = Math.floor(Math.random() * Math.floor(this.musics.length));
      } else {
        if (this.index < this.musics.length - 1) {
          this.index++;
        } else {
          this.index = 0;
        }
      }
      this.loadMusic();
    },
    loadMusic: function() {
      this.currentFile = this.musics[this.index];
      this.musics[this.index].isPlaying = true;
    },
    playMusic: function(idToFind) {
      this.musics[this.index].isPlaying = false;
      this.index = this.musics.findIndex((x) => x.id === idToFind);
      this.currentFile = this.musics[this.index];
      this.musics[this.index].isPlaying = true;
    },
    normalPlaying: function() {
      this.isRandom = false;
    },
    randomPlaying: function() {
      this.isRandom = true;
    },
  },
  components: {
    Music,
  },
  computed: {},
  watch: {},
};
</script>
<style scoped>
li {
  list-style-type: none;
  margin-bottom: 10px;
}
.text-green {
  color: green;
}
.text-white {
  color: white;
}

.card-spoteezer {
  background-color: #2c2f33;
  color: white;
  width: 350px;
}
</style>
