import * as Yup from 'yup';

export const LoginValidationSchema = (t) => (

    Yup.object({

        email: Yup.string()
            .required(t('emailRequiredError'))
            .email(t('emailInvalidError')),

        password: Yup.string()
            .required(t('passwordRequiredError'))
            .min(8, t('passwordMinError'))
            .test('has-lowercase', t('passwordLowercaseError'), value =>
                /[a-z]/.test(value || '')
            )
            .test('has-uppercase', t('passwordUppercaseError'), value =>
                /[A-Z]/.test(value || '')
            )
            .test('has-number', t('passwordNumberError'), value =>
                /\d/.test(value || '')
            )
            .test('has-special-char', t('passwordSpecialCharError'), value =>
                /[\W_]/.test(value || '')
            ),

    })

);
