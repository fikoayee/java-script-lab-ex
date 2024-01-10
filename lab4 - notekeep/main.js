let unpinnedNotes = [];
let pinnedNotes = [];
let notes = [];
let noteStorage = [];

let noteObj = "";

const red = "#fba7a7";
const yellow = "#fbdca7";
const green = "#b8dbc1";

//  --------------------------- CREATE NOTE ---------------------------
function onSubmit() {
  const currDate = new Date().toISOString().substring(0, 10);
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const isPinned = document.getElementById("isPinned").checked;
  const color = document.getElementById("color").value;
  const tags = document.getElementById("tags").value;
  const reminderDate = document.getElementById("reminder").value;
  const newNote = {
    title: title,
    content: content,
    color: color,
    isPinned: isPinned,
    currentDate: currDate,
    tags: tags,
    reminderDate: reminderDate,
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

//  --------------------------- SEARCH NOTE ---------------------------
function searchNote() {
  const searchInput = document.getElementById("search-note-input").value;
  let filteredNotes = notes.filter((note) => {
    const titleCheck = note.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const contentCheck = note.content
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const tagsCheck = note.tags
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return titleCheck || contentCheck || tagsCheck;
  });

  if (filteredNotes == "") {
    filteredNotes = notes;
  }
  clearDOM();
  filteredNotes.map((note) => {
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
    titleElement.className = "mx-5 mt-2 text-2xl font-bold";

    const dateElement = document.createElement("small");
    dateElement.textContent = note.currentDate;
    dateElement.className = "mx-5";

    const contentElement = document.createElement("p");
    contentElement.textContent = note.content;
    contentElement.className = "mx-5 my-5 text-xl";

    const buttonElementPin = document.createElement("button");
    buttonElementPin.textContent = buttonText;
    buttonElementPin.className =
      "bg-blue-500 border-zinc-300 text-white rounded-md mx-2 my-2 min-h-[30px] min-w-[70px]";

    const buttonElementEdit = document.createElement("button");
    buttonElementEdit.textContent = "edit";
    buttonElementEdit.className =
      "bg-blue-500 border-zinc-300 text-white rounded-md mx-2 my-2 min-h-[30px] min-w-[70px]";

    const buttonElementRemove = document.createElement("button");
    buttonElementRemove.textContent = "remove";
    buttonElementRemove.className =
      "bg-blue-500 border-zinc-300 text-white rounded-md mx-2 my-2 min-h-[30px] min-w-[70px]";

    const tagsElement = document.createElement("p");
    tagsElement.textContent = note.tags;
    tagsElement.className = "mx-4 my-2 text-sm";

    const reminderElement = document.createElement("small");
    reminderElement.textContent = note.reminderDate;

    buttonElementPin.addEventListener("click", function () {
      handlePin(note);
      expandDOM();
    });

    buttonElementEdit.addEventListener("click", function () {
      document.getElementById("edit-input-form").style.display = "flex";
      editNote(note);
    });

    buttonElementRemove.addEventListener("click", function () {
      removeNote(note);
    });

    noteContainer.appendChild(titleElement);
    noteContainer.appendChild(dateElement);
    noteContainer.appendChild(contentElement);
    noteContainer.appendChild(tagsElement);
    noteContainer.appendChild(reminderElement);
    noteContainer.append(buttonElementPin);
    noteContainer.append(buttonElementEdit);
    noteContainer.append(buttonElementRemove);

    const section = document.getElementById("list-of-notes");
    section.appendChild(noteContainer);
  });
}

//  --------------------------- EDIT NOTE ---------------------------

function editNote(note) {
  document.getElementById("title-edit").value = note.title;
  document.getElementById("content-edit").value = note.content;
  document.getElementById("color-edit").value = note.color;
  document.getElementById("tags-edit").value = note.tags;
  document.getElementById("reminder-edit").value = note.reminderDate;
  noteObj = note;
}

function onSubmitEdit() {
  const noteTemp = notes.find((note) => note.title === noteObj.title);

  noteTemp.title = document.getElementById("title-edit").value;
  noteTemp.content = document.getElementById("content-edit").value;
  noteTemp.color = document.getElementById("color-edit").value;
  noteTemp.tags = document.getElementById("tags-edit").value;
  noteTemp.tags = document.getElementById("reminder-edit").value;
  saveNotesToLocalStorage();
  onExitEdit();
  loadNotesFromLocalStorage();
}

function onExitEdit() {
  document.getElementById("edit-input-form").style.display = "none";
}

//  --------------------------- REMOVE NOTE ---------------------------

function removeNote(note) {
  const noteIndex = notes.findIndex((n) => n === note);
  notes.splice(noteIndex, 1);
  saveNotesToLocalStorage();
  loadNotesFromLocalStorage();
}

//  --------------------------- PIN/UNPIN NOTE ---------------------------
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
  manageListOrder();
  saveNotesToLocalStorage();
}

// --------------------------- DISPLAY NOTES ---------------------------
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
    titleElement.className = "mx-5 mt-2 text-2xl font-bold";

    const dateElement = document.createElement("small");
    dateElement.textContent = note.currentDate;
    dateElement.className = "mx-5";

    const contentElement = document.createElement("p");
    contentElement.textContent = note.content;
    contentElement.className = "mx-5 my-5 text-xl";

    const buttonElementPin = document.createElement("button");
    buttonElementPin.textContent = buttonText;
    buttonElementPin.className =
      "bg-blue-500 border-zinc-300 text-white rounded-md mx-2 my-2 min-h-[30px] min-w-[70px]";

    const buttonElementEdit = document.createElement("button");
    buttonElementEdit.textContent = "edit";
    buttonElementEdit.className =
      "bg-blue-500 border-zinc-300 text-white rounded-md mx-2 my-2 min-h-[30px] min-w-[70px]";

    const buttonElementRemove = document.createElement("button");
    buttonElementRemove.textContent = "remove";
    buttonElementRemove.className =
      "bg-blue-500 border-zinc-300 text-white rounded-md mx-2 my-2 min-h-[30px] min-w-[70px]";

    const tagsElement = document.createElement("p");
    tagsElement.textContent = note.tags;
    tagsElement.className = "mx-4 my-2 text-sm";

    const reminderElement = document.createElement("small");
    reminderElement.textContent = note.reminderDate;
    reminderElement.className = "w-30 h-30 bg-red-300";

    buttonElementPin.addEventListener("click", function () {
      handlePin(note);
      expandDOM();
    });

    buttonElementEdit.addEventListener("click", function () {
      document.getElementById("edit-input-form").style.display = "flex";
      editNote(note);
    });

    buttonElementRemove.addEventListener("click", function () {
      removeNote(note);
    });

    noteContainer.appendChild(titleElement);
    noteContainer.appendChild(dateElement);
    noteContainer.appendChild(reminderElement);
    noteContainer.appendChild(contentElement);
    noteContainer.appendChild(tagsElement);
    noteContainer.append(buttonElementPin);
    noteContainer.append(buttonElementEdit);
    noteContainer.append(buttonElementRemove);

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

function manageListOrder() {
  notes = [...pinnedNotes, ...unpinnedNotes];
}

// --------------------------- LOCAL STORAGE RELATED FUNCTIONS ---------------------------

function saveNotesToLocalStorage() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("isPinned").checked = false;
  document.getElementById("color").value = yellow;
  document.getElementById("tags").value = "";
  document.getElementById("reminder").value = "";

  localStorage.setItem("noteStorage", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const storedNotes = JSON.parse(localStorage.getItem("noteStorage")) || [];
  unpinnedNotes = storedNotes.filter((note) => !note.isPinned);
  pinnedNotes = storedNotes.filter((note) => note.isPinned);
  const dateCurrent = new Date().toISOString().substring(0, 10);
  let filteredNotes = storedNotes.filter((note) => {
    return note.reminderDate === dateCurrent;
  });
  console.log(filteredNotes);
  remindNote(filteredNotes);
  manageListOrder();
  expandDOM();
}
function clearLocalStorage() {
  localStorage.clear();
  loadNotesFromLocalStorage();
}

function remindNote(notesToRemind) {
  notesToRemind.forEach((note) => {
    alert(`Reminder: ` + note.title);
  });
}

loadNotesFromLocalStorage();
