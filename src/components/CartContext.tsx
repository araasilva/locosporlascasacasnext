// components/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType } from '../libs/types'; // Importar tipos

// Inicializar con valores tipados
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Definimos el estado con el tipo CartItem[]
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('carrito');
            if (storedCart) {
                // Forzamos el parseo a nuestro tipo CartItem[]
                setCart(JSON.parse(storedCart) as CartItem[]); 
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('carrito', JSON.stringify(cart));
        }
    }, [cart]);

    // Tipamos el item que entra. Omit<CartItem, 'id'> significa que esperamos un CartItem sin el campo 'id'
    const addItem = (item: Omit<CartItem, 'id'>) => {
        setCart(prevCart => {
            const itemId = `${item.nombre}-${item.talle}`;
            const existingItemIndex = prevCart.findIndex(p => p.id === itemId);

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].cantidad += item.cantidad;
                return newCart;
            } else {
                // Aseguramos que el nuevo ítem tenga el tipo CartItem
                return [...prevCart, { ...item, id: itemId } as CartItem];
            }
        });
    };

    const generateWhatsAppLink = (): string => {
        // ... (Tu lógica de WhatsApp se mantiene, pero ahora 'cart' está tipado) ...
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de consultar.');
            return '#';
        }

        const numeroWhatsApp = '5493813011532'; 
        let mensaje = "¡Hola! Quisiera encargar las siguientes camisetas:\n\n";
        let totalPagar = 0;

        cart.forEach((item) => {
            // Sabemos que precioUnitario es un number gracias a TS
            const subtotal = item.cantidad * item.precioUnitario; 
            totalPagar += subtotal;
            
            const precioFormateado = item.precioUnitario.toLocaleString('es-AR', { minimumFractionDigits: 0 });
            
            mensaje += `1. *${item.nombre}* (${item.talle}) - ${item.cantidad} unidad(es) x $${precioFormateado}\n`;
        });

        const totalConFormato = totalPagar.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });

        mensaje += `\nPrecio Total Estimado: ${totalConFormato}\n\n`;
        mensaje += "Por favor, confírmame disponibilidad y pasos para finalizar la compra. ¡Gracias!";

        const mensajeCodificado = encodeURIComponent(mensaje);
        return `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    };

    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

    const contextValue: CartContextType = {
        cart,
        totalItems,
        addItem,
        generateWhatsAppLink
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};