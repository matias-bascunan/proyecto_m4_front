"use client"
import React from "react";
import LoginForm from "../../../components/LoginForm/LoginForm";
import Image from 'next/image';
import Loginfuture from "../../../assets/Loginfuture.png"

const BG_IMAGE = "https://www.gibson.com/cdn/shop/files/gibson_bttf_hero_desktop.jpg";

function LoginPage() {
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
            <div><Image src={Loginfuture} alt="Login"/></div>
            <h1 className="text-2xl font-extrabold"></h1>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;