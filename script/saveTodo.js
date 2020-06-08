/*Below are the functions that save and removes the user's todo list. */

/*Selectors*/
const todoLists = document.querySelector(".todo-list");
const savedFilterOptions = document.querySelector(".filter-todo");
const userName = JSON.parse(localStorage.getItem("currUser", ''));
const savedItems = JSON.parse(localStorage.getItem(userName.toString(), ''));

/*save todo list to local storage*/
function saveTodoLists(todo, filter) {
  let todos;
  let obj;

  obj = {};
  if (localStorage.getItem(userName.toString()) === null ) {
    console.log("here");
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(userName.toString(), ''));
  }
  obj["todo"] = todo.value;
  obj["filter"] = filter.value;
  todos.push(obj);
  localStorage.setItem(userName.toString(), JSON.stringify(todos));
}


/*remove todo form local storage*/
function removeLocalTodos(todo){
  let todos;

  console.log(todo);
  if (localStorage.getItem(userName.toString()) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(userName.toString()));
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  todos = JSON.stringify(todos)

  localStorage.setItem(userName.toString(), JSON.stringify(todos));
}
