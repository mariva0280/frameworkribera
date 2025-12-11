import { validate, NetworkError, ValidationError, ServerError } from 'com';
import { data } from '../data'

export const deleteProduct = id => {
    validate.id(id);

    const token = data.getToken();

    if (!token) {
        throw new NetworkError('No token available');
    }

    return fetch(import.meta.env.VITE_API_URL + `/productos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .catch(() => { throw new NetworkError('Connetion error')})
        .then(response => {
            const { status } = response;

            if (status === 204) {
                return;
            }

            return response.json()
                .catch(() => { throw new NetworkError('json error')})
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