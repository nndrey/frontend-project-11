import { proxy, subscribe, snapshot } from 'valtio/vanilla'
import { form, input } from './view.js'
import validate from './validate.js'
import render from './view.js'

export default () => {
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

  subscribe(state, () => {
    const currentState = snapshot(state)
    render(currentState)
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const currentState = snapshot(state)
    const formData = new FormData(e.target)
    const url = formData.get('url')

    validate(url, currentState)
      .then(() => {
        state.errors.form = []
        state.data.feeds = state.data.feeds.concat(url)
        input.focus()
        form.reset()
      })
      .catch((e) => {
        state.errors.form = [e.message]
      })
  },
  )
}
