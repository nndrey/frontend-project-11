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

const renderFeeds = (state, i18n) => {
  input.classList.remove('is-invalid')
  feedBack.classList.remove('text-danger')
  feedBack.classList.add('text-success')
  feedBack.textContent = i18n.t('processes.loading.feed')
}

const renderPosts = (state, i18n) => {
  console.log(state, i18n)
}

const renderErrors = (state) => {
  input.classList.remove('is-valid')
  input.classList.add('is-invalid')
  feedBack.classList.remove('text-success')
  feedBack.classList.add('text-danger')

  const [message] = state.errors.form
  feedBack.textContent = message
}
export { form, input, renderFeeds, renderPosts, renderErrors }
