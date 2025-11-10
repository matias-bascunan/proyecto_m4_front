import React from "react";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import Image from "next/image";
import Registerfuture from "../../../assets/Registerfuture.png"
const BG_IMAGE = "https://www.sopitas.com/wp-content/uploads/2025/06/guitarra-volver-al-futuro-marty.mcfly-2.png";

function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
        aria-hidden
      />

      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10">
          <div className="flex flex-col items-center mb-6">
            <div><Image src= {Registerfuture} alt= "Registro"/></div>
            <h1 className="text-2xl font-extrabold">Create your account</h1>
          </div>

          <RegisterForm />

          <div className="mt-6">
            <div className="h-px bg-gray-200" />
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-3 rounded-lg border border-gray-200 bg-white">G</button>
              <button className="flex-1 py-3 rounded-lg border border-gray-200 bg-white">f</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;