// Update the submitCommentForm function
function submitCommentForm(post_id) {
    // Prevent default form submission
    event.preventDefault();

    // Get the form element by its ID
    var form = document.getElementById('add-comment-form-' + post_id);

    // Fetch the form data
    var formData = new FormData(form);

    // Perform an AJAX request or any custom form submission logic here
    // For example:
    fetch('/api/comments' + post_id, { // Change the URL to the correct endpoint
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Failed to submit comment form');
            throw new Error('Failed to submit comment form');
        }
    })
    .then(newComment => {
        // Create HTML markup for the new comment
        var newCommentHTML = `
            <li>
                <div class="comment-details">
                    <p>${newComment.comment_text}</p>
                    <p>Comment by ${newComment.user_id} on ${newComment.created_at}</p>
                </div>
            </li>
        `;

        // Append the new comment HTML to the comments list
        var commentsList = document.getElementById('comments-list-' + post_id);
        commentsList.insertAdjacentHTML('beforeend', newCommentHTML);

        // Clear the comment textarea
        form.reset();
    })
    .catch(error => {
        console.error('Error submitting comment form:', error);
    });
}