<template>
  <div class="add-recipe container">
    <h2 class="center-align indigo-text">Add New Recipe</h2>
    <form @submit.prevent="addRecipe">
      <!-- title -->
      <div class="field title">
        <label for="title">Recipe Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <!-- description -->
      <div class="field description">
        <label for="description">Recipe description:</label>
        <input type="text" name="description" v-model="description" />
      </div>
      <!-- category -->
      <div class="field category">
        <label for="category">Recipe Category:</label>
        <select v-model="category" class="browser-default">
          <option value="" disabled seleted></option>
          <option value="mains">mains</option>
          <option value="sides">sides</option>
          <option value="sauces">sauces</option>
        </select>
      </div>
      <!-- directions -->
      <div class="field directions">
        <label for="directions">Recipe Directions:</label>
        <input type="text" name="directions" v-model="directions" />
      </div>
      <!-- ingredient list -->
      <div class="field" v-for="(ing,index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <!-- add ingredient -->
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient: (enter to add)</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" @keydown.enter.prevent="addIng" v-model="another" />
      </div>
      <!-- add button -->
      <div class="field center-align">
        <!-- feedback from button -->
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddRecipe",
  data() {
    return {
      title: "",
      slub: null,
      description: "",
      category: "",
      directions: "",
      another: null,
      feedback: null,
      ingredients: []
    };
  },
  methods: {
    addRecipe() {
      if (this.title && this.description) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // add doc to database
        db
          .collection("recipes")
          .add({
            title: this.title,
            description: this.description,
            category: this.category,
            directions: this.directions,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a recipe title and description";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing;
      });
    }
  }
};
</script>

<style>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field {
  margin: 20px auto;
  position: relative;
}
.add-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
