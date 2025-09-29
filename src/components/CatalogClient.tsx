// components/CatalogClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CamisetaConPrecio } from '@/app/page';
import ProductCard from '@/components/ProductCard'; 
import Link from 'next/link';

interface CatalogClientProps {
    initialCamisetas: CamisetaConPrecio[];
}

export default function CatalogClient({ initialCamisetas }: CatalogClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Filtra y busca las camisetas usando useMemo para optimización
    const filteredCamisetas = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return initialCamisetas.filter(camiseta => {
            const matchesSearch = 
                camiseta.nombre.toLowerCase().includes(term) || 
                camiseta.club.toLowerCase().includes(term);

            const matchesFilter = (
                activeFilter === 'all' ||
                camiseta.version === activeFilter ||
                (activeFilter === 'Retro' && camiseta.version === 'Retro') ||
                (activeFilter === 'Player' && camiseta.version.includes('Player')) // Ajusta esta lógica si tienes más versiones
            );
            return matchesSearch && matchesFilter;
        });
    }, [initialCamisetas, searchTerm, activeFilter]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };

    return (
        <>
            {/* Los botones de filtro deben ser Client Components para manejar el click */}
            <nav className="header-nav-filters">
                <div className="filter-navbar container">
                    {['all', 'Retro', 'Player 25/26', 'Disponibles'].map(filter => (
                        <button
                            key={filter}
                            className={`filter-btn ${activeFilter === filter || (filter === 'Player 25/26' && activeFilter === 'Player') ? 'active' : ''}`}
                            onClick={() => handleFilterClick(filter.split(' ')[0])} // Usamos solo la primera palabra para Player/Retro
                            data-filter={filter}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </nav>

            <section id="catalogo" className="catalogo-grid">
                {filteredCamisetas.length === 0 ? (
                    <p className="no-results">No se encontraron camisetas que coincidan con la búsqueda. 😔</p>
                ) : (
                    filteredCamisetas.map((camiseta) => (
                        <ProductCard key={camiseta.slug} camiseta={camiseta} />
                    ))
                )}
            </section>
        </>
    );
}