import * as yup from 'yup';

export const getMessageSchema = yup.object({
  page: yup.number().min(1, 'Page must be at least 1').default(1),
  limit: yup.number().min(5, 'Limit must be at least 5').default(5),
});

export const createMessageSchema = yup.object({
  title: yup
    .string()
    .max(30, 'Title is too long!!')
    .required('Title is required'),
  message: yup.string().required(),
});

export const editMessageSchema = yup.object({
  messageId: yup.string().required('Message id is required'),
  title: yup.string().max(30, 'Title is too long!!'),
  message: yup.string(),
});

export const deleteMessageSchema=yup.object({
  messageId: yup.string().required('Message id is required'),
})

export const sendMessageSchema=yup.object({
    messageId: yup.string().required('Message id is required'),
    title: yup.string().max(30, 'Title is too long!!'),
    message: yup.string(),
})
