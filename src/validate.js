import * as yup from 'yup'

const schema = yup.object(({
  url: yup.string()
    .url('Ссылка должна быть валидным URL')
    .required('Не должно быть пустым'),
}))

export default (url, state) => {
  const { feeds } = state.data
  const normalizedUrl = url.trim()
  return schema.validate({ url: normalizedUrl })
    .then(() => {
      if (feeds.includes(normalizedUrl)) {
        throw new Error('RSS уже существует')
      }
      return []
    })
    .catch((e) => {
      throw e
    })
}
