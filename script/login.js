/*Below are functions to handle login and join buttons. 
For this exercises, username, password, and todolist are saved in localStorage.
This is very insecure and should not be used unless for such exercises*/

const userTodo = document.getElementsByClassName(".user-todo");
const userLists = document.getElementsByClassName(".todo-list");

/*get users ToDo list*/
function getUserInfo() {
  console.log("getInfo");
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  let objUsers = JSON.parse(localStorage.getItem('login', ''));

  if (username === null || password === null) {
    swal("Oops!", "Please enter username and password", "error");
    return;
  }
  //searches for matching username and password
  for (i = 0; i < objUsers.length; i++) {
    if (username == objUsers[i].username && password == objUsers[i].password) {
      post('../pages/todo.html', {login: username});
    }
    //if no match found, popup window error
    if (i === objUsers.length) {
      console.log("there");
      swal("Inncorect username or password", "We did not recognize your username or passworld. Please reenter correct username and password or join The Ultimate Todo List.", "error");
      return;
    }
  }
}

/*creates new username and passworld in localStorage and submits username*/
function joinTodo() {
  console.log("joinTodo");
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  let login;
  let obj;
  
  obj = {};
  //check is there are username and passwords stored in login localStorage
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
  //adds user and passworld to localStorage
  obj["username"] = username;
  obj["password"] = password;
  login.push(obj);
  localStorage.setItem("login", JSON.stringify(login));

  post('../pages/todo.html', {login: username});
}

//submit information to todo.html of user
function post(path, params, method="post") {
  const form = document.createElement("form");
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

//stores current user in localStorage to recieve current user's todo list
window.serialize = function(form) {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  let currUser;
  currUser = [];
  switch (form.elements[0].nodeName) {
    case "INPUT":
      switch (form.elements[0].type) {
        case "text":
        case "submit":
        currUser.push(encodeURIComponent(form.elements[0].value.replace(/ /g, '')));
        break;
      }
      break;
    }
  localStorage.setItem("currUser", JSON.stringify(currUser));
}
