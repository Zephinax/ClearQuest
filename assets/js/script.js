const inputBox = document.getElementById('inputBox');
const listContainer = document.getElementById('listContainer');
const recentlyListContainer = document.getElementById('recentlyListContainer')
var checkbox = document.getElementById("theme-checkbox");
var theme = "dark";

// ------------------------------------------------------Add Task-------------------------------------------------------

function addTask() {
    if (inputBox.value === '') {
      alert('You must write something!');
    } else {
      let li = document.createElement('li');
      li.innerHTML = '<div class="list"><button class="toggleBtn" onclick="makeChecked(event)"></button><button onclick="expandListItem(event)" class="taskTxt" id="taskTxt">' + inputBox.value + '</button><button class="deleteTask" onclick="deleteTask(event)"></button></div>';
      li.classList.add("fade-in");
      li.classList.add("listItem");
      li.id="listItem"
      listContainer.appendChild(li);
      inputBox.value = '';
      saveData();
      len();
    }
  };

// ---------------------------------------------------------Len---------------------------------------------------------- 

function len() {
  var listItemElements = document.getElementById("listContainer");
  var numberOfListItems = listItemElements.getElementsByTagName("li");
  var allnumber = numberOfListItems.length;
  var spanAll = document.getElementById('all');
  spanAll.textContent = allnumber;
  var recentlyListItems = recentlyListContainer.getElementsByTagName("li");
  var recentlyNumber = recentlyListItems.length;
  var spanCompleted = document.getElementById('completed');
  spanCompleted.textContent = recentlyNumber;
  if (recentlyNumber == 0){
    document.getElementById("CompletedContainer").style.display = "none";
    recentlyListContainer.style.display = "none"
    document.getElementById("expandBtn").classList.remove("expandBtnEx")
  } else {
    document.getElementById("CompletedContainer").style.display = "block";
  }
}

// ----------------------------------------------------Make Checked---------------------------------------------------------

function makeChecked(event){
    var button = event.target;
    var listItem = button.parentElement;
    var taskTxt = listItem.querySelector("#taskTxt");
    const source = listItem.parentElement;
    const destination = document.getElementById("recentlyListContainer");
    taskTxt.classList.toggle("textChecked");
    if (taskTxt.classList.contains("textChecked")) {
        button.classList.add("toggleBtnChecked");
        destination.appendChild(source);
        saveData();
      } else {
        button.classList.remove("toggleBtnChecked");
        destination.removeChild(source);
        listContainer.appendChild(source);
        saveData();
      }
};

// ---------------------------------------------------------Delete----------------------------------------------------------

function deleteTask(event) {
  var button = event.target;
  var listDiv = button.parentElement;
  var listItem = listDiv.parentElement;
  listItem.classList.remove('fade-in')
  listItem.classList.add('fade-out');
  setTimeout(function() {
    listItem.parentNode.removeChild(listItem);
    saveData();
  }, 300); 
};

// ----------------------------------------------------Submit With Enter----------------------------------------------------

document.getElementById("inputBox").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault(); 
      document.getElementById("addBtn").click(); 
    }
  });

// ----------------------------------------------------Enable Dark Mode----------------------------------------------------

function toggleTheme() {
const todoApp = document.getElementById("todoApp");
const container = document.getElementById("container");
const addTaskBtn = document.getElementById("addBtn");
if (checkbox.checked) {
  todoApp.classList.add("todoAppDark");
  container.classList.add("containerDark");
  addTaskBtn.classList.add("addBtnDark");
  theme = "dark";
  saveData();
} else {
  todoApp.classList.remove("todoAppDark");
  container.classList.remove("containerDark");
  addTaskBtn.classList.remove("addBtnDark");
  theme = "light";
  saveData();
}
};

// ------------------------------------------------Expand Recently Done---------------------------------------------------

function expand(event) {
  button = event.target;
  button.classList.toggle("expandBtnEx")
  if (button.classList.contains("expandBtnEx")){
    recentlyListContainer.style.display = 'block'
  } else {
    recentlyListContainer.style.display = 'none'
  }
}



// ------------------------------------------------------Save Data--------------------------------------------------------

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  localStorage.setItem("recently", recentlyListContainer.innerHTML)
  localStorage.setItem("theme", theme);
  len();
}

function restoreData() {
  listContainer.innerHTML = localStorage.getItem("data");
  recentlyListContainer.innerHTML = localStorage.getItem("recently")
  var storedTheme = localStorage.getItem("theme");
  if (storedTheme == "dark") {
    checkbox.checked = true;
    toggleTheme();
  } else {
    checkbox.checked = false;
    toggleTheme();
  }
}
restoreData();



  

