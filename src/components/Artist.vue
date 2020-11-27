<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>{{ artist.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-card
        class="d-block card-spoteezer"
        style="margin-left:auto; margin-right:auto"
        elevation="2"
      >
        <v-card-title style="padding:0; margin:0;">
          <v-img :src="artist.url" contain></v-img>
        </v-card-title>
        <v-card-text class="text-justify" style="color:white">
          <p v-for="item in artist.informations" :key="item">
            {{ item }}
          </p>
          <p>Liste des musiques disponibles :</p>
          <ul>
            <li v-for="music in musics" :key="music.id">
              {{ music.title }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Artist",
  props: {},
  data: function() {
    return {};
  },
  methods: { ...mapGetters[("getArtistById", "getMusicByArtistId")] },
  components: {},
  computed: {
    artist() {
      return this.$store.getters.getArtistById(this.$route.params.id);
    },
    musics() {
      return this.$store.getters.getMusicByArtistId(this.$route.params.id);
    },
  },
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
