<script setup>

import {ref} from "vue";
defineProps({
  createNote :Function,
});

//refs for handling reactive variables for content
const noteContent = ref('')
const submitForm = () => {
  const newNote = {
    content:noteContent.value
  }
  createNote(newNote)

  //reset the form
  noteContent.value = ''
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