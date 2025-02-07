<script setup>
import Note_form from "@/components/Note_form.vue";
import Previous_Notes from "@/components/Previous_Notes.vue";

import {useDataStore} from "@/stores/dataStore.js";
import {onMounted} from "vue";
const {data, fetchingData, error, fetchData, deleteNote, createNote} = useDataStore()
console.log("printing data at beginning ",data)
onMounted(async () =>{
  console.log("Notes mounted");
  try{
    await fetchData();
  }catch(error){
    console.error(error)
  }
});

const deleteANote = async (id) => {
  try{
    await deleteNote(id);
  }catch(error){
    console.error(error)
  }
};

const createNewNote = async (newNote) => {
  try{
    await createNote(newNote);
  }catch(error){
    console.error(error)
  }
};
</script>

<template>
  <main>
    <h1>Welcome to notes app</h1>
    <Note_form :createNote="createNewNote"></Note_form>
    <Previous_Notes :notes="data" :deleteNote="deleteANote"></Previous_Notes>
  </main>
</template>
<style scoped>
</style>
