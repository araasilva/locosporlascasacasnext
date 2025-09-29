// components/ProductDetail.tsx
'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { CamisetaData } from '@/libs/types'; // Importamos tipos

// Tipamos los props que recibe este componente
interface ProductDetailProps {
    camiseta: CamisetaData;
    precio: string; // El precio con formato "56.000"
}

export default function ProductDetail({ camiseta, precio }: ProductDetailProps) {
    // El hook useCart ya devuelve tipos correctos
    const { addItem } = useCart();
    
    const [mainImage, setMainImage] = useState<string>(camiseta.imagenes[0]);
    const [selectedTalle, setSelectedTalle] = useState<string>('S');
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        // La limpieza del precio es crucial para la propiedad precioUnitario (number)
        const precioLimpio = parseFloat(precio.replace('.', '').replace(',', '').trim());

        // El objeto a agregar usa el tipo Omit<CartItem, 'id'>
        const itemToAdd = {
            nombre: camiseta.nombre,
            talle: selectedTalle,
            cantidad: quantity,
            precioUnitario: precioLimpio || 0,
            linkWhatsApp: camiseta.link,
            imagen: camiseta.imagenes[0]
        };

        addItem(itemToAdd); 
        alert(`¡Agregada ${quantity} unidad(es) de ${camiseta.nombre} (${selectedTalle}) al carrito!`);
    };

    return (
        // ... (El resto de tu código JSX es similar, asegurándote de usar 'className' y no 'class') ...
        <button className="add-to-cart-btn" id="add-to-cart-btn" onClick={handleAddToCart}>
            AGREGAR AL CARRITO
        </button>
    );
}