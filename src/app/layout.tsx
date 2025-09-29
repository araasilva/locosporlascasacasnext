// app/layout.js
import { CartProvider } from '@/components/CartContext';
import './globals.css'; // Esto reemplaza a style.css, lo explicaremos después

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}