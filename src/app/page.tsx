// app/page.tsx
import Header from '@/components/Header';
import CatalogClient from '@/components/CatalogClient'; // Componente de cliente para manejar filtros/búsqueda
import fs from 'fs/promises';
import path from 'path';
import { CamisetaData, PrecioData } from '@/libs/types'; // Importar tipos

// Definimos la estructura del objeto de datos cargado
interface LoadedData {
    camisetas: CamisetaData[];
    precios: PrecioData[];
}

// Función de utilidad para cargar datos JSON del servidor
async function loadData(): Promise<LoadedData> {
    const dataDir = path.join(process.cwd(), 'data');
    
    // Lectura de archivos en paralelo para optimización
    const [camisetasFile, preciosFile] = await Promise.all([
        fs.readFile(path.join(dataDir, 'camisetas.json'), 'utf-8'),
        fs.readFile(path.join(dataDir, 'precios.json'), 'utf-8')
    ]);
    
    return {
        // Asignamos el tipo al parsear
        camisetas: JSON.parse(camisetasFile) as CamisetaData[],
        precios: JSON.parse(preciosFile) as PrecioData[]
    };
}

// Interfaz para la camiseta con el precio ya integrado
export interface CamisetaConPrecio extends CamisetaData {
    precio: string;
}

export default async function HomePage() {
    const { camisetas, precios } = await loadData();

    // 1. Mapear y añadir el precio a cada camiseta
    const camisetasConPrecio: CamisetaConPrecio[] = camisetas.map(camiseta => {
        const versionNormalizada = camiseta.version.toLowerCase();
        
        // Busca el objeto de precio que coincida con la versión
        const precioObj = precios.find(p => p.version.toLowerCase() === versionNormalizada);
        
        const precioAsignado = precioObj ? precioObj.precio : 'PRECIO NO DISPONIBLE';

        return {
            ...camiseta,
            precio: precioAsignado
        };
    });


    // 2. Renderizar el componente principal (Header y Main)
    return (
        <>
            {/* El Header es un Client Component ya que usa el contexto del carrito */}
            <Header /> 

            <main className="container">
                {/* CatalogClient es un componente de cliente que recibe las camisetas ya con precio */}
                <CatalogClient initialCamisetas={camisetasConPrecio} />
            </main>

            <a href="https://wa.me/5493813011532" className="whatsapp-btn" target="_blank">
                <i className="fab fa-whatsapp"></i>
            </a>
        </>
    );
}

// Nota: Si usas la convención de la carpeta 'app', no necesitas exportar 'getStaticProps' o 'getServerSideProps'.
// Next.js automáticamente trata los componentes asíncronos en 'app' como Server Components.
