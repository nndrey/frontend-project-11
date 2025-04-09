import onChange from 'on-change';
import init from './init.js';
import render from './view.js';
import validatorUrl from './validate.js';

const formRss = document.querySelector('form.rss-form');

const initialState = init();
export default () => {
  const watcheState = onChange(initialState, () => render(watcheState));
  formRss.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validatorUrl(url, watcheState.formData.collectionUrl)
      .then((link) => {
        watcheState.formData.currentUrl = link;
        watcheState.formData.collectionUrl.push(link);
        watcheState.formData.validation = true;
      })
      .catch((err) => {
        watcheState.formData.validation = false;
        watcheState.formData.currentUrl = err;
      });
  });
};
