//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton  = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const tagOption = document.querySelector(".tag-options");
const editItem = document.querySelector(".todo-item");
const todoForm = document.querySelector(".todo-form")


//Event listeners
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", addOption);
todoList.addEventListener("click", buttonCheck);
filterOption.addEventListener("change", filterTodo);


//Functions
function addTodo(event) {
  //prevent form from submitting

  console.log("hello there friend");
  event.preventDefault();
  
  //todo div for item
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li for item
  var newTodo = document.createElement("li");
  if (todoInput.value == "")
    return;
  newTodo.classList.add("todo-item");
  
  //create span in li
  var span = document.createElement("span");
  span.innerText = todoInput.value;
  span.id = "item-span";
  newTodo.appendChild(span);
  todoDiv.appendChild(newTodo);
  
  //add completed button to item
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  
  //add edit button to item
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="far fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  
  //add deleted button to item
  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
  deletedButton.classList.add("deleted-btn");
  todoDiv.appendChild(deletedButton);
  
  //add filter option to class of item
  const optionClass = tagOption;
  optionClass.value = optionClass.value.toLowerCase();
  todoDiv.classList.toggle(optionClass.value)
  
  //append to li item to todo list
  todoList.appendChild(todoDiv);
  
  //save to local storage
  tagOption.value = tagOption.value.toLowerCase();
  saveTodoLists(todoInput, tagOption);

  //clear todo input value
  todoInput.value = "";
}

function buttonCheck (e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "deleted-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    })
  }
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    editListItem(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      //filter for user added filters
      case e.target.value:
        if (todo.classList.contains(e.target.value)){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      }
  });
}


//add user input filter option to select filter
function addOption(e){
  const options = filterOption.children;
  tagOption.value = tagOption.value.toLowerCase();
  if (tagOption === "")
    return;
  for (var i = 0; i < options.length; i++) {
    if (options[i].textContent === tagOption.value){
      tagOption.value = "";
      return;
    }
  }
  var newOption = document.createElement("option");
  newOption.innerText = tagOption.value;
  newOption.innerText = newOption.innerText.toLowerCase();
  newOption.value = tagOption.value;
  newOption.value = newOption.value.toLowerCase();
  filterOption.appendChild(newOption);
  tagOption.value = "";
}

//edit item in list
function editListItem(todo){
  // var listItem = todo.children;
  var item = todo.querySelector("li");
  var input = item.getElementsByTagName('span');

  var spanText = input.text(); // get span input 
  var newInput = "<input value=" + spanText + ">"; // set it to input for edit
  span.html(newInput); // paste inside span

  // input.disabled = false;
  // input.className = " activeTextInput ";
}