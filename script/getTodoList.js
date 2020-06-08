/*Below is  the fuction the retreives the user's saved todo list and
add their saved filters to select.  */


/*sees if user list already exists and has content*/
function loadUserTodo() {
	let currUser;
	
	currUser = JSON.parse(localStorage.getItem("currUser", ''));
	if (localStorage.getItem(currUser.toString()) === null) {
		return;
	} else {
		getTodos();
		return;
	}
}

/*takes found userList in localStorage or created new empty list*/
function getTodos() {
	let currUser = JSON.parse(localStorage.getItem("currUser", ''));
	let todos  = JSON.parse(localStorage.getItem(currUser.toString(), ''));

	todos.forEach(function (todo) {
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
		todoDiv.id = todo.filter;
		todoDiv.classList.toggle(todo.filter)
  
	  //append to list
	  todoLists.appendChild(todoDiv);
	})
	//add saved filters to filter
	addSavedFilters(todos);
}

  /*add user input filter option to select */
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
  