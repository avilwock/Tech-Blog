async function commentFormHandler(event) {
    event.preventDefault();

    const commentText = document.querySelector('input[name="comment-text"]').value;
    const segments = window.location.pathname.split('/');
    const post_id = segments[segments.length - 1];

    try {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ 
                comment_text: commentText,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Comment submitted successfully');
            window.location.reload(); // Reload the current page
        } else {
            console.error('Failed to submit comment');
        }
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
}
