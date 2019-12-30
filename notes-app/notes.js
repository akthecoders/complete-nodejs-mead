const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes...";
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);
  if(!duplicateNotes) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  }
  else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title !== title);
  if(notes.length > duplicateNotes.length) {
    saveNotes(duplicateNotes);
    console.log(chalk.green.inverse('Note removed!'));
  }
  else {
    console.log(chalk.red.inverse('No note found!'));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  if(notes.length === 0) {
    console.log(chalk.red.inverse('No note found!'));
    return;
  }
  console.log(chalk.yellow.inverse('Your Notes !'));
  let index = 1;
  notes.forEach(note => {
    console.log(chalk.green(index++ + ':'), chalk.green.inverse(note.title));
  });
}

const readNote = (title) => {
  const notes = loadNotes();
  if(notes.length === 0) {
    console.log(chalk.red.inverse('No note found?'));
    return;
  }
  const findNote = notes.find((note) => note.title === title);
  if(findNote) {
    console.log(chalk.green.inverse(findNote.title) + " : " + chalk(findNote.body));
  }
  else {
    console.log(chalk.red.inverse('No note found?'));
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch(e) {
    return [];
  }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
}