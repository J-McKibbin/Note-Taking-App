<script setup>
import {onMounted, ref} from "vue";
import {useDataStore} from "@/stores/dataStore.js";

const dataStore = useDataStore();
const updateContent = ref('')

const enterEditing = () => {
  console.log("entering editing");
  isEditing.value = true;
}

onMounted(async () =>{
  // await fetchNoteData();
  try{
    await dataStore.fetchData();
    console.log("Previous notes component fetchData function loaded");
  }catch(error){
    console.error(error)
  }
});
</script>

<template>
    <div id="notes" v-if="dataStore.notes.length > 0">
      <h2 id="notesTitle">Previous Notes</h2>
      <ul id="notesContainer">
        <li id="note" v-for="note in dataStore.notes" :key="note._id">
<!--          <p>{{ note.content || 'no content'}}</p>-->
          <textarea id="noteContainer" v-model="note.content"></textarea>
          <br>
<!--          <input v-model="note.content" type="text" placeholder="update note" />-->
          <button id="btnSave" @click="dataStore.updateNote(note._id, note.content)"><span style="font-weight:bold ; font-size:15px">Save</span></button>
          <button id="btnDelete" @click="dataStore.deleteNote(note._id)"><span style="font-weight:bold; font-size:15px">Delete</span></button>
        </li>
      </ul>
    </div>
    <h4 v-else>No notes atm!</h4>
</template>
<script >


</script>
<style scoped>
#notes{
  background-color: darkslategray;
  width:30%;
  margin:auto;
  border-radius: 5px;
  padding:3%;
  box-shadow: 1px 1px 1px;
  list-style: none;
}

#note{
  margin:5% 0 0 0;
  font-weight:400;
  background-color:darkblue;
  border-radius:5px;
  padding:10px;
  width:100%;
}

#notesTitle{
  margin:0 0 10% 0;
}

#notesContainer{
  list-style: none;
  padding:0;
}

#btnSave{
  background-color: forestgreen;
  color:white;
  border-radius:5px;
  margin:2px;
}

#btnDelete{
  background-color: red;
  color:white;
  border-radius:5px;
  margin:2px;
}

#noteContainer{
  background-color:darkblue;
  width:100%;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size:20px;
  height:100%;
}
</style>