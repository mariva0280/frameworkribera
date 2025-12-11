import { ValidationError } from "./errors.js";

export const validate = {

    id(id) {
        const value = Number(id);

        if (!id && id !== 0) {
            throw new ValidationError("El ID es obligatorio.");
        }
        if (isNaN(value) || value <= 0) {
            throw new ValidationError("El ID debe ser un número válido mayor que 0.");
        }
    },

    nombre(nombre) {
        if(typeof nombre !== 'string' || nombre.trim() === '') {
            throw new ValidationError('El nombre no puede estar vacío.');
        }
    },

    descripcion(descripcion) {
        if (descripcion && descripcion.trim().length < 3) {
            throw new ValidationError('La descripción debe tener al menos tres carácteres.');
        }
    },
   
    precio(precio) {
        const value = Number(precio);

        if (precio === undefined || precio === null || precio === "") {
            throw new ValidationError("El precio es obligatorio.");
        }

        if (isNaN(value) || value < 0) {
            throw new ValidationError("El precio debe ser un número válido mayor o igual a cero.");
        }
    },

    stock(stock) {
        const value = Number(stock);

        if (stock === undefined || stock === null || stock === "") {
            throw new ValidationError("El stock es obligatorio.");
        }

        if (isNaN(value) || value < 0) {
            throw new ValidationError("El stock debe ser un número válido mayor o igual a cero.");
        }
    },

    nombreUsuario(nombreUsuario) {
        if(typeof nombreUsuario !== 'string' || nombreUsuario.trim() === '') {
            throw new ValidationError('El nombre de usuario no puede estar vacío y debe ser una cadena de texto.');
        }

        if (nombreUsuario.length < 3) {
            throw new ValidationError('El nombre de usuario debe tener al menos tres carácteres.');
        }
    },
    
    email(email) {
        if (typeof email !== 'string' || email.trim() === '') {
            throw new ValidationError('El email no puede estar vacío y debe ser una cadena de texto.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('El email no tiene un formato válido.');
        }
    },

    password(password) {
        if (typeof password !== 'string' || password.trim() === '') {
            throw new ValidationError('La contraseña no puede estar vacía y debe ser una cadena de texto.');
        }
        if (password.length < 6) {
            throw new ValidationError('La contraseña debe tener al menos seis carácteres.');
        }
    }


}