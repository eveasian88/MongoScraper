var mongoose = require("mongoose");

// save a reference to the Schema constructor
var Schema = mongoose.Schema;

// using the Schema constructor to create a new NoteSchema object
var NoteSchema = new Schema({
    title: String,
    body: String
});

// this creates our model from the above schema but using a mongoose model method
var Note = mongoose.model("Note", NoteSchema);

// export note model
module.exports = Note;