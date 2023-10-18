document.addEventListener("DOMContentLoaded", function () {
    const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];

    const catalogoContainer = document.getElementById("catalogo");
    const botonAgregarProducto = document.getElementById("botonAgregarProducto");

    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-4");
        card.innerHTML =`
            <div class="card">
                <img src="${producto.imagen}" class="img-fluid mx-auto d-block" id="imagenCatalogo" alt="Producto ${producto.id}">
                    <div class="card-body">
                        <div class="col">
                            <h3 class="card-title">${producto.id}</h3>
                            <input type="text" class="card-input" id="inputCatalogo1" placeholder="Ingrese nuevo ID"></input>
                            <p class="card-text">$${producto.precio}</p>
                            <input type="text" class="card-input" id="inputCatalogo2" placeholder="Ingrese nuevo precio"></input>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary botonModificar" id="botonModificar">Modificar</button>
                            <button class="btn btn-primary botonEliminar" id="botonEliminar">Eliminar</button>
                        </div>
                    </div>
            </div>
        `;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón eliminar
        const botonEliminar = card.querySelector(".botonEliminar");
        botonEliminar.addEventListener("click", function () {
            const productoAEliminar = catalogo.find(item => item.id === producto.id);
            const indexAEliminar = catalogo.indexOf(productoAEliminar);

            // Verifica si se encontró el producto en el array
            if (indexAEliminar !== -1) {
                // Elimina el producto del array
                catalogo.splice(indexAEliminar, 1);

                // Elimina la tarjeta de la interfaz de usuario
                card.remove();

                // Actualiza el localStorage con el catálogo modificado
                localStorage.setItem("catalogo", JSON.stringify(catalogo));
            }
            console.log("Elimina producto");
        });

        // Agrega un evento de clic al botón Modificar
        const botonModificar = card.querySelector(".botonModificar");
        botonModificar.addEventListener("click", function () {
            const inputCatalogo1 = card.querySelector("#inputCatalogo1");
            const inputCatalogo2 = card.querySelector("#inputCatalogo2");

            // Obtiene los nuevos valores de los inputs
            const nuevoID = inputCatalogo1.value;
            const nuevoPrecio = inputCatalogo2.value;

            // Verifica que los campos no estén vacíos antes de actualizar
            if (nuevoID && nuevoPrecio) {
                // Encuentra el producto en el catálogo actual
                const productoAModificar = catalogo.find(item => item.id === producto.id);

                // Actualiza los valores del producto con los nuevos valores
                productoAModificar.id = nuevoID;
                productoAModificar.precio = nuevoPrecio;

                // Actualiza la información de la tarjeta con los nuevos valores
                card.querySelector(".card-title").textContent = nuevoID;
                card.querySelector(".card-text").textContent = `$${ nuevoPrecio } `;

                // Actualiza el local storage con el catálogo modificado
                localStorage.setItem("catalogo", JSON.stringify(catalogo));
            } else {
                alert("Por favor, complete todos los campos antes de modificar el producto.");
            }
        });
    });
    botonAgregarProducto.addEventListener("click", function () {
        // Obtiene los valores de los nuevos campos de entrada
        const inputCatalogoImagen = document.getElementById("inputCatalogoImagen").value;
        const inputCatalogoID = document.getElementById("inputCatalogoID").value;
        const inputCatalogoPrecio = document.getElementById("inputCatalogoPrecio").value;

        // Verifica que los campos no estén vacíos antes de agregar el producto
        if (inputCatalogoImagen && inputCatalogoID && inputCatalogoPrecio) {
            // Crea un nuevo producto con los datos ingresados
            const nuevoProducto = {
                id: inputCatalogoID,
                imagen: inputCatalogoImagen,
                precio: inputCatalogoPrecio
            };

            // Agrega el nuevo producto al catálogo
            catalogo.push(nuevoProducto);

            // Actualiza el localStorage con el catálogo modificado
            localStorage.setItem("catalogo", JSON.stringify(catalogo));

            // Crea una nueva tarjeta para el nuevo producto y agrega al catálogoContainer
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
            card.innerHTML = `
            < div class="card" >
                <img src="${nuevoProducto.imagen}" class="img-fluid card-img-top" alt="Producto ${nuevoProducto.id}">
                    <div class="card-body">
                        <div class="col">
                            <h3 class="card-title">${nuevoProducto.id}</h3>
                            <input type="text" class="card-input" id="inputCatalogo1" placeholder="Ingrese nuevo ID"></input>
                            <p class="card-text">$${nuevoProducto.precio}</p>
                            <input type="text" class="card-input" id="inputCatalogo2" placeholder="Ingrese nuevo precio"></input>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary botonModificar" id="botonModificar">Modificar</button>
                            <button class="btn btn-primary botonEliminar" id="botonEliminar">Eliminar</button>
                        </div>
                    </div>
                </div>
        `;
            catalogoContainer.appendChild(card);

            // Limpia los campos de entrada
            document.getElementById("inputCatalogoImagen").value = "";
            document.getElementById("inputCatalogoID").value = "";
            document.getElementById("inputCatalogoPrecio").value = "";

            console.log("Producto agregado correctamente");
        } else {
            alert("Por favor, complete todos los campos antes de agregar el producto.");
        }
    });
});