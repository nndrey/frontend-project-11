import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import init from './init.js';
import render from './view.js';
import validatorUrl from './validate.js';
import resources from './locales/index.js';
import parserDom from './parserRss.js';
import createFeedAndPost from './createFeedAndPost.js';

const formRss = document.querySelector('form.rss-form');
const proxyLink = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
const initialState = init();

export default () => {
  const defaultLang = 'ru';

  const i18n = i18next.createInstance();
  i18n.init({
    lng: defaultLang,
    debug: false,
    resources,
  });

  const watcheState = onChange(initialState, (path, val) => render(watcheState, i18n, path, val));
  formRss.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');
    validatorUrl(url, watcheState.formData.collectionUrl)
      .then((link) => {
        watcheState.formData.currentUrl = link;
        watcheState.formData.collectionUrl.push(link);
        watcheState.formData.validation = true;

        axios.get(proxyLink + link)
          .then((response) => {
            watcheState.errors = {};
            const dataRss = response.data.contents;
            const dataFeedAndPosts = parserDom(dataRss);
            const newFeedAndPosts = createFeedAndPost(dataFeedAndPosts);
            watcheState.rss_data = 'itRead';
            const { feed, posts } = newFeedAndPosts;
            watcheState.feeds = watcheState.feeds.concat(feed);
            watcheState.posts = watcheState.posts.concat(posts);
          })
          .catch((e) => {
            watcheState.errors.error = i18n.t(e.message);
            watcheState.rss_data = 'notRead';
          });
      })
      .catch((err) => {
        watcheState.formData.validation = false;
        watcheState.formData.currentUrl = url;
        err.errors.map((error) => {
          watcheState.errors.error = i18n.t(error.key);
          return error;
        });
      });
  });
};
