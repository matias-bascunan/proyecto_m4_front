"use client";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import OrderList from "../../components/orderList";

const BG_IMAGE = "https://stuff.fendergarage.com/images/t/s/l/fender-com-fender-connect-image-desktop@2x_051922.jpg";

function DashboardPage() {
  const { dataUser } = useAuth();

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div
        className="hidden md:block w-1/2 bg-cover bg-right"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
        aria-hidden
      />

      {/* Right content */}
      <div className="flex w-full md:w-1/2 items-start justify-center p-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold">Tu perfil</h1>
              <p className="text-muted mt-1">Información de cuenta y pedidos</p>
            </div>
          </div>

          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-soft p-4 rounded">
              <h3 className="text-sm font-medium text-gray-700">Nombre</h3>
              <p className="mt-1 text-gray-900">{dataUser ? dataUser.user.name : 'Cargando...'}</p>
            </div>

            <div className="bg-soft p-4 rounded">
              <h3 className="text-sm font-medium text-gray-700">Email</h3>
              <p className="mt-1 text-gray-900">{dataUser ? dataUser.user.email : ''}</p>
            </div>

            <div className="bg-soft p-4 rounded">
              <h3 className="text-sm font-medium text-gray-700">Dirección</h3>
              <p className="mt-1 text-gray-900">{dataUser ? dataUser.user.address : ''}</p>
            </div>

            <div className="bg-soft p-4 rounded">
              <h3 className="text-sm font-medium text-gray-700">Teléfono</h3>
              <p className="mt-1 text-gray-900">{dataUser ? dataUser.user.phone : ''}</p>
            </div>
          </section>

          <section>
            <h2 className="text-30px font-semibold mb-4">Aquí podrás ver tus pedidos</h2>
            <OrderList/>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;