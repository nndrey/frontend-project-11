export default (funcRequest, feeds, stateObject) => {
  const postsFromState = stateObject.posts
  return Promise.all(feeds.map(({ linkForFeed, id }) => funcRequest(linkForFeed)
    .then((data) => {
      const { posts } = data
      const postsForCurrentFeedFromState = postsFromState.filter(({ idFeed }) => (idFeed === id))
      const linksCurrentPosts = postsForCurrentFeedFromState.map(({ link }) => link)
      const newPosts = posts.filter(({ link }) => (!linksCurrentPosts.includes(link)))
      if (newPosts.length > 0) {
        return newPosts.map(post => ({ ...post, idFeed: id }))
      }
      return []
    })
    .catch(() => {
      console.error(`Error when processing feed with ID: ${id}`)
      return []
    })))
    .then(results => results.flat())
}
