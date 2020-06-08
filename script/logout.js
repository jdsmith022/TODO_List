/*Below function logs out user and returns them to login page */

function logoutUser() {
	window.localStorage.removeItem("currUser");
	window.location.replace('../pages/index.html');
}
