import onChange from 'on-change'
import i18next from 'i18next'
import init from './init.js'
import render from './view.js'
import validatorUrl from './validate.js'
import resources from './locales/index.js'
import makeRequest from './makeRequest.js'
import checkingForUpdates from './checkingForUpdates.js'

const uiState = { modal: [], selectedPost: null }
const proxyUrl = new URL('https://allorigins.hexlet.app/get?disableCache=true&url=')

export default () => {
  const initialState = { ...init(), uiState }
  const formRss = document.querySelector('form.rss-form')
  const postBox = document.querySelector('.posts')

  const defaultLang = 'ru'
  const i18n = i18next.createInstance()
  i18n.init({
    lng: defaultLang,
    debug: false,
    resources,
  })

  const handleClick = uiSt => (event) => {
    const idTarget = event.target.dataset.id
    const selectedPost = idTarget
    const modalItem = uiSt.modal.map((item) => {
      if (item.id === idTarget) {
        return { ...item, readIt: true }
      }
      return { ...item }
    })
    return { modal: modalItem, selectedPost }
  }

  const watcheState = onChange(initialState, (path, val) => render(watcheState, i18n, path, val))
  postBox.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const updateUiState = handleClick(watcheState.uiState)(event)
      watcheState.uiState.selectedPost = updateUiState.selectedPost
      watcheState.uiState.modal = updateUiState.modal
    }
  })
  formRss.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const url = formData.get('url')
    validatorUrl(url, watcheState.formData.collectionUrl)
      .then((link) => {
        const url = new URL(proxyUrl.href + link)
        watcheState.feedAdditionStatus = 'start'
        makeRequest(url.href)
          .then((data) => {
            watcheState.errors = {}
            watcheState.formData.collectionUrl.push(link)
            watcheState.formData.validation = 'valid'
            watcheState.feedAdditionStatus = 'success'
            const { feed, posts } = data
            watcheState.feeds = watcheState.feeds.concat(feed)
            watcheState.posts = watcheState.posts.concat(posts)
            const postForUi = posts.map(({ id }) => ({ id, readIt: false }))
            watcheState.uiState.modal = watcheState.uiState.modal.concat(postForUi)
          })
          .catch((e) => {
            watcheState.feedAdditionStatus = 'failure'
            throw e
          })
      })
      .catch((err) => {
        watcheState.formData.validation = 'inValid'
        err.errors.map((error) => {
          watcheState.errors.error = i18n.t(error.key)
          return error
        })
      })
  })
  const upDate = () => {
    const { feeds, posts } = watcheState
    return checkingForUpdates(makeRequest, feeds, watcheState)
      .then((newPosts) => {
        if (newPosts.length > 0) {
          watcheState.formData.validation = null
          watcheState.posts = posts.concat(newPosts)
          const postForUi = newPosts.map(({ id }) => ({ id, readIt: false }))
          watcheState.uiState.modal = watcheState.uiState.modal.concat(postForUi)
        }
      })
      .catch(() => {
        watcheState.errors.error = i18n.t('errors.upDate_error')
      })
      .finally(() => {
        setTimeout(upDate, 5000)
      })
  }
  upDate()
}
