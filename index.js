const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const showAlert = document.getElementById("showAlert")
const cantidadCarrito = document.getElementById("cantidadCarrito")
const binID = '6574cd6a12a5d37659a589a1'
const apiKey = '$2a$10$p.jB7nS/OB8LfAMMRjfn.O4TWXUWqS9K6cLiXBn5PWx05IKkOTClK'
const url = `https://api.jsonbin.io/v3/b/${binID}`
const headers = { 'X-Master-Key': apiKey }
const loader =document.getElementById("preloader");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



const getProducts = async () => {
    const response = await fetch(url, { headers });
    const data = await response.json();

    data.record.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${product.img}">
            <h3>${product.Name}</h3>
            <p class="price">$${product.price} </p>
            `;
            shopContent.append(content);

            let comprar = document.createElement("button")
            comprar.innerText = "Comprar"
            comprar.className = "Comprar"

            content.append(comprar)

            comprar.addEventListener("click", () =>{

                const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)

                if(repeat){
                    carrito.map((prod) => {
                        if(prod.id === product.id){
                            prod.quantity++;
                        }
                    })
                }else {                
                    carrito.push({
                    id : product.id,
                    img : product.img,
                    Name : product.Name,
                    price : product.price,
                    quantity : product.quantity,
                })}
                saveLocal()
                carritoCounter()
            })

            comprar.addEventListener("click", ()=> {
                Toastify({
                    text: "Producto Agregado",
                    duration: 1000,
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(90deg, rgba(255,51,0,1) 16%, rgba(237,160,16,1) 95%)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            })
    });
}

getProducts()
carritoCounter()

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

