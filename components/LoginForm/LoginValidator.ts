import * as Yup from 'yup';
export interface LoginFormValuesInterface {
    email: string;
    password: string;
}

export const initialLoginFormValues: LoginFormValuesInterface = {
    email: '',
    password: '',
};

export const LoginFormValidationSchema = Yup.object({
    email: Yup.string().email('El email es invalido').required('Este campo es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 digitos').required('Este campo es obligatorio'),
});
