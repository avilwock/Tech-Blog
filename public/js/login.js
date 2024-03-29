const loginFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  //This allows the screen to refresh
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  //This calls for the email and password
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // TODO: Add a comment describing the functionality of this expression
    //if both email and password are present and accurate, then they are allowed to log in
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
