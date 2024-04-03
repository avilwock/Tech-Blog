// function to delete post
async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split("/").pop(); // Simplified getting id
   
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  // If successful, redirect the browser to the dashboard page
    if (response.ok) {
      document.location.replace("/dash");
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);