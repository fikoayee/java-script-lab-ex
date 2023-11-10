let unpinnedNotes = [];
let pinnedNotes = [];
let notes = [];
let noteStorage = [];

const red = "#fba7a7";
const yellow = "#fbdca7";
const green = "#b8dbc1";

function onSubmit() {
  const currDate = new Date().toISOString().substring(0, 10);
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const isPinned = document.getElementById("isPinned").checked;
  const color = document.getElementById("color").value;
  const newNote = {
    title: title,
    content: content,
    color: color,
    isPinned: isPinned,
    currentDate: currDate,
  };
  if (isPinned) {
    pinnedNotes.unshift(newNote);
  } else {
    unpinnedNotes.unshift(newNote);
  }
  manageListOrder();
  expandDOM();
  saveNotesToLocalStorage();
}

function manageListOrder() {
  notes = [...pinnedNotes, ...unpinnedNotes];
}

function check() {
  console.log(unpinnedNotes);
  console.log(pinnedNotes);
  console.log(notes);
}

function expandDOM() {
  clearDOM();
  notes.map((note) => {
    const noteContainer = document.createElement("div");
    noteContainer.style.border = "1px solid #000";
    noteContainer.style.width = "800px";
    noteContainer.style.backgroundColor = note.color;

    let buttonText = "unpin";
    if (note.isPinned) {
      buttonText = "unpin";
    } else {
      buttonText = "pin";
    }

    const titleElement = document.createElement("h2");
    titleElement.textContent = note.title;

    const dateElement = document.createElement("small");
    dateElement.textContent = note.currentDate;

    const contentElement = document.createElement("p");
    contentElement.textContent = note.content;

    const buttonElement = document.createElement("button");
    buttonElement.textContent = buttonText;

    buttonElement.addEventListener("click", function () {
      handlePin(note);
      expandDOM();
    });

    noteContainer.appendChild(titleElement);
    noteContainer.appendChild(dateElement);
    noteContainer.appendChild(contentElement);
    noteContainer.append(buttonElement);

    const section = document.getElementById("list-of-notes");
    section.appendChild(noteContainer);
  });
}

function clearDOM() {
  const parent = document.getElementById("list-of-notes");

  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function handlePin(note) {
  const tempNote = note;
  if (tempNote.isPinned) {
    tempNote.isPinned = false;
    pinnedNotes = pinnedNotes.filter((item) => item.title !== tempNote.title);
    unpinnedNotes.unshift(tempNote);
  } else {
    tempNote.isPinned = true;
    unpinnedNotes = unpinnedNotes.filter(
      (item) => item.title !== tempNote.title
    );
    pinnedNotes.unshift(tempNote);
  }
  console.log("klikniety button");
  console.log(tempNote);
}

function saveNotesToLocalStorage() {
  localStorage.setItem("noteStorage", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const storedNotes = JSON.parse(localStorage.getItem("noteStorage")) || [];
  unpinnedNotes = storedNotes.filter((note) => !note.isPinned);
  pinnedNotes = storedNotes.filter((note) => note.isPinned);
  manageListOrder();
  expandDOM();
}
function clearLocalStorage(){
    localStorage.clear()
}
loadNotesFromLocalStorage();
