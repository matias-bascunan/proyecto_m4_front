import * as Yup from 'yup';
export interface RegisterFormValuesInterface {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    address: string;
    phone: string;
}

export const registerInitialValues: RegisterFormValuesInterface = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: '',
    phone: '',
};

export const registerFormValidationSchema = Yup.object({
    email: Yup.string().email('El email es invalido').required('Este campo es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 digitos').required('Este campo es obligatorio'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden').required('Este campo es obligatorio'),
    name: Yup.string().required('Este campo es obligatorio'),
    address: Yup.string().required('Este campo es obligatorio'),
    phone: Yup.string().required('Este campo es obligatorio'),
});
