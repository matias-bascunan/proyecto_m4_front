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
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 digitos')
        .max(12, 'La contraseña puede tener un maximo de 12 digitos')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/, 'Debe incluir mayuscula, minuscula y simbolo')
        .required('Este campo es obligatorio'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden').required('Este campo es obligatorio'),
    name: Yup.string()
    .min(6, 'El noombre debe tener al menos 6 caracteres')
    .max(10, 'El nombre puede tener un maximo de 10 caracteres')
    .required('Este campo es obligatorio'),
    address: Yup.string()
    .required('Este campo es obligatorio'),
    phone: Yup.string()
    .matches(/^\d+$/, 'Solo numeros')
    .max(12, 'El numero no puede ser superior a 12 digitos')
    .required('Este campo es obligatorio'),
});

