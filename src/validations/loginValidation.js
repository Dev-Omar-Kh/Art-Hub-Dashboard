import * as Yup from 'yup';

export const LoginValidationSchema = (t) => (
    Yup.object({

        email: Yup.string()
            .required(t('emailRequiredError'))
            .email(t('emailInvalidError')),

        password: Yup.string()
            .min(6, t('passwordMinError'))
            .required(t('passwordRequiredError')),

    })
);