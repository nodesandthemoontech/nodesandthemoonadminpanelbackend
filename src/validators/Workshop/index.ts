import * as yup from 'yup';

export const getAllWorkshopSchema = yup.object({
  page: yup.number().min(1, 'Page must be at least 1').default(1),
  limit: yup.number().min(5, 'Limit must be at least 5').default(5),
});

export const createWorkshopSchema = yup.object({
  title: yup
    .string()
    .max(30, 'Title is too long!!')
    .required('Title is required'),
  instruction: yup
    .string()
    .max(350, 'Instruction is too long!!')
    .required('Instruction is required'),
  address: yup
    .string()
    .max(100, 'Address is too long!')
    .when('mode', {
      is: 'Offline',
      then: (schema) => schema.required('Address is required for Offline mode'),
      otherwise: (schema) => schema.notRequired(),
    }),
  mode: yup
    .string()
    .oneOf(['Online', 'Offline'], 'Invalid mode')
    .required('Mode is required'),
  posterImage: yup
    .mixed()
    .test('fileRequired', 'Poster Image is required', (value) => !!value)
    .test(
      'fileType',
      'Only images are allowed (jpg, png, jpeg)',
      (value: any) => {
        if (!value || !value.mimetype) return false;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(
          value.mimetype
        );
      }
    ),

  date: yup.date().required('Date is required'),

  time: yup.date().required('Time is required'),
});

export const editWorkshopSchema = yup.object({
  workshopId: yup.string().required('Workshop id is required'),
  title: yup.string().max(30, 'Title is too long!!'),
  instruction: yup.string().max(350, 'Instruction is too long!!'),
  address: yup
    .string()
    .max(100, 'Address is too long!')
    .when('mode', {
      is: 'Offline',
      then: (schema) => schema.required('Address is required for Offline mode'),
      otherwise: (schema) => schema.notRequired(),
    }),
  mode: yup.string().oneOf(['Online', 'Offline'], 'Invalid mode'),
  posterImage: yup
    .mixed()
    .test('fileRequired', 'Poster Image is required', (value) => !!value)
    .test(
      'fileType',
      'Only images are allowed (jpg, png, jpeg)',
      (value: any) => {
        if (!value || !value.mimetype) return false;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(
          value.mimetype
        );
      }
    ),

  date: yup.date(),

  time: yup.date(),
});

export const deleteWorkshopSchema = yup.object({
  workshopId: yup.string().required('Workshop id is required'),
});
