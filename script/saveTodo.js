//Selectors
const todoLists = document.querySelector(".todo-list");
const savedFilterOptions = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);

//save todo list to local storage
function saveTodoLists(todo, filter) {
  let filters;
  let obj;

  obj = {};
  if (localStorage.getItem('filters') === null){
    filters = [];
  } else {
    filters = JSON.parse(localStorage.getItem('filters', ''));
  }
  obj["todo"] = todo.value;
  obj["filter"] = filter.value;
  filters.push(obj);
  localStorage.setItem('filters', JSON.stringify(filters));
}

//get todo from local storage
function getTodos(){
  let todos;

  if (localStorage.getItem('filters') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('filters'));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    var newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    //create span in li
    var span = document.createElement("span");
    span.innerText = todo.todo;
    span.id = "item-span";
    newTodo.appendChild(span);
    todoDiv.appendChild(newTodo);

    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    
     //edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="far fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    //deleted button
    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
    deletedButton.classList.add("deleted-btn");
    todoDiv.appendChild(deletedButton);
    
    // add filter option to class
    todoDiv.classList.toggle(todo.filter)

    //append to list
    todoLists.appendChild(todoDiv);
  })
  //add saved filters to filter
  addSavedFilters(todos);
}

//remove todo form local storage
function removeLocalTodos(todo){
  let todos;
  if (localStorage.getItem("filters") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("filters"));
  }
  localStorage.setItem("filters", JSON.stringify(todos));
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  todos = JSON.stringify(todos)
  localStorage.setItem("filters", todos);
}

//add user input filter option to select 
function addSavedFilters(filters){
  const options = savedFilterOptions.children;

  filters.forEach(function (filter) {
    for (var j = 0; j < options.length; j++) {
      if (options[j].value == filter.filter)
        break;
      if (options[j].value != filters.filter && j == options.length - 1) {

        var newOption = document.createElement("option");
        newOption.innerText = filter.filter;
        newOption.value = filter.filter;
        savedFilterOptions.appendChild(newOption);
        j = 0;
      }
    }
  });
}
