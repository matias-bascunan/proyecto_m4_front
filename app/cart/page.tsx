"use client"
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { createOrder } from '../../services/orders.services'

function CartPage() {

  const [open, setOpen] = useState(true)
const {
   cartItems,
    removeFromCart,
    getTotal,
    clearCart,
    getIdItems

} = useCart();

const handleCheckout = async () => {
  if (!dataUser?.token){
    alert("Error en la sesion");
    return;
  }
  try {
    await createOrder (getIdItems (), dataUser.token );
    clearCart();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(message)
    
  }
};
const items = Array.isArray(cartItems) ? cartItems : [];
const {dataUser} = useAuth();

    return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {items.length === 0 ? (
                            <li className="py-6 text-gray-600">Tu carrito está vacío</li>
                          ) : (
                            items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img alt={item.name} src={item.image} className="size-full object-cover" />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={`/product/${item.id}`}>{item.name}</a>
                                      </h3>
                                      <p className="ml-4">${Number(item.price).toLocaleString()}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-end text-sm">
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      className="font-medium text-red-600 rounded-md px-2 py-1  hover:bg-red-600 hover:text-white  transition-colors duration-200"
                                    >
                                      Quitar
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${Number(getTotal()).toLocaleString()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        onClick={clearCart}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Vaciar Carrito
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <div>
                        or{' '}
                        <button
                          type="button"
                          onClick={!dataUser ? getLogin : handleCheckout}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {!dataUser ? 'Inicia sesión para continuar' : 'Proceder al pago'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default CartPage

const getLogin = () => {
  window.location.href = '/auth/login';
};
