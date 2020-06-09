/*Below are functions to handle login and join buttons.
For this exercises, username, password, and todolist are saved in localStorage.
This is very insecure and should not be used unless for such exercises*/

const userTodo = document.getElementsByClassName(".user-todo");
const username = document.querySelector(".username");
const passworld = document.querySelector(".password");
const objUsers = JSON.parse(localStorage.getItem('login', ''));

/*Shows window with only login button */
function onLogin() {
  const form = document.getElementById('login');
  form.style.display = "flex";
  const join = document.getElementById('join-btn');
  join.style.display = "none";
  const login = document.getElementById('login-btn');
  login.style.display = "flex";
}

/*Shows window with only join button */
function onJoin() {
  const form = document.getElementById('login');
  form.style.display = "flex";
  const join = document.getElementById('join-btn');
  join.style.display = "flex";
  const login = document.getElementById('login-btn');
  login.style.display = "none";
}

/*get users ToDo list*/
function getUserInfo() {
  if (username.value === null || password.value === null) {
    swal("Oops!", "Please enter username and password", "error");
    return;
  }
  if (objUsers === null) {
    swal("Inncorect username or password",
    "We did not recognize your username or password. \
    Please join The Ultimate Todo List.",
    "error");
    return;
  }
  //searches for matching username and password
  for (i = 0; i < objUsers.length; i++) {
    console.log(i, objUsers.length);
    if (username.value == objUsers[i].username && password.value == objUsers[i].password) {
      post('../pages/todo.html', {login: username.value});
    }
    //if no match found, popup window error
    if (i === objUsers.length - 1) {
      swal("Inncorect username or password",
      "We did not recognize your username or password. \
      Please enter correct username and password or join The Ultimate Todo List.",
      "error");
      return;
    }
  }
}

/*creates new username and passworld in localStorage and submits username*/
function joinTodo() {
  let login;
  let obj;

  if (username.value === null || password.value === null) {
    swal("Oops!", "Please enter username and password", "error");
    return;
  }
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
    if (username.value == login[i].username) {
      swal("User already exists", "Please choose a different username", "error");
      return;
    }
  }
  //adds user and passworld to localStorage
  obj["username"] = username.value;
  obj["password"] = password.value;
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
