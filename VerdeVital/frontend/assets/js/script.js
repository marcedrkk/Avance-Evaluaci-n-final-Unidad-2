let productos = []; 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productoSeleccionado = null;
let usuarioActual = JSON.parse(localStorage.getItem('usuario')) || null;

// Obtener productos desde backend
async function obtenerProductos() {
  const contenedor = document.getElementById('productos');
  if (!contenedor) return;
  try {
    const res = await fetch('http://localhost:3000/api/productos');
    productos = await res.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    alert('No se pudieron cargar los productos.');
  }
}

// Mostrar productos
function mostrarProductos(lista) {
  const contenedor = document.getElementById('productos');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto-card';
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p>Precio: $${p.precio}</p>
      <p>Stock: ${p.stock}</p>
      ${p.stock > 0 
        ? `<button onclick="mostrarModalProducto(${p.id})">Ver detalle</button>` 
        : `<button disabled>Agotado</button>`
      }
    `;
    contenedor.appendChild(div);
  });
}

// Filtrar productos
function filtrarProductos() {
  const texto = document.getElementById('buscador')?.value.toLowerCase() || '';
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.descripcion.toLowerCase().includes(texto)
  );
  mostrarProductos(filtrados);
}

// Ordenar productos
function ordenarProductos() {
  const orden = document.getElementById('orden')?.value;
  if (!orden) return;
  const ordenados = [...productos];

  switch (orden) {
    case 'precio-asc': ordenados.sort((a, b) => a.precio - b.precio); break;
    case 'precio-desc': ordenados.sort((a, b) => b.precio - a.precio); break;
    case 'nombre-asc': ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
    case 'nombre-desc': ordenados.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
  }

  mostrarProductos(ordenados);
}

// Mostrar detalle de producto
function mostrarModalProducto(id) {
  productoSeleccionado = productos.find(p => p.id === id);
  if (!productoSeleccionado) return;

  document.getElementById('modalTitulo').textContent = productoSeleccionado.nombre;
  document.getElementById('modalDescripcion').textContent = productoSeleccionado.descripcion;
  document.getElementById('modalPrecio').textContent = `$${productoSeleccionado.precio}`;
  document.getElementById('modalStock').textContent = productoSeleccionado.stock;
  document.getElementById('modalProducto').style.display = 'block';
}

// Cerrar modal
function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

// Agregar al carrito
function agregarAlCarrito() {
  if (!usuarioActual) {
    alert('Por favor inicia sesión para agregar productos al carrito');
    return;
  }

  if (!productoSeleccionado || productoSeleccionado.stock <= 0) {
    alert('Producto sin stock disponible');
    return;
  }

  const item = carrito.find(p => p.id === productoSeleccionado.id);
  if (item) {
    if (item.cantidad < productoSeleccionado.stock) {
      item.cantidad++;
    } else {
      alert('No hay más stock disponible');
      return;
    }
  } else {
    carrito.push({ ...productoSeleccionado, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert('Producto agregado al carrito');
  cerrarModal('modalProducto');
}

// Actualiza número de productos
function actualizarContadorCarrito() {
  const contador = document.getElementById('carritoCount');
  if (contador)
    contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// Mostrar modal del carrito
function mostrarCarrito() {
  const modal = document.getElementById('modalCheckout');
  const lista = document.getElementById('listaCarrito');
  const total = document.getElementById('totalCarrito');

  if (!modal || !lista || !total) return;

  lista.innerHTML = '';
  let totalFinal = 0;

  carrito.forEach(item => {
    totalFinal += item.precio * item.cantidad;
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    lista.appendChild(li);
  });

  total.textContent = `Total: $${totalFinal}`;
  modal.style.display = 'block';
}

// Confirmar compra
function realizarCompra() {
  if (carrito.length === 0) return alert('El carrito está vacío');
  carrito = [];
  localStorage.removeItem('carrito');
  actualizarContadorCarrito();
  cerrarModal('modalCheckout');
  document.getElementById('modalSuccess')?.style.display = 'block';
}

// ------------------- LOGIN -------------------
document.getElementById('btnLogin')?.addEventListener('click', () => {
  document.getElementById('modalLogin').style.display = 'block';
});

document.getElementById('formLogin')?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('loginCorreo').value;
  const contrasena = document.getElementById('loginContrasena').value;

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('usuario', JSON.stringify(data));
      usuarioActual = data;
      alert(`Bienvenido, ${data.nombre}`);
      cerrarModal('modalLogin');

      if (data.rol === 'admin') {
        window.location.href = 'admin.html';
      } else {
        location.reload();
      }
    } else {
      alert(data.mensaje || 'Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('No se pudo iniciar sesión');
  }
});

// ------------------- CERRAR SESIÓN -------------------
document.getElementById('btnLogout')?.addEventListener('click', () => {
  localStorage.removeItem('usuario');
  location.reload();
});

// ------------------- INICIALIZACIÓN -------------------
window.onload = () => {
  actualizarContadorCarrito();
  obtenerProductos();

  // Ocultar botón admin si no corresponde
  const btnAdmin = document.getElementById('btnAdmin');
  if (btnAdmin && usuarioActual?.rol !== 'admin') {
    btnAdmin.style.display = 'none';
  }
};

// Mostrar modal carrito
document.getElementById('btnCarrito')?.addEventListener('click', mostrarCarrito);

// Confirmar compra
document.getElementById('btnComprar')?.addEventListener('click', realizarCompra);

// Cerrar modales haciendo clic afuera
window.onclick = function (e) {
  ['modalProducto', 'modalLogin', 'modalCheckout', 'modalSuccess'].forEach(id => {
    const m = document.getElementById(id);
    if (m && e.target === m) m.style.display = 'none';
  });
};
