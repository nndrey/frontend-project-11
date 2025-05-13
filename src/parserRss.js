export default (dataRss) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(dataRss, 'application/xml');

  if (doc.querySelector('parsererror')) throw new Error('errors.parserRss');

  if (!doc.querySelector('rss') || !doc.querySelector('channel')) {
    throw new Error('errors.parserRss');
  }
  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;
  const items = doc.querySelectorAll('item');
  const feedRss = { feedTitle, feedDescription };

  const postsRss = Array.from(items).map((item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    return { title, link, description };
  });
  return { feedRss, postsRss };
};
