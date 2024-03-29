const logout = async () => {
  // TODO: Add a comment describing the functionality of this expression
  //This calls for the logout screen
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // TODO: Add a comment describing the functionality of this statement
    //This calls for the login screen if failing to logout
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
