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
        <div className="mt-6 space-y-4">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        Productos
                    </h2>
                    <p className="text-sm text-slate-600">
                        Gestiona el listado (actualizar/eliminar) desde esta vista.
                    </p>
                </div>
                <span className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700">
                    Total: {products.length}
                </span>
            </div>

            {products.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
                    No hay productos registrados.
                </p>
            ) : (
                <div className="space-y-3">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <h3 className="truncate text-lg font-semibold text-slate-900">
                                        {product.nombre}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        {product.descripcion}
                                    </p>

                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                                        <span className="rounded-lg bg-slate-50 px-3 py-1 font-semibold text-slate-900">
                                            {product.precio}€
                                        </span>
                                        <span>
                                            <span className="font-medium">Stock:</span> {product.stock}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                                    <button
                                        className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                        type="button"
                                        onClick={() => onUpdateClicked(product)}
                                    >
                                        Actualizar ✏️
                                    </button>

                                    <button
                                        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        type="button"
                                        onClick={() => handleDeleteClick(product.id)}
                                    >
                                        Eliminar 🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
