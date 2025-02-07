<script setup>
defineProps({
  notes: Array, // Expect the parent to pass the list of notes
  deleteNote: Function, // Expect the parent to pass deleteNote function
});

const handleDelete = (id) => {
  deleteNote(id); // Call the deleteNote function passed from the parent
};


</script>

<template>
  <h2>Previous Notes</h2>
<!--  <div v-if="fetchingData">Fetching data...</div>-->
    <div v-if="notes" id="notes">
      <ul>
        <li id="note" v-for="note in notes" key="note._id">
          {{ note.content}}
          <button @click="deleteNote(note._id)">delete note</button>
        </li>
      </ul>
    </div>
<!--  <div v-if="error">{{ error }}</div>-->
</template>
<script >


</script>
<style scoped>
#notes{
  background-color: lightblue;
  width:30%;
  margin:auto;
  border-radius: 5px;
  padding:3%;
  box-shadow: 1px 1px 1px;
}

#note{
  margin:5%;
  font-weight:400;
}
</style>