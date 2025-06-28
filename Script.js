// --- EVENTO PRINCIPAL: Se ejecuta cuando el HTML está completamente cargado ---
document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DATOS DE PRODUCTOS (simulada) ---
    // En una aplicación real, esto vendría de un servidor.
    const productos = [
        {
            id: 1,
            nombre: 'Laptop Gamer Pro',
            precio: 1250.50,
            imagen: 'https://via.placeholder.com/300x200/92c952/FFFFFF?Text=Laptop'
        },
        {
            id: 2,
            nombre: 'Teclado Mecánico RGB',
            precio: 85.00,
            imagen: 'https://via.placeholder.com/300x200/771796/FFFFFF?Text=Teclado'
        },
        {
            id: 3,
            nombre: 'Monitor Curvo 27"',
            precio: 350.75,
            imagen: 'https://via.placeholder.com/300x200/2d87e0/FFFFFF?Text=Monitor'
        },
        {
            id: 4,
            nombre: 'Mouse Inalámbrico Ergonómico',
            precio: 45.99,
            imagen: 'https://via.placeholder.com/300x200/d62929/FFFFFF?Text=Mouse'
        }
    ];

    // --- VARIABLES GLOBALES Y SELECTORES DEL DOM ---
    let carrito = [];
    const divisa = '$';
    const productosContainer = document.querySelector('#productos-container');
    const carritoContainer = document.querySelector('#carrito-container');
    const totalCarritoPrecio = document.querySelector('#carrito-total-precio');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito-btn');

    // --- EVENTOS ---
    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    });

    // --- FUNCIONES ---

    // 1. Renderizar productos en el DOM
    function renderizarProductos() {
        productos.forEach((producto) => {
            // Crear la tarjeta del producto
            const card = document.createElement('div');
            card.classList.add('producto-card');
            
            // Crear la imagen
            const imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;

            // Crear el cuerpo de la tarjeta
            const info = document.createElement('div');
            info.classList.add('producto-info');
            
            const titulo = document.createElement('h3');
            titulo.textContent = producto.nombre;
            
            const precio = document.createElement('p');
            precio.classList.add('precio');
            precio.textContent = `${divisa}${producto.precio.toFixed(2)}`;
            
            const boton = document.createElement('button');
            boton.classList.add('agregar-carrito-btn');
            boton.textContent = 'Agregar al Carrito';
            boton.dataset.id = producto.id;
            boton.addEventListener('click', agregarProductoAlCarrito);

            // Armar la tarjeta
            info.appendChild(titulo);
            info.appendChild(precio);
            info.appendChild(boton);
            card.appendChild(imagen);
            card.appendChild(info);
            
            // Agregar la tarjeta al contenedor
            productosContainer.appendChild(card);
        });
    }

    // 2. Agregar un producto al carrito
    function agregarProductoAlCarrito(evento) {
        const idProducto = parseInt(evento.target.dataset.id);
        
        // Comprobar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === idProducto);

        if (productoEnCarrito) {
            // Si ya está, incrementar la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Si no está, agregarlo con cantidad 1
            const producto = productos.find(item => item.id === idProducto);
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }
        
        // Actualizar la vista del carrito
        renderizarCarrito();
    }

    // 3. Renderizar el carrito en el DOM
    function renderizarCarrito() {
        // Limpiar el HTML previo
        carritoContainer.innerHTML = '';
        
        // Generar el HTML del carrito
        carrito.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrito-item');
            
            // Información del item
            const infoSpan = document.createElement('span');
            infoSpan.textContent = `${item.nombre}`;
            
            const cantidadSpan = document.createElement('span');
            cantidadSpan.classList.add('cantidad');
            cantidadSpan.textContent = `x${item.cantidad}`;

            // Botón para eliminar el item del carrito
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'X';
            botonEliminar.dataset.id = item.id;
            botonEliminar.addEventListener('click', eliminarItemCarrito);
            
            itemDiv.appendChild(infoSpan);
            itemDiv.appendChild(cantidadSpan);
            itemDiv.appendChild(botonEliminar);
            
            carritoContainer.appendChild(itemDiv);
        });
        
        // Actualizar el precio total
        calcularYRenderizarTotal();

        // Guardar carrito en el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    // 4. Eliminar un item del carrito
    function eliminarItemCarrito(evento) {
        const idProducto = parseInt(evento.target.dataset.id);
        carrito = carrito.filter(item => item.id !== idProducto);
        renderizarCarrito();
    }

    // 5. Calcular y mostrar el total del carrito
    function calcularYRenderizarTotal() {
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalCarritoPrecio.textContent = `${divisa}${total.toFixed(2)}`;
    }

    // 6. Guardar el carrito en el LocalStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // 7. Cargar el carrito desde el LocalStorage
    function cargarCarritoDeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
        }
    }

    // --- INICIO DE LA APLICACIÓN ---
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});