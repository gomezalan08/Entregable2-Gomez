// --- VARIABLES Y DATOS ---

// Stock de productos con rutas locales
const productosStock = [
    { id: 1, nombre: "Teclado Mecánico", precio: 8500, img: "./assets/img/teclado.jpg" },
    { id: 2, nombre: "Mouse Gamer", precio: 3200, img: "./assets/img/mouse.jpg" },
    { id: 3, nombre: "Monitor 24'", precio: 45000, img: "./assets/img/monitor.jpg" },
    { id: 4, nombre: "Silla Gamer", precio: 65000, img: "./assets/img/silla.jpg" },
    { id: 5, nombre: "Auriculares", precio: 6000, img: "./assets/img/auriculares.jpg" },
    { id: 6, nombre: "Webcam HD", precio: 4500, img: "./assets/img/webcam.jpg" }
];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('items-carrito');
const precioTotalElemento = document.getElementById('precio-total');
const btnVaciar = document.getElementById('btn-vaciar');
const inputBuscador = document.getElementById('input-buscador');
const mensajeCompra = document.getElementById('mensaje-compra');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// --- FUNCIONES ---

function renderizarProductos(listaProductos) {
    contenedorProductos.innerHTML = ""; 

    listaProductos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text fw-bold">$${producto.precio}</p>
                    <button id="agregar-${producto.id}" class="btn btn-primary mt-auto">Comprar</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(div);

        const boton = document.getElementById(`agregar-${producto.id}`);
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        });
    });
}

function agregarAlCarrito(id) {
    const producto = productosStock.find(prod => prod.id === id);
    carrito.push(producto);
    actualizarCarrito();
    mostrarMensaje(`Agregado: ${producto.nombre}`);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        li.innerHTML = `
            ${producto.nombre} 
            <span class="badge bg-primary rounded-pill">$${producto.precio}</span>
            <button onclick="eliminarDelCarrito(${index})" class="btn btn-danger btn-sm ms-2" style="font-size: .75rem;">X</button>
        `;
        contenedorCarrito.appendChild(li);
    });

    precioTotalElemento.innerText = total;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarMensaje(texto) {
    mensajeCompra.innerText = texto;
    setTimeout(() => { mensajeCompra.innerText = ""; }, 2000);
}

// --- EVENTOS ---

btnVaciar.addEventListener('click', () => {
    if(carrito.length === 0) return;
    carrito = [];
    actualizarCarrito();
    mostrarMensaje("Carrito vaciado");
});

inputBuscador.addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const filtrados = productosStock.filter(prod => prod.nombre.toLowerCase().includes(busqueda));
    renderizarProductos(filtrados);
});

// --- INICIALIZACION ---

renderizarProductos(productosStock);
actualizarCarrito();