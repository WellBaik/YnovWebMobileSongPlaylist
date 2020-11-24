<template>
  <v-app style="background-color:#23272A; color:white">
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link
        ><span style="color:green; margin:0px 20px">|</span>
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: green;

    &.router-link-exact-active {
      color: white;
    }
    &.router-link {
      color: white;
    }
  }
}
</style>
