<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 style="color:green">Spoteezer</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-card
        class="d-block card-spoteezer"
        style="margin-left:auto; margin-right:auto"
        elevation="2"
        ><v-card-title>
          <span class="text-center" style="width:100%">Liste de lecture</span>
        </v-card-title>
        <v-row class="text-left">
          <v-col cols="12">
            <span class="text-white">
              <h3 style="margin:0px 10px">
                Features
              </h3>
              <ul>
                <li>You can change volume with a smooth knob !</li>
                <li>Your phone vibrate at the end of a song</li>
                <li>Shake your phone to skip the song</li>
                <li>You can choose the next played song</li>
                <li>Add a song to your favorites</li>
                <li>Search your song by title or artist</li>
              </ul>
            </span>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

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
</style>
