//PRODUCTOS Y SUS DATOS
let productos = [
    {id: 1, nombre: "Pantalla", precio: 100, categoria: "Componentes"},
    {id: 2, nombre: "Ratón", precio: 20, categoria: "Componentes"},
    {id: 3, nombre: "Teclado", precio: 35, categoria: "Componentes"},
    {id: 4, nombre: "Auriculares", precio: 50, categoria: "Audio"},
    {id: 5, nombre: "Funda Auriculares", precio: 10, categoria: "Accesorios"},
    {id: 6, nombre: "Mochila", precio: 40, categoria: "Accesorios"}
];

let carrito = [];

//FUNCION PARA VER LOS PRODUCTOS
function renderProductos() {
    let listaProductos = document.querySelector("#productos");
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("col-4");

        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: ${producto.precio} €</p>
                    <p class="card-text">${producto.categoria}</p>
                </div>    
                <div class= "text-center">
                    <button 
                        class="btn btn-primary mb-2"
                        onclick="añadirAlCarrito(${producto.id})">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;
        listaProductos.appendChild(div);
    });
}
//FUNCION PARA AÑADIR AL CARRITO
function añadirAlCarrito(id) {
    let producto = productos.find(p => p.id === id);
    carrito.push(producto);

    renderCarrito();

    Swal.fire({
        icon: "success",
        title: "Producto añadido",
        text: `El producto se ha añadido correctamente`,
        timer: 1500,
        showConfirmButton: false,
    });
}
//FUNCION PARA VER EL CARRITO
function renderCarrito() {
    let contenedor = document.querySelector("#carrito");
    contenedor.innerHTML = "";

    let carritoAgrupado = agruparCarrito();

    carritoAgrupado.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("card", "mb-1");

        div.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p><strong>${item.nombre}</strong></p>
                    <p>Importe: ${item.precio} € - Cantidad: ${item.cantidad}</p>
                </div>
                <button 
                    class="btn btn-danger"
                    onclick="eliminarDelCarrito(${item.id})">
                    Eliminar
                </button>
            </div>
        `;
        contenedor.appendChild(div);
    });
    actualizarTotales();
}
//FUNCION PARA AGRUPAR PRODUCTOS REPETIDOS
function agruparCarrito() {
    let carritoAgrupado = [];

    carrito.forEach(producto => {
        let existente = carritoAgrupado.find(p => p.id === producto.id);

        if (existente) {
            existente.cantidad++;
        } else {
            carritoAgrupado.push({...producto, cantidad: 1 });
        }
    });

    return carritoAgrupado;
}
//FUNCION PARA ELIMINAR UN ARTICULO DEL CARRITO
function eliminarDelCarrito(id) {
    Swal.fire({
        title: "¿Eliminar producto?",
        text: "Se eliminará del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            carrito = carrito.filter(p => p.id !== id);
            renderCarrito();

            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El producto fue eliminado del carrito",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
//FUNCION PARA VACIAR EL CARRITO
function vaciarCarrito() {
    if (carrito.length === 0) return;

    Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se eliminarán todos los productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            carrito = [];
            renderCarrito();

            Swal.fire({
                icon: "success",
                title: "Carrito vacío",
                text: "El carrito se ha vaciado correctamente",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
//FUNCIONES PARA CALCULAR LOS TOTALES
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}
function actualizarTotales() {
    document.querySelector("#contadorCarrito").textContent = carrito.length;
    document.querySelector("#totalCarrito").textContent = calcularTotal();
}
//EVENTO DE VACIAR EL CARRITO
let botonVaciar = document.querySelector("#vaciarCarrito");
botonVaciar.addEventListener("click", vaciarCarrito);

//PARA INICIAR LA PÁGINA
renderProductos();
renderCarrito();