import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'errors.empty',
  },
  string: {
    url: 'errors.format.url',
  },
})

const schema = yup.object({
  url: yup.string()
    .url()
    .required(),
})

export default (url, state) => {
  const { feeds } = state.data

  return schema.validate({ url })
    .then(() => {
      if (feeds.includes(url)) {
        throw new Error('errors.duplicate')
      }
      return []
    })
    .catch((e) => { throw e })
}
