<template>
  <div id="app">
    <Navbar @sort="sort" />
    <router-view :sortBy="sortBy" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  data() {
    return {
      sortBy: "mains"
    };
  },
  components: {
    Navbar
  },
  methods: {
    sort(payload) {
      this.sortBy = payload.str;
    }
  }
};
</script>

<style>
</style>
