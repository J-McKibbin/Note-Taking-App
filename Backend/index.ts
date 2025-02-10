import express from "express";
import * as mongoose from 'mongoose';
import {ObjectId} from "mongodb";
const cors = require ("cors");



async function startServer() {
    //mongo connection string
    await mongoose.connect('mongodb://localhost:27017/mongoose-test');
    console.log("Connected to mongodb!!")

    //schema for db
    const schema = new mongoose.Schema(
        {
            id: Number,
            content: {type: String, required: true},
        }
    );

    //exporting the import Mongoose schema for use as a model
    const note = mongoose.model('Note', schema);


    //Creating simple notetaking app
    //define the express app
    const app = express();
    app.use(express.static('public'))
    app.use(express.json());
    app.use(cors());
    // defining the port the runtime will run on
    const port = 3000;

    //connecting to mongodb
    await mongoose.connect('mongodb://localhost:27017/mongoose-test');

    //CRUD OPERATIONS

    //Get all notes/home/jonathan/Documents/Note_App
    //Read all from the db
    app.get("/notes", async (req, res) => {
        try {
            const notes = await note.find()
            res.status(200).json(notes)
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    });

    //Get specific note based on the ID
    app.get("/notes/:id", async (req, res) => {
        try {
            const id = await note.findById(req.params.id);
            console.log(id)
            if (!id) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.status(200).json(id)
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Server Error"});
        }
    });


    //Creating new note - when the /notes endpoint is used
    app.post("/notes", async (req, res) => {
    //mongo connection string
        try {
            const newNote = new note({
                content: req.body.content,
            });
            const noteCreated = await newNote.save();
            res.status(201)
            res.send(noteCreated._id)
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Server Error"});
        }
    });

    //Deleting notee
    app.delete("/notes/:id", async (req, res) => {
        //get the note id and send it to the user
        try {
            const id = new ObjectId(req.params.id) // wrap in ObjectID
            await note.findByIdAndDelete(id);
            res.status(204).send();
        } catch (err) {
            console.error(err)
            res.status(500).send("Server error");
        }
    });

    //update note
    app.put("/notes/:id", async (req, res) => {
        try {
            const id = req.params.id;
            note.findByIdAndUpdate(id, {
                content: req.body.content,
            })
                .then(updatedNote => {
                    res.status(201).json({"Note updated successfully": updatedNote});
                })
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Server Error"});
        }
    });


    //listening on homepage at /
    app.get("/", (req, res) => {
        //We can send the home html page
        res.sendFile(__dirname + "/public/home.html");
    });

    //listen on the port that has been selected
    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}...`);
    });
}

startServer().catch(error => console.log("failed to start server"));
