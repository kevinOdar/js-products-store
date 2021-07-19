// import './styles.css';
// import './assets/img/logo-white.svg';
import { obtenerProductos } from "./js/api.js";
// import { saveProductLS } from "./js/localstorage.js.js";

const miModulo = (() => {
    'use strict';
})();

const bag = document.querySelector('.off-canvas-bag'),
    cerrarBag = document.querySelector('.off-canvas__close'),
    loading = document.querySelector('.loading');

let productos = [];

const init = async () => {
    loading.classList.add('loading--show')

    let productosJSON = await obtenerProductos();
    productosJSON.forEach(({
        id,
        fields: {
            image: [
                {
                    thumbnails: {
                        large: {
                            url: imagenlg
                        },
                        small: {
                            url: imagensm
                        }
                    }
                },
            ],
            name,
            price,
            company
        }
    }) => {
        productos.push({ id, name, price, imagenlg, imagensm, company})
    })

    loading.classList.remove('loading--show');
}

const crearVariosProductos = (cantidad) => {
    for (let i = 0; i < cantidad; i++) {
        crearHTMLProducto(productos[i]);
    }
}

const crearHTMLProducto = (producto) => {
    const innerHTML =
        `
        <div  class = "col-4 product d-flex" data-id="${producto.id}">
        <img  src   = "${producto.imagenlg}" alt = "">
        <h5 class="d-none company">${producto.company}</h5>
        <div  class = "overlay">
            <a href="product.html?id=${producto.id}">
                <i    class = "fas fa-search fa-2x"></i>
            </a>
            <span class = "carrito">
                <i    class = "fa fa-shopping-cart cart-img fa-2x"></i>
            </span>
        </div>

        <h6 class = "pt-2 pt-1">${producto.name}</h6>
        <h6>\$ <span> ${producto.price} </span></h6>
    `;

    let divMomentaneo = document.createElement('div');
    divMomentaneo.innerHTML = innerHTML;
    let productElement = divMomentaneo.children[0];
    divMomentaneo.remove()

    let productRow = document.querySelector('.product-row');
    productRow.appendChild(productElement);

    // let lupa = productElement.children[1].children[0];

    // lupa.addEventListener('click', () => {
    //     console.log('probando')
    // })
}

const agregarProductoABug = (producto) => {
    const innerHTML =
        `
            <div class="col-4 item__img">
                <img src="${producto.imagenlg}" alt="">
            </div>

            <div class="item__description col-6">
                <h6 class="item__title mb-0">${producto.name}</h6>
                <h6 class="item__price mb-0">\$${producto.price}</h6>
                <a href="" class="item__remove-btn">Remove</a>
            </div>

            <div class="item__quantity col-2 d-flex justify-content-around ">
                <a class="quantity__up">
                    <i class="fas fa-chevron-up"></i>
                </a>
                <p class="quantity__number mb-0 text-center">1</p>
                <a class="quantity__down">
                    <i class="fas fa-chevron-down"></i>
                </a>
            </div>
    `;

    let elementdiv = document.createElement('div')
    elementdiv.classList.add('off-canvas__item', 'row', 'py-3', 'justify-content-between')
    elementdiv.innerHTML += innerHTML;

    //* Add off-canvas child
    let offCanvas = document.querySelector('.off-canvas');
    offCanvas.appendChild(elementdiv);

    //* Product quantity
    const btnUp = elementdiv.children[2].children[0],
        btnDown = elementdiv.children[2].children[2];

    let cantProductos = elementdiv.children[2].children[1];

    btnUp.addEventListener('click', () => {
        cantProductos.textContent = parseInt(cantProductos.textContent) + 1;
    })

    btnDown.addEventListener('click', () => {
        if (cantProductos.textContent > 1) {
            cantProductos.textContent = parseInt(cantProductos.textContent) - 1;
        }
    })

    //* Remove from 
    const btnRemove = elementdiv.children[1].children[2];

    btnRemove.addEventListener('click', e => {
        e.preventDefault();
        offCanvas.removeChild(elementdiv)
        elementdiv.remove()
    })
}

const crearPageProduct = (id) => {

    let productoBuscado = productos.find(producto => producto.id == id);

    const innerHTML =
        `
        <div class="col-sm-12 col-lg-6">
            <img src="${productoBuscado.imagenlg}" alt="">
        </div>

        <div class="col-sm-12 col-lg-6 px-4">
            <h2>${productoBuscado.name}</h2>
            <h3>${productoBuscado.company}</h3>
            <h3>\$${productoBuscado.price}</h3>
            <div class="colores-disponibles">
                <p></p>
                <p></p>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, modi? Minima libero doloremque necessitatibus! Praesentium recusandae quod nesciunt animi voluptatem!</p>
            <a type="button" class="btn btn-outline-secondary btn-lg px-4 button-primary button-secondary" href="">ADD TO CART</a>
        </div>
    `;

    let elementdiv = document.createElement('div')
    elementdiv.classList.add('row', 'pt-2', 'description')
    elementdiv.innerHTML += innerHTML;

    let productDescription = document.querySelector('.product-description');
    productDescription.appendChild(elementdiv);
}

const filtrar = (value) => {
    let productrow = document.querySelectorAll('.product')
    productrow.forEach(producto => {
        if(parseInt(producto.children[4].children[0].textContent) < value){
            producto.classList.remove('d-none')
        }
        else{
            producto.classList.add('d-none')
        }
    })
}

const filtrarPorMarca = (option) => {
    let productrow = document.querySelectorAll('.product')
    productrow.forEach(producto => {
        let optionHTML = producto.children[1];
        let optionHTMLCapitalize = optionHTML.textContent[0].toUpperCase() + optionHTML.textContent.substring(1);
        if((optionHTMLCapitalize == option) || (option == 'All')){
            producto.classList.remove('d-none');
        }else{
            producto.classList.add('d-none');
        }
    })
}

window.addEventListener('DOMContentLoaded', async () => {

    switch (window.location.pathname) {
        case '/comfy/docs/products.html':
            
            const priceValue = document.querySelector('.price__value'),
                  filter = document.querySelector('#precio')
            priceValue.textContent = filter.value;

            filter.addEventListener('click', () => {
                priceValue.textContent = filter.value;
                filtrar(filter.value)
            })

            let options = document.querySelectorAll('.opciones > li > a');
            options.forEach( option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault()
                    // 
                    filtrarPorMarca(option.textContent)
                })
            })
            

            await init();
            await crearVariosProductos(12);

            break;
        case '/comfy/docs/index.html':
            await init();
            await crearVariosProductos(3)
            break;
        case '/comfy/docs/product.html':
            await init();
            crearPageProduct(window.location.search.split('id=')[1])
            break;
        default:
            break;
    }

    let carritos = document.querySelectorAll('.carrito');
    carritos.forEach(carrito => {
        carrito.addEventListener('click', () => {
            bag.classList.add('off-canvas-bag--mostrar');

            cerrarBag.addEventListener('click', () => {
                bag.classList.remove('off-canvas-bag--mostrar');
            })

            // saveProductLS()
            let productoHTML = carrito.parentElement.parentElement;

            let productoBuscado = productos.find(producto => producto.id == productoHTML.getAttribute('data-id'));
            agregarProductoABug(productoBuscado);
        })
    })
})

