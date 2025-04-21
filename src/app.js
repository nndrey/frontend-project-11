import onChange from 'on-change';
import i18next from 'i18next';
import init from './init.js';
import render from './view.js';
import validatorUrl from './validate.js';
import resources from './locales/index.js';

const formRss = document.querySelector('form.rss-form');

const initialState = init();

export default () => {
  const defaultLang = 'ru';

  const i18n = i18next.createInstance();
  i18n.init({
    lng: defaultLang,
    debug: true,
    resources,
  });

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
        watcheState.formData.currentUrl = url;
        err.errors.map((error) => console.log(i18n.t(error.key)));
      });
  });
};
