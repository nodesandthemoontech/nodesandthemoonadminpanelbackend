import * as yup from 'yup';

export const createFeedbackSchema = yup.object({
  name: yup.string().max(30, 'Name is too long!!').required('Name is required'),
  ratings: yup.number().max(5, 'Max upto 5').required('Rating is required'),
  feedback: yup.string().max(250, 'Feedback is too long!!'),
  suggestion: yup.string().max(250, 'Suggestion is too long!!'),
  email: yup.string().email().required('Mail is required'),
});

export const getAllFeedbackSchema = yup.object({
  page: yup.number().min(1, 'Page must be at least 1').default(1),
  limit: yup.number().min(5, 'Limit must be at least 5').default(5),
});

export const editFeedbackSchema = yup.object({
  email: yup.string().email().required('Mail is required'),
  status: yup
    .string()
    .oneOf(['Pending', 'Accepted', 'Rejected'], 'Status is not correct')
    .required(),
});
