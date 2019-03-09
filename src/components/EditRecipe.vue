<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>Edit {{ recipe.title }}</h2>
    <form @submit.prevent="editRecipe">
      <!-- title -->
      <div class="field title">
        <label for="title">Recipe Title:</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <!-- description -->
      <div class="field description">
        <label for="description">Recipe description:</label>
        <input type="text" name="description" v-model="recipe.description" />
      </div>
      <!-- category -->
      <div class="field category">
        <label for="category">Recipe Category:</label>
        <select v-model="recipe.category" class="browser-default">
          <option value="" disabled seleted></option>
          <option value="mains">mains</option>
          <option value="sides">sides</option>
          <option value="sauces">sauces</option>
        </select>
      </div>
      <!-- directions -->
      <div class="field directions">
        <label for="directions">Recipe Directions:</label>
        <input type="text" name="directions" v-model="recipe.directions" />
      </div>
      <!-- ingredient list -->
      <div class="field" v-for="(ing,index) in recipe.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="recipe.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <!-- add ingredient -->
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" @keydown.enter.prevent="addIng" v-model="another" />
      </div>
      <!-- add button -->
      <div class="field center-align">
        <!-- feedback from button -->
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editRecipe() {
      if (this.recipe.title && this.recipe.description) {
        this.feedback = null;
        // create a slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // add doc to database
        db
          .collection("recipes")
          .doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            description: this.recipe.description,
            category: this.recipe.category,
            directions: this.recipe.directions,
            ingredients: this.recipe.ingredients,
            slug: this.recipe.slug
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
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
        return ingredient !== ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("recipes")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}
.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
