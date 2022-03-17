const express = require('express');
const fs = require('fs');
const path = require("path");
const database = require("./db/db.json");
const api = require('./routes/index.js');


const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

// Get files in "public" folder
app.use(express.static("public"));

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);



//Reads the db.json file and return all saved notes as JSON.
app.route("/api/notes")
  .get(function (req, res) {
    res.json(database);
  })
  // Adds new note to the json db file.
  .post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;
    // Write the db.json file again.
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("New Note has been saved!");
    });
    // Response
    res.json(newNote);
  });

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);