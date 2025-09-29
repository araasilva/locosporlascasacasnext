// types.ts

// Interfaz para los precios de precios.json
export interface PrecioData {
    version: 'retro' | 'player' | string; // Asegura que solo sean estos valores si es posible
    precio: string; // Se mantiene como string por el formato "56.000"
}

// Interfaz para un objeto de Camiseta de camisetas.json
export interface CamisetaData {
    nombre: string;
    club: string;
    version: 'Retro' | 'Player' | string; // Debe coincidir con PrecioData.version
    link: string; // Link de WhatsApp de consulta individual
    imagenes: string[];
    slug: string; // Necesario para las rutas de Next.js
}

// Interfaz para un ítem dentro del carrito (almacenado en localStorage)
export interface CartItem {
    id: string; // 'Nombre-Talle'
    nombre: string;
    talle: 'S' | 'M' | 'L' | 'XL' | string;
    cantidad: number;
    precioUnitario: number; // Limpio, solo el número para cálculos
    linkWhatsApp: string;
    imagen: string;
}

// Interfaz para el contexto del carrito
export interface CartContextType {
    cart: CartItem[];
    totalItems: number;
    addItem: (item: Omit<CartItem, 'id'>) => void; // Omitimos 'id' ya que se genera internamente
    generateWhatsAppLink: () => string;
}