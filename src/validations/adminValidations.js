import * as Yup from 'yup';

export const adminValidation = (t, isEditMode = false) => (
    Yup.object({
        displayName: Yup.string()
            .min(3, t('nameMinError'))
            .max(100, t('nameMaxError'))
            .required(t('nameRequiredError')),

        email: Yup.string()
            .email(t('emailInvalidError'))
            .required(t('emailRequiredError')),

        password: isEditMode 
            ? Yup.string().min(8, t('passwordMinError')).nullable()
            : Yup.string()
                .min(8, t('passwordMinError'))
                .required(t('passwordRequiredError')),

        confirmPassword: isEditMode
            ? Yup.string()
                .test('passwords-match', t('confirmPasswordMatchError'), function(value) {
                    const { password } = this.parent;
                    if (password && password.length > 0) {
                        return value === password;
                    }
                    return true;
                })
                .nullable()
            : Yup.string()
                .oneOf([Yup.ref('password'), null], t('confirmPasswordMatchError'))
                .required(t('confirmPasswordRequiredError')),

        role: Yup.object()
            .shape({
                label: Yup.string().required(),
                value: Yup.string().required()
            })
            .nullable()
            .required(t('roleRequiredError')),

        profileImage: isEditMode
            ? Yup.mixed().nullable()
            : Yup.mixed()
                .test('fileRequired', t('imageRequiredError'), (value) => {
                    return value && value instanceof File;
                }),
    })
);

export const addAdminValidation = (t) => adminValidation(t, false);
export const editAdminValidation = (t) => adminValidation(t, true);