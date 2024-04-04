module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    console.log('Input date:', date);
    if (!date || isNaN(new Date(date))) {
      return 'Invalid Date';
    }
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    return formattedDate;
  },
  getUserName: function(users, user_id) {
    // Loop through the users array to find the user with the specified user_id
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user_id) {
        return users[i].name;
      }
    }
    // Return empty string if user not found
    return '';
  }
};
