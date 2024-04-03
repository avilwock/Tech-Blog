async function signupFormHandler(event) {
    event.preventDefault();
    
    // Collect values from the sign up form
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim(); // Add this line
    const password = document.querySelector("#password-signup").value.trim();
  
    // Send a POST request to the API endpoint
    if (username && email && password) { // Update this line to include email
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log("success");
        // If successful, redirect the browser to the dashboard page
        document.location.replace("/dash");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler); // Update this line to match your form class
  