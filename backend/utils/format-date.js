function formatDate(rawDate) {
  const dateObject = new Date(rawDate);
  return `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
}

module.exports = {
  formatDate,
};
