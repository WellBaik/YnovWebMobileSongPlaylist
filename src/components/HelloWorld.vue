<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 style="color:green">Spoteezer</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-card
        class="d-block"
        style="background-color:#2C2F33;  color: white; width:350px; margin-left:auto; margin-right:auto"
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
            :nextSong="nextSong"
            color="success"
            @musicEnded="next"
            @previousMusic="previous"
            @nextMusic="next"
          ></Music>
        </v-row>
      </v-card>
      <v-card
        class="d-block card-spoteezer"
        style="margin-left:auto; margin-right:auto"
        elevation="2"
      >
        <v-card-title>
          <span class="text-center" style="width:100%">Liste de lecture</span>
          <span style="width:100%; align-items:right">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <button @click="randomPlaying" v-bind="attrs" v-on="on">
                  <v-icon :color="isRandom ? 'green' : 'white'"
                    >mdi-strategy</v-icon
                  >
                </button></template
              >
              <span>Lecture aléatoire</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <button @click="normalPlaying" v-bind="attrs" v-on="on">
                  <v-icon :color="isRandom ? 'white' : 'green'"
                    >mdi-playlist-play</v-icon
                  >
                </button>
              </template>
              <span>Lecture normale</span>
            </v-tooltip>

            <button>
              <v-dialog v-model="dialog" persistent max-width="290">
                <template #activator="{ on:dialog }">
                  <v-tooltip top>
                    <template #activator="{on:tooltip}">
                      <v-btn v-on="{ ...dialog, ...tooltip }" icon>
                        <v-icon color="green">mdi-heart</v-icon>
                      </v-btn>
                    </template>
                    <span>Chansons favorites</span>
                  </v-tooltip>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Chansons favorites
                  </v-card-title>
                  <v-card-text>
                    <span v-for="item in musics" :key="item.id">
                      <span v-if="item.isFav">{{ item.title }}<br /></span>
                    </span>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Ok
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </button>
          </span>
        </v-card-title>
        <table style="width:100%; border-collapse: collapse">
          <thead>
            <tr>
              <th class=""></th>
              <th class="bb">
                Titre
              </th>
              <th class="bb bl">
                Artiste
              </th>
              <th class=""></th>
              <th class=""></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td class="">
                <input
                  style="background-color:white; width:90%; font-size:12px"
                  type="text"
                  placeholder="Titre ..."
                  v-model="sTitle"
                  @keyup="searchTitle"
                />
              </td>
              <td class="bl">
                <input
                  style="background-color:white; width:90%; font-size:12px"
                  type="text"
                  placeholder="Artiste ..."
                  v-model="sArtist"
                  @keyup="searchArtist"
                />
              </td>
              <td class=""></td>
              <td class=""></td>
            </tr>
            <tr v-for="item in musicsFiltered" :key="item.id">
              <td>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      style="margin-right:5px;"
                      @click="playMusic(item.id)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="white">
                        mdi-play-circle-outline
                      </v-icon>
                    </button>
                  </template>
                  <span>Jouer cette musique</span>
                </v-tooltip>
              </td>
              <td class="text-left" style="font-size:12px; padding:5px">
                <span :class="item.isPlaying ? 'text-green' : 'text-white'">
                  {{ item.title }}
                </span>
              </td>
              <td class="bl text-left" style="font-size:12px; padding:5px">
                <span class="link">
                  <router-link
                    :to="{ name: 'Artist', params: { id: item.artist } }"
                    >{{ getArtist(item.artist).name }}
                  </router-link>
                </span>
              </td>
              <td class="">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      style="margin-right:5px;"
                      @click="nextSong = item"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="white"> mdi-bookmark-plus-outline </v-icon>
                    </button>
                  </template>
                  <span>Prochaine musique à jouer</span>
                </v-tooltip>
              </td>
              <td class="">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      style="margin-right:5px;"
                      @click="item.isFav = !item.isFav"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon :color="item.isFav ? 'green' : 'white'">
                        mdi-heart
                      </v-icon>
                    </button> </template
                  ><span>
                    Chanson favorite
                  </span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Music from "./Music";
import { musics, artists } from "../../public/assets/variables.js";
var Shake = require("shake.js");
var myShakeEvent = new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 1000, // optional, determines the frequency of event generation
});
myShakeEvent.start();
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function() {
    return {
      musics: musics,
      artists: artists,
      currentFile: null,
      index: 0,
      isRandom: false,
      musicsFiltered: [],
      sTitle: "",
      sArtist: "",
      dialog: false,
      nextSong: null,
    };
  },
  created() {
    this.loadMusic();
    this.musicsFiltered = this.musics;
    window.addEventListener("shake", this.next, false);
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
      if (this.nextSong !== null) {
        this.playMusic(this.nextSong.id);
        this.nextSong = null;
      } else {
        if (this.isRandom) {
          this.index = Math.floor(
            Math.random() * Math.floor(this.musics.length)
          );
        } else {
          if (this.index < this.musics.length - 1) {
            this.index++;
          } else {
            this.index = 0;
          }
        }
      }
      this.loadMusic();
    },
    loadMusic: function() {
      this.currentFile = this.musics[this.index];
      this.musics[this.index].isPlaying = true;
      navigator.vibrate([500]);
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
    getArtist: function(artistId) {
      return this.artists.find((x) => x.id === artistId);
    },
    searchTitle: function() {
      this.musicsFiltered = [];
      if (this.sTitle.length > 0) {
        for (var i = 0; i < this.musics.length; i++) {
          if (
            this.musics[i].title
              .toUpperCase()
              .includes(this.sTitle.toUpperCase())
          ) {
            this.musicsFiltered.push(this.musics[i]);
          }
        }
      } else {
        this.musicsFiltered = this.musics;
      }
    },
    searchArtist: function() {
      this.musicsFiltered = [];
      if (this.sArtist.length > 0) {
        for (var i = 0; i < this.musics.length; i++) {
          if (
            this.getArtist(this.musics[i].artist)
              .name.toUpperCase()
              .includes(this.sArtist.toUpperCase())
          ) {
            this.musicsFiltered.push(this.musics[i]);
          }
        }
      } else {
        this.musicsFiltered = this.musics;
      }
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
.link a {
  color: green;
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
.bb {
  border-bottom: 1px solid white;
}
.bl {
  border-left: 1px solid white;
}
</style>
