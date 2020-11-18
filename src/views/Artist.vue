<template>
  <div class="home">
    <Artist />
  </div>
</template>

<script>
// @ is an alias to /src
import Artist from "@/components/Artist.vue";

export default {
  name: "Home",
  components: {
    Artist,
  },
};
</script>
