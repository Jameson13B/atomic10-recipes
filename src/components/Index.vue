<template>
  <div class="index container">
    <!-- Create a card for each recipe -->
    <div class="card" v-for="recipe in sorted" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)">delete</i>
        <h2 class="indigo-text">{{ recipe.title }}</h2>
        <p class="grey-text text-darken-2">{{ recipe.description }}</p>
        <hr />
        <h4>Ingredients:</h4>
        <ul class="ingredients">
          <!-- Create a chip for reach ingredient -->
          <li v-for="(ing, i) in recipe.ingredients" :key="i">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
        <hr />
        <h4>Directions:</h4>
        <p class="directions">{{ recipe.directions }}</p>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditRecipe', params: {recipe_slug: recipe.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  props: ["sortBy"],
  data() {
    return {
      recipes: []
    };
  },
  computed: {
    sorted() {
      if (this.sortBy === "all") {
        return this.recipes;
      } else {
        return this.recipes.filter(recipe => {
          return recipe.category == this.sortBy;
        });
      }
    }
  },
  methods: {
    deleteRecipe(id) {
      // delete doc from firestore
      db
        .collection("recipes")
        .doc(id)
        .delete()
        .then(() => {
          this.recipes = this.recipes.filter(recipe => {
            return recipe.id !== id;
          });
        });
    }
  },
  created() {
    // fetch data from the firestore
    db
      .collection("recipes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let recipe = doc.data();
          recipe.id = doc.id;
          this.recipes.push(recipe);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}
.index h4 {
  font-size: 1.2em;
}
.index .ingredients {
  margin: 15px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .directions {
  color: rgba(0, 0, 0, 0.6);
}
.index .delete {
  position: absolute;
  top: 5px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
@media (max-width: 600px) {
  .index {
    grid-template-columns: 1fr;
  }
}
</style>
