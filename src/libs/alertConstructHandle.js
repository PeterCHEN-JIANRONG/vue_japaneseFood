const errorAlertConstruct = (title, text = '') => ({
  position: 'top',
  icon: 'error',
  title,
  text,
  showConfirmButton: false,
  timer: 1500,
});

const successAlertConstruct = (title, text = '') => ({
  position: 'top',
  icon: 'success',
  title,
  text,
  showConfirmButton: false,
  timer: 1500,
});

module.exports = {
  errorAlertConstruct,
  successAlertConstruct,
};
