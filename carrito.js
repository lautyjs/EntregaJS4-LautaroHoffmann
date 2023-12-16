//carrito abierto
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex"

    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">CARRITO</h1>
    `;
    modalContainer.append(modalHeader)

    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button"

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalButton)

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${product.img}"
        <h3>${product.Name}</h3>
        <p class="price">$${product.price} </p>
        <span class="restar"> - </span>
        <p>${product.quantity} </p>
        <span class="sumar"> + </span>
        <p>Total: ${product.quantity * product.price}        
         `;

         modalContainer.append(carritoContent);



         let restar = carritoContent.querySelector(".restar")
         let sumar = carritoContent.querySelector(".sumar")
         restar.addEventListener("click", () =>{
            if(product.quantity !== 1){
                product.quantity--
            }
            pintarCarrito()
            saveLocal()

         })
         sumar.addEventListener("click", () =>{
            product.quantity++
            pintarCarrito()
            saveLocal()
         })



         let eliminar = document.createElement("span");
         eliminar.innerText = "❌"
         eliminar.classList = "delete-product";
         carritoContent.append(eliminar);

         eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.price * el.quantity, 0 );

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalBuying);

    const terminarCompra = document.createElement("button")
    terminarCompra.className = "finish"
    terminarCompra.innerText = "Terminar Compra"
    modalContainer.append(terminarCompra)
    terminarCompra.addEventListener("click", terminarYa)
    
};


verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = () => {
    const foundID = carrito.find((element) => element.id);
    
    carrito = carrito.filter((carritoID) => {
        return carritoID !== foundID;
    })
    carritoCounter()
    saveLocal()
    pintarCarrito();
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}
//Terminar compra

const endBuy = () => {
    finishBuy.innerHTML= "";
    finishBuy.style.display = "flex"

    const modalEnd = document.createElement("div")
    modalEnd.className = "modal-header-end"
    modalEnd.innerHTML = `
    <h1 class="modal-end">Su Compra</h1>
    `
    modalContainer.style.display = "none"

    const modalButtonEnd = document.createElement("h1");
    modalButtonEnd.innerText = "X";
    modalButtonEnd.className = "modal-header-button"

    modalButtonEnd.addEventListener("click", () =>{
        modalEnd.style.display = "none"
    })

    finishBuy.append(modalEnd)
    modalEnd.append(modalButtonEnd)
};

//terminar la compra
const terminarYa = async () => {
    const { value: email } = await Swal.fire({
      title: "Ingrese Su Email",
      input: "email",
      inputLabel: "Recibira la confirmacion de compra en su correo",
      inputPlaceholder: "Ingrese el email...",
    });
    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  }

//Fin terminar compra