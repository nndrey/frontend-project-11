import uniqueId from 'lodash/uniqueId.js';

export default (data) => {
  const { feedRss, postsRss } = data;
  const { feedTitle, feedDescription } = feedRss;
  const idForFeed = uniqueId();
  const feed = { id: idForFeed, title: feedTitle, description: feedDescription };

  const posts = postsRss.map((post) => {
    const { title, link, description } = post;
    const idForPost = uniqueId();
    return {
      id: idForPost, idFeed: idForFeed, title, link, description,
    };
  });
  return { feed, posts };
};
