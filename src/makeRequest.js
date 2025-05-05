import axios from 'axios';
import parserDom from './parserRss.js';
import createFeedAndPost from './createFeedAndPost.js';

export default (link) => axios.get(link)
  .then((response) => {
    const dataRss = response.data.contents;
    const dataFeedAndPosts = parserDom(dataRss);
    const newFeedAndPosts = createFeedAndPost(dataFeedAndPosts, link);
    return newFeedAndPosts;
  })
  .catch((error) => {
    throw error;
  });
