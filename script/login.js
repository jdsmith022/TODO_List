/*Below are functions to handle login and join buttons.
For this exercises, username, password, and todolist are saved in localStorage.
This is very insecure and should not be used unless for such exercises*/


/*Selector*/
const userTodo = document.getElementsByClassName(".user-todo");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const objUsers = JSON.parse(localStorage.getItem("login", ""));
const loginButton = document.querySelector(".click-login");
const joinButton = document.querySelector(".click-join");
const errorButton = document.querySelector(".cancel-btn");
const form = document.getElementById('login');
const join = document.getElementById('join-btn');
const login = document.getElementById('login-btn');


/*Event Listeners*/
loginButton.addEventListener("click", onLogin);
joinButton.addEventListener("click", onJoin);
errorButton.addEventListener("click", onError);

/*Shows window with only login button*/
function onLogin() {
  form.style.display = "flex";
  join.style.display = "none";
  login.style.display = "flex";
}

/*Shows window with only join button*/
function onJoin() {
  form.style.display = "flex";
  join.style.display = "flex";
  login.style.display = "none";
}

/*Displays non login form when cancel or error */
function onError() {
  form.style.display = "none";
  join.style.display = "none";
  login.style.display = "none";
}


/*get users ToDo list*/
function getUserInfo() {
  if (username.value === "" || password.value === "") {
    swal("Oops!", "Please enter username and password", "error");
    onError();
    return;
  }
  if (objUsers === null) {
    onError();;
    swal("Inncorect username or password",
    "We did not recognize your username or password. \
    Please join The Ultimate Todo List.",
    "error");
    return;
  }
  //searches for matching username and password
  for (i = 0; i < objUsers.length; i++) {
    if (username.value == objUsers[i].username && password.value == objUsers[i].password) {
      post('../pages/todo.html', {login: username.value});
    }
    //if no match found, popup window error
    if (i === objUsers.length - 1) {
      onError();
      swal("Inncorect username or password",
      "We did not recognize your username or password. \
      Please enter correct username and password or join Jessica's Todo List.",
      "error");
      return;
    }
  }
}


/*creates new username and password in localStorage and submits username*/
function joinTodo() {
  let login;
  let obj;

  if (username.value === "" || password.value === "") {
    swal("Oops!", "Please enter username and password", "error");
    return;
  }
  obj = {};
  if (localStorage.getItem('login') === null) {
    login = [];
  } else {
    login = JSON.parse(localStorage.getItem('login', ''));
  }
  //check is there are username and passwords stored in login localStorage
  for (i = 0; i < login.length; i++) {
    //if username already exisits, popup window error
    if (username.value == login[i].username) {
      swal("User already exists", "Please choose a different username", "error");
      return;
    }
  }
  //check for existing user name
  //adds user and password to localStorage
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
      hiddenField.type = "hidden";
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}


/*stores current user in localStorage to recieve current user's todo list*/
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

/*form submit on enter*/
password.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (login.style.display = "flex") {
      document.getElementById("login-btn").click();
    } else {
      document.getElementById("join-btn").click();
    }
  }
});
