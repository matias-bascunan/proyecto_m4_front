"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Order } from '../interfaces/orders.interface'
import { useAuth } from '../context/AuthContext';
import { getAllOrders } from '../services/orders.services';

function OrderList() {
    const {dataUser} =useAuth();
    const [orders, setOrders] = useState<Order[]> ([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] =useState<string | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    useEffect(()=> {

    const fetchOrders = async () => {
        if(!dataUser?.token){
            setOrders([]);
            return
        }
        setIsLoading (true);
        setError(null);
        try {
            const ordersResponse = await getAllOrders(dataUser?.token);
            setOrders(ordersResponse);
        } catch (error: unknown) {
            console.error ("Este es el error", error)
        setError('Hubo un error');
        setOrders([]);
        }
        finally{
        setIsLoading(false);
        }
    };
    fetchOrders();
    },[dataUser?.token]);
  return (
    <div>
        <h2>Tus ordenes</h2>
        {error && (
            <div>
                <p>{error}</p>
                <button onClick={()=> window.location.reload()}>Reintentar</button>
            </div>
        )}
        {isLoading ? (
<div>
    <p>Cargando nuestras ordenes...</p>
</div>
        ) : orders && orders.length > 0 ? (
            <div className= " overflow-x-auto">
                <table className= "w-full text-sm text-left">
                    <thead className= "bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Productos</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Fecha</th>
                        </tr>
                    </thead>
                                        <tbody className="divide-y divide-gray-200">
                                                {orders.map((order)=>(
                                                        <React.Fragment key={order.id}>
                                                            <tr
                                                                className="hover:bg-gray-50 cursor-pointer"
                                                                onClick={() => setExpandedOrderId(prev => prev === order.id ? null : order.id)}
                                                                aria-expanded={expandedOrderId === order.id}
                                                            >
                                                                <td className="px-4 py-3">{order.id}</td>
                                                                <td className="px-4 py-3">
                                                                        {order.products && order.products.length > 0 ? (
                                                                                (() => {
                                                                                        const map = new Map<number, {productName: string; qty: number; price: number; image?: string}>();
                                                                                        order.products.forEach(p => {
                                                                                                const id = p.id || 0;
                                                                                                const prev = map.get(id);
                                                                                                if (prev) prev.qty += 1;
                                                                                                else map.set(id, { productName: p.name, qty: 1, price: p.price, image: p.image });
                                                                                        });
                                                                                        const parts: string[] = [];
                                                                                        map.forEach((v) => parts.push(`${v.qty}× ${v.productName}`));
                                                                                        return parts.join(', ');
                                                                                })()
                                                                        ) : (
                                                                                '0 productos'
                                                                        )}
                                                                </td>
                                                                <td  className="px-4 py-3">
                                                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{order.status || "procesada"}</span>
                                                                </td>
                                                                <td className="px-4 py-3">{new Date(order.date || Date.now()).toLocaleDateString()}</td>
                                                            </tr>

                                                            {expandedOrderId === order.id && (
                                                                <tr className="bg-white">
                                                                    <td colSpan={4} className="px-4 py-3">
                                                                        <div className="space-y-2">
                                                                            {(() => {
                                                                                const map = new Map<number, {productName: string; qty: number; price: number; image?: string}>();
                                                                                order.products.forEach(p => {
                                                                                        const id = p.id || Math.random();
                                                                                        const prev = map.get(id);
                                                                                        if (prev) prev.qty += 1;
                                                                                        else map.set(id, { productName: p.name, qty: 1, price: p.price, image: p.image });
                                                                                });
                                                                                const entries = Array.from(map.entries());
                                                                                const total = entries.reduce((sum, [, v]) => sum + v.qty * (v.price || 0), 0);
                                                                                return (
                                                                                    <div>
                                                                                        <ul className="divide-y divide-gray-100">
                                                                                            {entries.map(([id, v]) => (
                                                                                                <li key={id} className="flex items-center gap-4 py-2">
                                                                                                        <div className="w-12 h-12 shrink-0 overflow-hidden rounded-md bg-gray-50">
                                                                                                            {v.image ? (
                                                                                                               <Image
                                                                                                                   src={(v.image && (v.image as string).startsWith('http')) ? (v.image as string) : `${process.env.NEXT_PUBLIC_API_URL}${v.image ?? ''}`}
                                                                                                                   alt={v.productName}
                                                                                                                   width={80}
                                                                                                                   height={80}
                                                                                                                   className="w-full h-full object-cover"
                                                                                                               />
                                                                                                            ) : (
                                                                                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No image</div>
                                                                                                            )}
                                                                                                        </div>
                                                                                                        <div className="flex-1">
                                                                                                            <div className="text-sm font-medium text-gray-900">{v.productName}</div>
                                                                                                            <div className="text-xs text-gray-500">Precio unitario: ${Number(v.price).toLocaleString()}</div>
                                                                                                        </div>
                                                                                                        <div className="text-sm text-gray-700">{v.qty} ×</div>
                                                                                                        <div className="text-sm font-medium">${(v.qty * (v.price || 0)).toLocaleString()}</div>
                                                                                                    </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                        <div className="mt-3 text-right text-sm font-semibold">Total: ${Number(total).toLocaleString()}</div>
                                                                                    </div>
                                                                                );
                                                                            })()}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </React.Fragment>
                                                ))}
                                        </tbody>
                </table>
            </div>
        ) : (
            <div>
                <p>No tienes ordenes todavía</p>
            </div>
        )
        }
    </div>
  );
}

export default OrderList;
