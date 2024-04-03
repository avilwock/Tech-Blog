async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const text = document.querySelector('input[name="text"]').value.trim();
    console.log(title);
    console.log(text);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          title,
          text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dash/');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);