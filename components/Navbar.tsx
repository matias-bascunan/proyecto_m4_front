'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { navItems } from '../helpers/navItems';
import Image from 'next/image';
import logo from "../assets/logo.png";


export default function Navbar() {
  const {dataUser, logout} = useAuth();
      const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-white hoover:shadow-lg">
        <section className="w-20"><Image src={ logo } alt="Logo" width={80} height={80} /></section>
        <section className="text-xl bold">Guitar Store</section>
        <section>
            <nav className="flex justify-between gap-x-10 items-center px-10 py-5 text-white">
                {navItems.map((navigationItem) => {return(
                    <Link key={navigationItem.id} href={navigationItem.route} className=" hover:text-yellow-400 transition-colors duration-200">{navigationItem.nameToRender}</Link>
                );
                })}
               { dataUser ? <span className="ml-4"> Hola {dataUser.user.name}</span> : <Link href="/auth/login" className="ml-4 hover:text-yellow-400 transition-colors duration-200">Iniciar Sesión</Link>}
                {dataUser && <button onClick={logout} className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-800 transition-colors duration-200"><Link href="/auth/logout">Cerrar sesión</Link></button>}

            </nav>
        </section>
        </div>


    </div>
  )
}

