/*Below are the functions that save and removes the user's todo list. */

/*Selectors*/
const todoLists = document.querySelector(".todo-list");
const savedFilterOptions = document.querySelector(".filter-todo");
const userName = JSON.parse(localStorage.getItem("currUser", ''));
const filterOptions = document.querySelector(".filter-todo");


/*save todo list to local storage*/
function saveTodoLists(todo, filter) {
  let todos;
  let obj;

  obj = {};
  if (localStorage.getItem(userName.toString()) === null ) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(userName.toString(), ''));
  }
  obj["todo"] = todo.value;
  obj["filter"] = filter.value;
  obj["completed"] = "false";
  todos.push(obj);
  localStorage.setItem(userName.toString(), JSON.stringify(todos));
};


/*remove todo form local storage*/
function removeLocalTodos(todo){
  let objects;

  if (localStorage.getItem(userName.toString()) === null) {
    objects = [];
  } else {
    objects = JSON.parse(localStorage.getItem(userName.toString()));
  }
  const todoIndex = todo.children[0].innerText;
  const todoId = todo.id;
  for (var i = 0; i < objects.length; i++) {
    console.log(objects[i]["todo"], todoIndex, objects[i]["filter"], todoId)
    if (objects[i]["todo"] === todoIndex && objects[i]["filter"] == todoId) {
      objects.splice(i, 1);
      localStorage.setItem(userName.toString(), JSON.stringify(objects));
      return;
    }
  }
};
