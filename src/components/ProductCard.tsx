// components/ProductCard.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CamisetaConPrecio } from '@/app/page';

interface ProductCardProps {
    camiseta: CamisetaConPrecio;
}

export default function ProductCard({ camiseta }: ProductCardProps) {
    // Lógica simple para el slider (puede ser más complejo)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const moverSlider = (direction: 'next' | 'prev') => {
        const totalImages = camiseta.imagenes.length;
        if (direction === 'next') {
            setCurrentImageIndex(prev => (prev + 1) % totalImages);
        } else {
            setCurrentImageIndex(prev => (prev - 1 + totalImages) % totalImages);
        }
    };

    return (
        <div className="camiseta-card">
            {/* Usamos Link de Next.js para navegación rápida */}
            <Link href={`/products/${camiseta.slug}`}>
                <div className="slider-container">
                    <div className="slider-images" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                        {camiseta.imagenes.map((src, index) => (
                            <Image 
                                key={index}
                                src={src} 
                                alt={`${camiseta.nombre} ${index + 1}`} 
                                width={300} 
                                height={300}
                                className="slider-image-item" // Añade estilos de ancho completo aquí
                            />
                        ))}
                    </div>
                    
                    <button 
                        className="slider-btn prev" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); moverSlider('prev'); }}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button 
                        className="slider-btn next" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); moverSlider('next'); }}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="camiseta-info">
                    <h3>{camiseta.nombre}</h3>
                    <p>{camiseta.club} | Versión: {camiseta.version}</p>
                    <p className="price-tag">${camiseta.precio}</p>
                    <div className="btn-comprar">
                        <i className="fab fa-whatsapp"></i> Consultar
                    </div>
                </div>
            </Link>
        </div>
    );
}