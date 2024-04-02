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
  }
};