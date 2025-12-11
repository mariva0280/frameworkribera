import { validate, NetworkError, ValidationError, ServerError } from 'com'

export const registerUser = (nombreUsuario, email, password) => {
    validate.nombreUsuario(nombreUsuario)
    validate.email(email)
    validate.password(password)

    return fetch(import.meta.env.VITE_API_URL + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreUsuario, email, password })
    })
        .catch(() => { throw new NetworkError('connection error') })
        .then(response => {
            const { status } = response

            if (status === 200 || status === 201) return

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

                    throw new ServerError("unexpected server error")
                })
        })
}