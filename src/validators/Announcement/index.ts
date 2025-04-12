import * as yup from 'yup';

export const getAnnouncementSchema = yup.object({
  page: yup.number().min(1, 'Page must be at least 1').default(1),
  limit: yup.number().min(5, 'Limit must be at least 5').default(5),
});

export const createAnnouncementSchema = yup.object({
  title: yup
    .string()
    .max(30, 'Title is too long')
    .min(5, 'Title is too short')
    .required('Title is required'),
  subTitle: yup
    .string()
    .max(250, 'Sub title is too long')
    .min(10, 'Sub title is too short')
    .required('Sub title is required'),
  startDate: yup.number().required('Start date is required'),
  endDate: yup.number().required('End time is require'),
});

export const editAnnouncementSchema = yup.object({
  announcementId: yup.string().required('Announcement id is required'),
  title: yup.string().max(30, 'Title is too long').min(5, 'Title is too short'),
  subTitle: yup
    .string()
    .max(250, 'Sub title is too long')
    .min(10, 'Sub title is too short'),
  startDate: yup.number(),
  endDate: yup.number(),
});

export const deleteAnnouncementSchema = yup.object({
  announcementId: yup.string().required('Announcement id is required'),
});
