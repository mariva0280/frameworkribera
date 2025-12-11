import { useEffect, useState } from 'react'
import { logic } from '../../logic'

export const ProductsList = ({ alert, confirm, onUpdateClicked }) => {
    const [products, setProducts] = useState([])

    const loadProducts = () => {
        try {
            logic.getProducts()
                .then(products => setProducts(products))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleDeleteClick = id => {
        confirm('¿Seguro que quieres eliminar este producto?')
            .then(accepted => {
                if (!accepted) return

                try {
                    logic.deleteProduct(id)
                        .then(() => loadProducts())
                        .catch(error => {
                            console.error(error)
                            alert(error.message)
                        })

                } catch (error) {
                    console.error(error)
                    alert(error.message)
                }
            })
            .catch(() => { })
    }

    console.log('ProductsList -> render')

    return (
        <div className="mt-4 flex flex-col gap-4">

            {products.map(product => (
                <div
                    key={product.id}
                    className="border border-black rounded-xl p-4 bg-[#cde5ed] flex justify-between items-center"
                >
                    <div>
                        <h2 className="text-lg font-bold">{product.nombre}</h2>
                        <p className="text-sm">{product.descripcion}</p>
                        <p className="text-sm font-medium">Precio: {product.precio}€</p>
                        <p className="text-sm font-medium">Stock: {product.stock}</p>
                    </div>

                    <div className="flex flex-col gap-2">

                        <button
                            className="text-white bg-[#0ab5ee] rounded px-3 py-1 hover:scale-105 transition"
                            type="button"
                            onClick={() => onUpdateClicked(product)}
                        >
                            Actualizar ✏️
                        </button>

                        <button
                            className="text-white bg-red-500 rounded px-3 py-1 hover:scale-105 transition"
                            type="button"
                            onClick={() => handleDeleteClick(product.id)}
                        >
                            Eliminar 🗑️
                        </button>

                    </div>
                </div>
            ))}

            {products.length === 0 && (
                <p className="text-center text-gray-600">No hay productos registrados.</p>
            )}
        </div>
    )
}
