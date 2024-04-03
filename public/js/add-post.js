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

// Function to handle form submission for updating existing post
async function updateFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('.update-post-form').getAttribute('data-id');
    const title = document.querySelector('input[name="post-title"]').value;
    const text = document.querySelector('textarea[name="text"]').value;

    if (title && text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title,
                text,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.reload(); // Reload the page after successful update
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelectorAll(".edit-post-btn").forEach(button => {
    button.addEventListener("click", async function() {
        const post_id = button.getAttribute("data-id");

        // Fetch post details
        const response = await fetch(`/api/posts/${post_id}`);
        if (!response.ok) {
            alert("Failed to fetch post details");
            return;
        }
        const post = await response.json();

        // Populate form fields
        document.querySelector('input[name="post-title"]').value = post.title || newPostTitle;
        document.querySelector('textarea[name="text"]').value = post.text || newPostText;
        document.querySelector('.update-post-form').setAttribute('data-id', post_id);
    });
});

document.querySelector("#update-post-form").addEventListener("submit", updateFormHandler);
