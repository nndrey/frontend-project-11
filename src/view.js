const {
  form,
  input,
  feedBack,
  postsContainer,
  feedsContainer,
} = {
  form: document.querySelector('form.rss-form'),
  input: document.getElementById('url-input'),
  feedBack: document.querySelector('.feedback'),
  postsContainer: document.querySelector('.posts'),
  feedsContainer: document.querySelector('.feeds'),
}
console.log(postsContainer, feedsContainer)

export default (state) => {
  const { errors } = state
  if (errors.form.length > 0) {
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    feedBack.classList.remove('text-success')
    feedBack.classList.add('text-danger')

    const [message] = errors.form
    feedBack.textContent = message
    return
  }
  input.classList.remove('is-invalid')
  feedBack.classList.remove('text-danger')
  feedBack.classList.add('text-succes')
  feedBack.textContent = 'RSS успешно загружен'
}
export { form, input }
