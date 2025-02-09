import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//This file acts as a datastore to store the notes for the app
//It also contains all API communication

export const useDataStore = defineStore('notesStore', () => {
    //data array
    const notes = ref([]);

    // fetch the data from the db
    async function fetchData() {
        try{
            const response = await fetch('http://localhost:3000/notes', {
                method:'GET',
            });
            console.log('fetch request made');
            if(!response.ok){
                error.value = 'An error occurred while fetching data.';
            }
            //if the request is ok set the value of data to the json
            const receivedData = await response.json();
            notes.value = receivedData;
        }catch(error){
            console.error(error)
            error.value = error;
        }
    }//Fetch data function

    async function deleteNote(itemID) {
        try{
            const response = await fetch(`http://localhost:3000/notes/${itemID}`, {
                method:'DELETE',
            });
            console.log("fetch made", response);
            if(!response.ok){
                error.value = 'An error occurred while deleting data.';
            }
            //delete the data object with the corresponding id
            notes.value = notes.value.filter((note) => note._id !== itemID);
        }catch(error){
            console.error(error)
            error.value = error;
        }
    }//Delete note function

    async function createNote(newNote){
        try{
            const response = await fetch('http://localhost:3000/notes', {
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(newNote)
            });

            if(!response.ok){
                console.error(response);
            }
            await response.json();
            notes.value.push(newNote);
            //refresh the notes so they have the correct ids
            await fetchData();
        }catch(error){
            console.error(error)
            error.value = 'An error occurred while creating data.';
        }
    }//Create note function

    async function updateNote(noteID, newContent) {
        try{
            const update = await fetch(`http://localhost:3000/notes/${noteID}`, {
                method:'PUT',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({content : newContent})
            });
            await update.json()
            notes.value = notes.value.map((note) =>
                //condition : expression if true: expression if false
                //so check the IDs if true update the note content with the passed in content
                note._id === noteID ? { ...note, content : newContent } : note
            );
            console.log("Note updated successfully:", notes.value)
        }catch(error){
            console.error(error)
        }
    }//update note function

    return {notes, fetchData, deleteNote, createNote, updateNote};
});
