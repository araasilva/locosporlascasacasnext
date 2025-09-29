// app/products/[slug]/page.tsx
import ProductDetail from '@/components/ProductDetail'; 
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { CamisetaData, PrecioData } from '@/libs/types'; // Importamos interfaces

// Definimos la estructura de los datos cargados
interface LoadedData {
    camisetas: CamisetaData[];
    precios: PrecioData[];
}

// Función de utilidad tipada
async function loadData(): Promise<LoadedData> {
    const dataDir = path.join(process.cwd(), 'data');
    const [camisetasFile, preciosFile] = await Promise.all([
        fs.readFile(path.join(dataDir, 'camisetas.json'), 'utf-8'),
        fs.readFile(path.join(dataDir, 'precios.json'), 'utf-8')
    ]);
    return {
        // Aseguramos que los JSON se parseen al tipo correcto
        camisetas: JSON.parse(camisetasFile) as CamisetaData[],
        precios: JSON.parse(preciosFile) as PrecioData[]
    };
}

// Definimos los Props del Componente (parámetros de la URL)
interface ProductPageProps {
    params: {
        slug: string;
    }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { slug } = params;
    const { camisetas, precios } = await loadData();

    const camiseta = camisetas.find(c => c.slug === slug); 

    if (!camiseta) {
        return notFound();
    }

    // Obtener el precio, tipado con PrecioData
    const versionNormalizada = camiseta.version.toLowerCase();
    const precioObj = precios.find(p => p.version.toLowerCase() === versionNormalizada);
    
    // Si no se encuentra, usamos un string por defecto, si no, usamos el precio del JSON
    const precio = precioObj ? precioObj.precio : 'PRECIO NO DISPONIBLE';
    
    return (
        <main className="container detalle-page-main">
            {/* Pasamos los tipos correctos como props */}
            <ProductDetail camiseta={camiseta} precio={precio} />
        </main>
    );
}

// generateStaticParams también puede ser tipado
export async function generateStaticParams() {
    // ... (Tu lógica de generateStaticParams) ...
    return []; // Retorna un array de objetos { slug: string }
}