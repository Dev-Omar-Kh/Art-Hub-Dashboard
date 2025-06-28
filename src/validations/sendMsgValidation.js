import * as Yup from 'yup';

export const sendMsgValidation = (t) => (
    Yup.object({

        subject: Yup.string()
            .min(5, t('subjectMinError'))
            .max(150, t('subjectMaxError'))
            .required(t('subjectRequiredError')),

        message: Yup.string()
            .min(20, t('messageSendMinError'))
            .max(1000, t('messageSendMaxError'))
            .required(t('messageSendRequiredError')),

    })
);