"use client";
import React from "react";
import { useFormik } from "formik";
import { LoginFormValuesInterface, initialLoginFormValues, LoginFormValidationSchema } from "./LoginValidator";
import { loginUser } from "../../services/user.services";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

function LoginForm() {
    const { setDataUser } = useAuth();
    const router = useRouter();
    const formik = useFormik<LoginFormValuesInterface>({
        initialValues: initialLoginFormValues,
        validationSchema: LoginFormValidationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                setSubmitting(true);
                const response = await loginUser(values);
                // asumir que response es la sesión/usuario
                setDataUser(response);
                resetForm();
                router.push("/dashboard");
            } catch (err: unknown) {
                console.error("loginUser error", err);
                // podríamos mostrar un mensaje al usuario aquí
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        id="email"
                        name="email"
                    />
                    {formik.errors.email && <p className="text-sm text-red-600">{formik.errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        id="password"
                        name="password"
                    />
                    {formik.errors.password && <p className="text-sm text-red-600">{formik.errors.password}</p>}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full py-3 rounded-full bg-amber-400 text-white font-semibold hover:bg-red-600 transition"
                    >
                        {formik.isSubmitting ? "Iniciando sesión.." : "Iniciar sesión"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
