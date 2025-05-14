import * as yup from 'yup'

export default (url, collUrl) => {
  const schema = yup.string()
    .url()
    .notOneOf(collUrl)
  return schema.validate(url)
}

yup.setLocale({
  mixed: {
    notOneOf: () => ({ key: 'errors.unique_Rss' }),
  },
  string: {
    url: () => ({ key: 'errors.valid_Url' }),
  },
})
