const userTodo = document.getElementsByClassName(".user-todo");
const todoUserList = document.getElementsByClassName(".todo-list");
// var form = document.querySelector(".login-content");

//Event listeners
document.addEventListener('DOMContentLoaded', getUserTodos);


//get users ToDo list
function getInfo() {
  console.log("getInfo");
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  let objUsers = JSON.parse(localStorage.getItem('login', ''));

  if (username === "" || password === "") {
    swal("Oops!", "Please enter username and password", "error");
    return;
  }
  //searches for matching username and password
  for (i = 0; i < objUsers.length; i++) {
    if (username == objUsers[6].username && password == objUsers[6].passworld) { //changet  o password!!!!!
      console.log("boom");
      getUserTodos(objUsers[6]);
      window.location.href = "toDo.html";
    }
    //if no match found, popup window error
    if (i === objUsers.length) {
      console.log("there");
      swal("Inncorect username or password", "We did not recognize your username or passworld. Please reenter correct username and password or join The Ultimate Todo List.", "error");
      return;
    }
  }
}

//creates new user and send to new user ToDo list
function joinTodo() {
  console.log("join");
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  let login;
  let obj;
  
  obj = {};
  if (localStorage.getItem('login') === null) {
    login = [];
  } else {
    login = JSON.parse(localStorage.getItem('login', ''));
  }
  //check for existing user name
  for (i = 0; i < login.length; i++) {
    //if username already exisits, popup window error
    if (username == login[i].username) {
      swal("User already exists", "Please choose a different username", "error");
      return;
    }
  }
  //adds user and passworld to local storage
  obj["username"] = username;
  obj["password"] = password;
  login.push(obj);
  localStorage.setItem('login', JSON.stringify(login));

  //create input in to htmlindex
  console.log(userTodo);
  userTodo.id = obj.username;
  post('../pages/todo.html', {username: userTodo.id});
}

//submit information to todo.html
function post(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  console.log(form);
  form.submit();
}


//get todo from local storage
function getUserTodos(user){
  userTodo.id = user.username;
  console.log(userTodo.id);
  let todos;
  if (localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(todos);
  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //create li
    var newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    //create span in li
    var span = document.createElement("span");
    span.innerText = todo;
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
    
    //add filter option to class
    // const optionClass = tagOption;
    // optionClass.value = optionClass.value.toLowerCase();
    // todoDiv.classList.toggle(optionClass.value)
  
    //append to list
    todoUserList.appendChild(todoDiv);
  })
}
