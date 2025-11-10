"use client";
import React from "react";
import { useFormik } from "formik";
import { registerFormValidationSchema, registerInitialValues, RegisterFormValuesInterface } from "./RegisterValidator";
import { registerUser } from "../../services/user.services";
import { useRouter } from "next/navigation";

function RegisterForm() {
    const router = useRouter();
    const formik = useFormik<RegisterFormValuesInterface>({
        initialValues: registerInitialValues,
        validationSchema: registerFormValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await registerUser(values);
            console.log(response);
            resetForm();
            router.push("/auth/login");
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
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
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
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && <p className="text-sm text-red-600">{formik.errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Validar contraseña
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmPassword && <p className="text-sm text-red-600">{formik.errors.confirmPassword}</p>}
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && <p className="text-sm text-red-600">{formik.errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Direccion
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="text"
                        id="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.address && <p className="text-sm text-red-600">{formik.errors.address}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefono
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="text"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-amber-400 text-white font-semibold hover:bg-red-600 transition"
                    >
                        Registrate
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;