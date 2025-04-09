const inputRss = document.querySelector('#url-input');

export default (watcheState) => {
  if (watcheState.formData.validation) {
    inputRss.classList.remove('is-invalid');
    inputRss.value = '';
    inputRss.focus();
  } else {
    inputRss.classList.add('is-invalid');
    inputRss.value = '';
    inputRss.focus();
  }
};
