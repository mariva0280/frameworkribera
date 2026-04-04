import { data } from '../data'
import * as com from 'com'

const { validate, NetworkError, ValidationError, ServerError } = com

export const loginUser = (nombreUsuario, password) => {
    validate.nombreUsuario(nombreUsuario)
    validate.password(password)

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

    return fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreUsuario, password })
    })
        .catch(() => { throw new NetworkError('connection error') })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .catch(() => { throw new NetworkError('json error') })
                    .then(body => {
                        if (!body || !body.token) {
                            throw new ServerError('invalid login response')
                        }

                        data.setToken(body.token)
                    })

            return response.json()
                .catch(() => { throw new NetworkError('json error') })
                .then(body => {
                    if (typeof body === 'object' && !Array.isArray(body)) {
                        const firstError = Object.values(body)[0]
                        throw new ValidationError(firstError)
                    }

                    if (typeof body === 'string') {
                        throw new ValidationError(body)
                    }

                    if (body.error) {
                        throw new ServerError(body.error)
                    }

                    throw new ServerError('unexpected server error')
                })
        })
}