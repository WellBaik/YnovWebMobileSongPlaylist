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
            <button>
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon color="green">mdi-heart</v-icon>
                  </v-btn>
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
              <th class="bb"></th>
              <th class="bb bl text-left">
                Titre
              </th>
              <th class="bb bl text-left">
                Artiste
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td class="bl">
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
              <td class="bl"></td>
            </tr>
            <tr v-for="item in musicsFiltered" :key="item.id">
              <td>
                <button style="margin-right:5px;" @click="playMusic(item.id)">
                  <v-icon color="white">
                    mdi-play-circle-outline
                  </v-icon>
                </button>
              </td>
              <td class="bl text-left" style="font-size:12px">
                <span :class="item.isPlaying ? 'text-green' : 'text-white'">
                  {{ item.title }}
                </span>
              </td>
              <td class="bl text-left" style="font-size:12px">
                <span :class="item.isPlaying ? 'text-green' : 'text-white'">
                  {{ getArtist(item.artist).name }}
                </span>
              </td>
              <td class="bl">
                <button
                  style="margin-right:5px;"
                  @click="item.isFav = !item.isFav"
                >
                  <v-icon :color="item.isFav ? 'green' : 'white'">
                    mdi-heart
                  </v-icon>
                </button>
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
          title: "Hail to the King",
          artist: 1,
          url: require("../assets/musics/hail.mp3"),
          cover: require("../assets/musics/hail.jpg"),
          isPlaying: true,
          isFav: true,
        },
        {
          id: 2,
          title: "Nightmare",
          artist: 1,
          url: require("../assets/musics/nightmare.mp3"),
          cover: require("../assets/musics/nightmare.jpg"),
          isFav: false,
        },
        {
          id: 3,
          title: "A Little Piece of Heaven",
          artist: 1,
          url: require("../assets/musics/heaven.mp3"),
          cover: require("../assets/musics/heaven.jpg"),
          isFav: false,
        },
        {
          id: 4,
          title: "The Trooper",
          artist: 2,
          url: require("../assets/musics/trooper.mp3"),
          cover: require("../assets/musics/trooper.jpg"),
          isFav: false,
        },
        {
          id: 5,
          title: "Ghost Love Score - Live at Wacken",
          artist: 3,
          url: require("../assets/musics/ghost.mp3"),
          cover: require("../assets/musics/ghost.jpg"),
          isFav: false,
        },
        {
          id: 6,
          title: "Blue Orchid",
          artist: 4,
          url: require("../assets/musics/orchid.mp3"),
          cover: require("../assets/musics/orchid.jpg"),
          isFav: false,
        },
        {
          id: 7,
          title: "In the end",
          artist: 5,
          url: require("../assets/musics/end.mp3"),
          cover: require("../assets/musics/end.jpg"),
          isFav: false,
        },
      ],
      artists: [
        {
          id: 1,
          name: "Avenged Sevenfold",
          informations: "",
        },
        {
          id: 2,
          name: "Iron Maiden",
          informations: "",
        },
        {
          id: 3,
          name: "Nightwish",
          informations: "",
        },
        {
          id: 4,
          name: "The Whites Stripes",
          informations: "",
        },
        {
          id: 5,
          name: "Linkin Park",
          informations: "",
        },
      ],
      currentFile: null,
      index: 0,
      isRandom: false,
      musicsFiltered: [],
      sTitle: "",
      sArtist: "",
      dialog: false,
    };
  },
  created() {
    this.loadMusic();
    this.musicsFiltered = this.musics;
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
.bb {
  border-bottom: 1px solid white;
}
.bl {
  border-left: 1px solid white;
}
</style>
