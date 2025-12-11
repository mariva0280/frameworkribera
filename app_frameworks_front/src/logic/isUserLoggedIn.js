import { data } from '../data'


export const isUserLoggedIn = () => { //comprueba si usuario esta logeado o no
    return !!data.getToken() // atención a la doble negación
}