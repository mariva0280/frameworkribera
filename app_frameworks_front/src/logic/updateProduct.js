import { validate, NetworkError, ValidationError, ServerError } from 'com';
import { data } from '../data'

export const updateProduct = (id, nombre, descripcion, precio, stock) => {
    validate.id(id);
    validate.nombre(nombre);
    validate.descripcion(descripcion);
    validate.precio(precio);
    validate.stock(stock);

    const token = data.getToken();

    if (!token) {
        throw new NetworkError('No token available');
    }

    return fetch(import.meta.env.VITE_API_URL + `/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({ nombre, descripcion, precio, stock })
    })
        .catch(() => { throw new NetworkError('Connection error') })
        .then(response => {
            const { status } = response;

            if (status === 200) {
                return response.json()
                .catch(() => { throw new NetworkError('json error') })
            }

            return response.json()
                .catch(() => { throw new NetworkError('json error') })
                .then(body => {
                    if(typeof body === 'object' && !Array.isArray(body)) {
                        const firstError = Object.values(body)[0]
                        throw new ValidationError(firstError)
                    }

                    if (typeof body === 'string') {
                        throw new ValidationError(body)
                    }

                    if (body.error) {
                        throw new ServerError(body.error)
                    }

                    throw new ServerError("unexpected server error")
        })
    })
}