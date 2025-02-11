<script setup>
import Note_form from "@/components/Note_form.vue";
import Previous_Notes from "@/components/Previous_Notes.vue";

import {useDataStore} from "@/stores/dataStore.js";
import {onMounted, ref} from "vue";

onMounted(async () =>{
  console.log("App.vue mounted");
});
</script>

<template>
  <main>
    <h1>Notes app</h1>
    <Note_form></Note_form>
    <br>
    <Previous_Notes></Previous_Notes>
  </main>
</template>
<style scoped>

h1 {
  color:white;
  font-size: 3rem;
}
</style>
