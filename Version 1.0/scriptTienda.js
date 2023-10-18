document.addEventListener("DOMContentLoaded", function () {
    const catalogoAlmacenado = localStorage.getItem('catalogo');

    const catalogo = catalogoAlmacenado ? JSON.parse(catalogoAlmacenado) : [
        { id: "Gatito", imagen: "https://m.media-amazon.com/images/I/6192+1qwSqL._AC_SY300_SX300_.jpg", precio: 20 },
        { id: "Kirby", imagen: "https://m.media-amazon.com/images/I/71CWyOJOOVL.__AC_SY300_SX300_QL70_ML2_.jpg", precio: 15 },
        { id: "Stich", imagen: "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/7a2009d5-df64-4537-a164-54ad27f0b3b0.6179bcb7d08d04f39a6bcf2b9cd75afd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", precio: 20 },
        { id: "Squirtle", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1TS_VcokuDHBNlJraV7DFCIPhLCScbbk5hg&usqp=CAU", precio: 25 },
        { id: "Charmander", imagen: "https://cdn.gameplanet.com/wp-content/uploads/2022/11/15113257/191726379584-peluche-charmander-pokemon-1-2.jpg", precio: 20 },
        { id: "Mudkip", imagen: "https://http2.mlstatic.com/D_NQ_NP_762428-MLM26234238925_102017-O.webp", precio: 40 },
        { id: "Peepo", imagen: "https://www.uncute.com/cdn/shop/products/PepetheFrog-officialplushie-6026-Square-ffffff-3000px_1024x1024.jpg?v=1596581175", precio: 45 },
        // Agrega más productos aquí; // Puedes inicializarlo con los valores que desees
    ]
   
    localStorage.setItem("catalogo", JSON.stringify(catalogo));

    const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");

    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-4");
        card.innerHTML = `
    <div class="card">
        <img src="${producto.imagen}" class="img-fluid mx-auto d-block" id="imagenCatalogo" alt="Producto ${producto.id}">
        <div class="card-body">
            <h3 class="card-title">${producto.id}</h3>
            <p class="card-text">$${producto.precio}</p>
            <input type="text" class="card-input" id="cantidadProducto${producto.id}" placeholder="Ingresa la cantidad"/>
            <button class="btn btn-primary">Agregar</button>
        </div>
    </div>
`;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón de "Agregar al Carrito"
        const botonAgregar = card.querySelector("button");
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });

    const carrito = [];

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
    <td>${item.producto.id}</td>
    <td class="catidad-producto-tabla">${item.cantidad}</td>
    <td>$${item.producto.precio * item.cantidad}</td>
`;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    botonFinalizarCompra.addEventListener("click", function (event) {
        localStorage.setItem('total', total.textContent);
        window.location.href = "ticket.html";
    });
});