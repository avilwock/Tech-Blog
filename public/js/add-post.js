let newPostTitle = '';
let newPostText = '';

// Function to handle form submission for adding a new post
async function newFormHandler(event) {
    event.preventDefault();

    newPostTitle = document.querySelector('input[name="post-title"]').value;
    newPostText = document.querySelector('textarea[name="text"]').value;

    if (newPostTitle && newPostText) {
        const response = await fetch(`/api/posts`, {
            method: "POST",
            body: JSON.stringify({
                title: newPostTitle,
                text: newPostText,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/dash");
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#add-post-form").addEventListener("submit", newFormHandler);