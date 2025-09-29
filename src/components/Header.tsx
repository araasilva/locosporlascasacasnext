// components/Header.js
'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
// Usar next/image para optimización
import Image from 'next/image'; 

export default function Header() {
    const { totalItems, generateWhatsAppLink } = useCart();
    
    const handleCartClick = (e) => {
        // Obtenemos el link de WhatsApp y lo abrimos
        const url = generateWhatsAppLink();
        if (url !== '#') {
            window.open(url, '_blank');
        }
    };

    return (
        <header>
            <div className="header-top-bar container">
                <div className="logo-container">
                    <Link href="/">
                        <Image src="/img/locos-por-las-casacas-logo.png" alt="Locos por las Casacas Logo" width={150} height={50} priority />
                    </Link>
                </div>

                <div className="search-bar">
                    {/* El buscador requeriría más lógica de estado para el filtrado */}
                    <input type="text" id="searchInput" placeholder="¿Qué camiseta buscas?" />
                    <button type="submit" className="search-icon-btn"><i className="fas fa-search"></i></button>
                </div>
            
                <div className="user-icons">
                    {/* Botón de Carrito (llama a la lógica de WhatsApp) */}
                    <a href="#" className="user-link cart-link" onClick={handleCartClick}>
                        <i className="fas fa-shopping-cart"></i> Mi carrito
                        <span className="cart-count">{totalItems}</span>
                    </a>
                </div>
            </div>
            {/* ... Navegación de filtros (omito la lógica por simplicidad) ... */}
            <nav className="header-nav-filters">
                {/* ... Botones de filtro ... */}
            </nav>
        </header>
    );
}