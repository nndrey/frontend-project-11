const inputRss = document.querySelector('#url-input');
const feedBack = document.querySelector('p.feedback');
const feedBox = document.querySelector('.feeds');
const postBox = document.querySelector('.posts');

export default (watcheState, i18n, path, val) => {
  const renderFeed = (feeds) => {
    const divFeed = document.createElement('div');
    divFeed.classList.add('card', 'border-0');

    const divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');

    const headerFeeds = document.createElement('h2');
    headerFeeds.classList.add('card-title', 'h4');
    headerFeeds.textContent = i18n.t('title_Feeds');
    divCardBody.append(headerFeeds);
    divFeed.append(divCardBody);

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    divCardBody.append(ul);
    feeds.forEach((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      h3.textContent = feed.title;
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      p.textContent = feed.description;
      li.append(h3);
      li.append(p);
      ul.append(li);
    });
    return divFeed;
  };
  const renderPosts = (posts) => {
    const divBoxPosts = document.createElement('div');
    divBoxPosts.classList.add('card', 'border-0');

    const divCard = document.createElement('div');
    divCard.classList.add('card-body');
    const headerPosts = document.createElement('h2');
    headerPosts.classList.add('card-title', 'h4');
    headerPosts.textContent = i18n.t('title_Posts');
    divCard.append(headerPosts);

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');

    divBoxPosts.append(divCard);
    divBoxPosts.append(ul);

    posts.forEach((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const aElem = document.createElement('a');
      aElem.classList.add('fw-bold');
      aElem.setAttribute('href', `${post.link}`);
      aElem.setAttribute('data-id', `${post.id}`);
      aElem.setAttribute('target', '_blank');
      aElem.setAttribute('rel', 'noopener noreferrer');
      aElem.textContent = post.title;

      const btnElem = document.createElement('button');
      btnElem.classList.add('btn', 'btn-outline-primary', 'btn-sm"');
      btnElem.setAttribute('type', 'button');
      btnElem.setAttribute('data-id', `${post.id}`);
      btnElem.setAttribute('data-bs-toggle', 'modal');
      btnElem.setAttribute('data-bs-target', '#modal');
      btnElem.textContent = i18n.t('button_name');
      li.append(aElem);
      li.append(btnElem);
      ul.append(li);
    });
    return divBoxPosts;
  };

  if (watcheState.formData.validation) {
    inputRss.classList.remove('is-invalid');
    inputRss.value = '';
    inputRss.focus();
  } else {
    inputRss.classList.add('is-invalid');
  }
  if (val === 'itRead') {
    feedBack.classList.remove('text-danger');
    feedBack.classList.add('text-success');
    feedBack.textContent = i18n.t('text_success');
  }
  if (val === 'notRead') {
    feedBack.classList.remove('text-success');
    feedBack.classList.add('text-danger');
    feedBack.textContent = i18n.t('errors.parserRss');
  }
  if (watcheState.errors.error) {
    feedBack.classList.remove('text-success');
    feedBack.classList.add('text-danger');
    feedBack.textContent = watcheState.errors.error;
  }
  if (path === 'feeds') feedBox.append(renderFeed(watcheState.feeds));
  if (path === 'posts') postBox.append(renderPosts(watcheState.posts));
};
