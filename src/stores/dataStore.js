import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('Data', () => {
    //data will store
    const data = ref([]);
    const fetchingData = ref(false);
    const error = ref(null);

    // fetch the data from the db
    async function fetchData() {
        //set the loading bool to true as the request is sent
        fetchingData.value = true;
        console.log('fetching data');
        try{
            const response = await fetch('http://localhost:3000/notes', {
                method:'GET',
            });
            console.log('fetch request made');
            if(!response.ok){
                error.value = 'An error occurred while fetching data.';
            }
            //if the request is ok set the value of data to the json
            data.value = await response.json();
            console.log("Fetched data:", data.value)
        }catch(error){
            console.error(error)
            error.value = error;
        }finally{
            //set the bool back to false
            fetchingData.value = false;
            console.log("fetching data = false")
        }
    }
    //returning the data so it can be displayed on front end

    async function deleteNote(itemID) {
        try{
            const response = await fetch(`http://localhost:3000/notes/${itemID}`, {
                method:'DELETE',
            });
            console.log("fetch made", response);
            if(!response.ok){
                error.value = 'An error occurred while deleting data.';
            }

        }catch(error){
            console.error(error)
            error.value = error;
        }
    }

    async function createNote(newNote){
        try{
            const response = await fetch('http://localhost:3000/notes', {
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(newNote)
            });

            if(!response.ok){
                error.value = 'An error occurred while creating data.';
            }
            const createdNote = await response.json();
            console.log("Crated note:", createdNote)
            data.value.push(createdNote);
            console.log("Al notes are creation: ", data.value)
        }catch(error){
            console.error(error)
            error.value = 'An error occurred while creating data.';
        }
    }

    return {data, fetchingData, error, fetchData, deleteNote, createNote};
});
