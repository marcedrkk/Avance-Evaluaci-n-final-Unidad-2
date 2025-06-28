# Avance-Evaluaci-n-final-Unidad-2
Este repositorio contiene el avance de la Evaluación Final de la Unidad 2, en el que se logró implementar principalmente la estructura, aunque aún queda mucha implementación por realizar.

Este Pull Request establece la base del sistema web para VerdeVital, incluyendo una estructura modular en el frontend y la organización del backend siguiendo buenas prácticas de desarrollo. Aunque aún no se ha implementado la lógica funcional, el proyecto ya está preparado para escalar en funcionalidades como gestión de productos, autenticación, carrito de compras y notificaciones vía Telegram.

## Frontend:
- Se crearon las vistas separadas:
  - `index.html`: Página principal del sitio
  - `productos.html`: Catálogo con buscador
  - `contacto.html`: Formulario de contacto
  - `admin.html`: Panel de administración de productos
- Inclusión de modales comunes (login, carrito, éxito) aun no funcionales
- Organización de scripts y estilos en `assets/js` y `assets/css`

## Backend:
- Estructura base con carpetas:
  - `/controllers`: archivos para login, pedidos y productos
  - `/models`: modelos de datos (`Producto.js`, `Pedido.js`, `Usuario.js`)
  - `/routes`: para gestionar endpoints
  - `/utils/telegram.js`: preparado para integración futura
- Archivo `server.js` listo para configurar Express y middlewares

## Estado del proyecto:
- [x] Estructura de carpetas clara y escalable
- [x] Separación de responsabilidades por módulo
- [x] Preparado para conexión con MongoDB o JSON simulado
- [x] Listo para conectar lógica de sesión, carrito y stock

Este PR cierra la etapa de preparación inicial del sistema y deja el terreno preparado para las implementaciones funcionales posteriores.
