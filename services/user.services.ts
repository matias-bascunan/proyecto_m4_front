import { LoginFormValuesInterface } from "../components/LoginForm/LoginValidator";
import { RegisterFormValuesInterface } from "../components/RegisterForm/RegisterValidator";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
    userData: RegisterFormValuesInterface
): Promise<any> => {
    if (!APIURL) throw new Error("NEXT_PUBLIC_API_URL no está definida");

    try {
        const { confirmPassword, ...payload } = userData as any;

        const response = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        // parsear body aunque sea error para obtener mensaje útil
        const body = await response.json().catch(() => null);

        if (response.ok) {
            return body;
        } else {
            const msg = (body && (body.message || body.error)) || `Error al registrar el usuario (${response.status})`;
            throw new Error(String(msg));
        }

    } catch (error:any) {
        throw new Error(error);
    };
};

export const loginUser = async (userData:LoginFormValuesInterface):Promise<any> => {
      try {const response = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
});
 const body = await response.json().catch(() => null);

        if (response.ok) {
            return body;
        } else {
            const msg = (body && (body.message || body.error)) || `Error al loguear el usuario (${response.status})`;
            throw new Error(String(msg));
        }

    } catch (error:any) {
        throw new Error(error);
    };
};

