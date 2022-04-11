import { SERVER_DIR } from "../../../const/ServerUrl"
import { BRANDS } from "../../../const/routes"

const BRAND_URL = `${SERVER_DIR}/api/${BRANDS}`

export const getBrands = async () => {
    const brands = await fetch(BRAND_URL);
    if (brands.status != 200) {
        console.error((await brands.json()));
        throw new Error(`Error status code: ${brands.status}`)
    }

    return (await brands.json())
}

export const postBrand = async (data) => {
    const brand = await fetch(BRAND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (brand.status != 200) {
        console.error((await brand.json()));
        throw new Error(`Error status code: ${brand.status}`)
    }
    return brand
}

export const putBrand = async (data = {}) => {
    const brand = await fetch(`${BRAND_URL}/${data.id}`, {
        method: 'PUT',
        // mode: 'same-origin',
        // mode: 'cors', // no-cors, *cors, same-origin
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (brand.status != 200) {
        console.error((await brand.json()));
        throw new Error(`Error status code: ${brand.status}`)
    }
    return brand
}

export const deleteBrand = async (id) => {
    const brand = await fetch(`${BRAND_URL}/${id}`, {
        method: 'DELETE',
        // mode: 'same-origin',
        // mode: 'cors', // no-cors, *cors, same-origin
    })
    if (brand.status != 200) {
        console.error((await brand.json()));
        throw new Error(`Error status code: ${brand.status}`)
    }
    return brand
}


// // Ejemplo implementando el metodo POST:
// async function postData(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

// postData('https://example.com/answer', { answer: 42 })
//     .then(data => {
//         console.log(data); // JSON data parsed by `data.json()` call
//     });