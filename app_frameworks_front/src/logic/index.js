import { registerProduct } from "./registerProduct";
import { getProducts } from "./getProducts";
import { getProductById } from "./getProductById";
import { updateProduct } from "./updateProduct";
import { deleteProduct } from "./deleteProduct";

import { registerUser } from "./registerUser";
import { loginUser } from "./loginUser";
import { isUserLoggedIn } from "./isUserLoggedIn";
import { logoutUser } from "./logoutUser";

export const logic = {
    registerProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser

};