

const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');



const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public")); 








app.get("/api/notes", async(req, res) => {
    const notes = JSON.parse(await readFileAsync("./db/db.json"));
    console.log (notes)
// readFileAsync("./db/db.json", "utf8")
// .then((data) => {
//     notes = [].concat(JSON.parse())
     res.json(notes);
//     })
});

app.post("/api/notes", async(req, res) => {
    const notes = JSON.parse(await readFileAsync("./db/db.json"));
    console.log (notes)
    const note = req.body;
    //readFileAsync("./db/db.json", "")
    note.id = notes.length + 1;
    notes.push(note);
    await writeFileAsync ("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});
    //  .then(() => {
    //     const notes = [].concat(JSON.parse());

    //     return notes
    //deleteNote(id){
    //return this.getNotes()
    //  .then((notes) => notes.filter(
//(note) => note.id !== id))
//.then((filterNotes) => this.write(filterNotes))
//} 
    //  })
    // });
app.delete("/api/notes/:id", async(req, res) => {
    const notes = JSON.parse(await readFileAsync("./db/db.json"));
     const idDelete = notes.filter((removeNote) => removeNote.id !== parseInt(req.params.id));
  //   console.log(notes)
   //  const idDelete = parseInt(req.params.id);
     await writeFileAsync("./db/db.json", JSON.stringify(idDelete));
     res.json(idDelete);
});
    //  .then(() => {
    //     const notes = [].concat(JSON.parse());
    //     const newNotes = []
    //     for (let i = 0; i<notes.length; i++) {
    //         if(idDelete !== notes[i].id) {
    //             newNotes.push(notes[i])
    //         }
    //     }
    //     return newNotes
    // })
    // .then((notes) => {
    //     writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
    //      res.send("saved note");
    //})

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/notes.html"))
    });
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
    });
    
    
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

