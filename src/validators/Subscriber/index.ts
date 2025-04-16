import * as yup from 'yup';

export const getAllSubscriberSchema = yup.object({
  page: yup.number().min(1, 'Page must be at least 1').default(1),
  limit: yup.number().min(5, 'Limit must be at least 5').default(5),
});

export const createSubscriberSchema=yup.object({
    email:yup.string().email("Please enter valid email").required("Email is required")
})

export const editSubscriberSchema=yup.object({
    email:yup.string().email("Please enter valid email").required("Email is required"),
    newsLetter:yup.boolean(),
    workshop:yup.boolean(),
    courses:yup.boolean()
})

export const deleteSubscriberSchema=yup.object({
    email:yup.string().email("Please enter valid email").required("Email is required")
})