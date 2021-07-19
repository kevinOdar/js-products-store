const apiUrl = 'https://course-api.com/javascript-store-products';

const obtenerProductos = async () => {
    const productos = await fetch(apiUrl)
        .then(response => response.json())
        .catch(err => {
            console.log('no se puede acceder a la api', err)
        })
    return productos;
}

export {
    obtenerProductos
}


