export class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

export class DuplicityError extends Error {
    constructor(message) {      
        super(message);
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }       
}

export class AuthError extends Error {
    constructor(message) {
        super(message);
    }
}

export class NetworkError extends Error {
    constructor(message) {
        super(message);
    }
}

export class ServerError extends Error {
    constructor(message) {
        super(message);
    }
}


const errors = {
    ValidationError,
    DuplicityError,
    NotFoundError,
    AuthError,
    NetworkError,
    ServerError
}

export default errors;