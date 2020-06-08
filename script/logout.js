function logoutUser() {
	let currUser;

	currUser = JSON.parse(localStorage.getItem('currUser'));
	currUser.length = 0;
	currUser.push(currUser);
  	localStorage.setItem('currUser', JSON.stringify(currUser))
}
