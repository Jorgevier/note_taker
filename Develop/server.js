

const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');
const { json } = require('express');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./Develop/public"));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "notes.html")));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));


// //app.get('', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// // // Displays all characters
// // app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "Develop/notes.html')));

// // app.get('/', (req, res) => res.sendFile(path.join(__dirname, "Develop/index.html')));


app.get("/api/notes", (req, res) => {
readFileAsync("./Develop/db/db.json", "")
.then(() => {
    notes = [].concat(JSON.parse())
    res.json(notes);
    })
});

app.post("/api/notes", (req, res) => {
     const note = req.body;
     readFileAsync("./Develop/db/db.json", "")
     .then(() => {
        const notes = [].concat(JSON.parse());
        note.id = notes.length + 1
        notes.push(note);
        return notes
     })
     .then((notes) => {
         writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.json(notes);
     })
    });
app.delete("/api/notes", (req, res) => {
     const idDelete = parseInt(req.params.id);
     readFileAsync("./Develop/db/db.json", "")
     .then(() => {
        const notes = [].concat(JSON.parse());
        const newNotes = []
        for (let i=0; i<notes.length; i++) {
            if(idDelete !== notes[i].id) {
                newNotes.push(notes[i])
            }
        }
        return newNotes
    })
    .then((notes) => {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
         res.send("saved note");
    })
})

