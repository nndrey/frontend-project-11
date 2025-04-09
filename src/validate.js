import * as yup from 'yup';

export default (url, collUrl) => {
  const schema = yup.string()
    .url('It is not correct URL')
    .notOneOf(collUrl, 'the URL is not unique!');
  return schema.validate(url);
};
