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
  <form @submit.prevent="submitForm" id="noteForm">
<!--    <div>-->
<!--      <label for="note_title">Note Title</label>-->
<!--      <br>-->
<!--      <input type="text" id="note_title" placeholder="Note Title..." required></input>-->
<!--    </div>-->
    <div>
      <br>
      <textarea v-model="noteContent" type="text" id="note_content" placeholder="Write note here..." required cols="40" rows="10" spellcheck="false"></textarea>
    </div>
    <br>
    <button type="submit" id="btnSubmit">Submit Note</button>
    <button type="reset" id="btnClear">Clear</button>
  </form>
</template>

<style scoped>
  body{
    font-family: Arial, Helvetica, sans-serif;
  }

  #noteForm{
    background: #434343;
    width:46%;
    margin:auto;
    border-radius:10px;
    box-shadow: 0.5px 0.5px black;
  }

  #btnSubmit{
    width:25%;
    background-color: #116d11;
    padding:12px;
    border-radius:10px;
    color:white;
    font-size:20px;
    font-weight:bold;
    border:1px;
    box-shadow: 1px 1px black;
    transition: 0.2s ease-in-out;
    margin:8px;
  }

  #btnSubmit:hover{
    background-color: #0c3a0c;
    color: #c6c6c6;
  }

  #btnClear{
    width:25%;
    background-color: #bc1d1d;
    padding:12px;
    border-radius:10px;
    color:white;
    font-size:20px;
    font-weight:bold;
    border:1px;
    box-shadow: 1px 1px black;
    transition: 0.2s ease-in-out;
  }

  #btnClear:hover{
    background-color: #6c1010;
    color: #cfcfcf;
  }

  #note_content{
    font-family: Arial, Helvetica, sans-serif;
    font-size:20px;
    border-radius: 10px;
    width:95%;
    height:100%;
    resize: none;
    box-shadow: 0.5px 0.5px black;
  }
</style>