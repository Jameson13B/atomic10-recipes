<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Atomic10 Recipes</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink add-btn">
          <router-link :to="{ name: 'AddRecipe' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
        <ul class="tabs tabs-transparent">
          <li class="tab"><a @click.prevent="sort('all', 0)">All</a></li>
          <li class="tab active"><a @click.prevent="sort('mains', 1)">Mains</a></li>
          <li class="tab"><a @click.prevent="sort('sides', 2)">Sides</a></li>
          <li class="tab"><a @click.prevent="sort('sauces', 3)">Sauces</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    sort(str, index) {
      let tabsArr = document.getElementsByClassName("tab");
      for (let i = 0; i < tabsArr.length; i++) {
        tabsArr[i].classList.remove("active");
      }
      tabsArr[index].classList.add("active");
      this.$emit("sort", { str });
    }
  }
};
</script>

<style>
.navbar nav {
  padding: 0 15px;
}
.navbar .active {
  font-weight: bold;
  border-bottom: 3px solid white;
}
@media (max-width: 600px) {
  .navbar .add-btn {
    position: absolute;
    top: 20px;
    right: 10px;
  }
}
</style>
