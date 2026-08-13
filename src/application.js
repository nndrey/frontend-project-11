import { proxy, subscribe, snapshot } from 'valtio/vanilla'
import i18next from 'i18next'
import resources from './locales/index.js'
import { form, input, renderFeeds, renderPosts, renderErrors } from './view.js'
import validate from './validate.js'

export default () => {
  const defaultLanguage = 'ru'
  const i18nextInstance = i18next.createInstance()
  i18nextInstance.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  })
    .then(() => {
      const state = proxy({
        data: {
          feeds: [],
          posts: [],
        },
        errors: {
          form: [],
          network: [],
        },
      })

      subscribe(state.data.feeds, () => {
        const currentState = snapshot(state)
        renderFeeds(currentState, i18nextInstance)
      })

      subscribe(state.data.posts, () => {
        const currentState = snapshot(state)
        renderPosts(currentState, i18nextInstance)
      })

      subscribe(state.errors, () => {
        const currentState = snapshot(state)
        renderErrors(currentState)
      })

      form.addEventListener('submit', (e) => {
        e.preventDefault()

        const currentState = snapshot(state)
        const formData = new FormData(e.target)
        const url = formData.get('url').trim()

        validate(url, currentState, i18nextInstance)
          .then(() => {
            state.data.feeds.push(url)
            input.focus()
            form.reset()
          })
          .catch((e) => {
            state.errors.form = [i18nextInstance.t(e.message)]
          })
      },
      )
    })
}
