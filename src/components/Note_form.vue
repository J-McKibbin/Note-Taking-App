<script setup>

import {ref} from "vue";
import {useDataStore} from "@/stores/dataStore.js";

const dataStore = useDataStore();

//refs for handling reactive variables for content
const noteContent = ref('')

//submitting a new note
const submitForm = async () => {
  const newNote = {
    content:noteContent.value
  }
  try{
    await dataStore.createNote(newNote);
    //reset the form
    noteContent.value = ''
  }catch(error){
    console.log(error)
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
<!--    <div>-->
<!--      <label for="note_title">Note Title</label>-->
<!--      <br>-->
<!--      <input type="text" id="note_title" placeholder="Note Title..." required></input>-->
<!--    </div>-->
    <br>
    <div>
      <label for="note_content">Note Description</label>
      <br>
      <textarea v-model="noteContent" type="text" id="note_content" placeholder="Write note here..." required cols="40" rows="10"></textarea>
    </div>
    <br>
    <button type="submit" >Submit Note</button>
  </form>
</template>

<style scoped>
  body{
    font-family: Arial, Helvetica, sans-serif;
  }
</style>