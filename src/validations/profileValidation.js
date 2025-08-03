import * as Yup from 'yup';

export const profileValidation = (t) => (

    Yup.object({

        profileImage: Yup.mixed().nullable(),

        displayName: Yup.string()
            .min(3, t('nameMinError'))
            .max(100, t('nameMaxError'))
            .required(t('nameRequiredError')),

        email: Yup.string()
            .email(t('emailInvalidError'))
            .required(t('emailRequiredError')),

        currentPassword: Yup.string()
            .nullable(),

        newPassword: Yup.string()
            .when('currentPassword', {
                is: (val) => val && val.length > 0,
                then: (schema) => schema
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
                otherwise: (schema) => schema.nullable(),
            }),

        confirmNewPassword: Yup.string()
            .when('newPassword', {
                is: (val) => val && val.length > 0,
                then: (schema) =>
                    schema
                        .oneOf([Yup.ref('newPassword')], t('confirmPasswordMatchError'))
                        .required(t('confirmPasswordRequiredError')),
                otherwise: (schema) => schema.nullable(),
            }),

    })

);
