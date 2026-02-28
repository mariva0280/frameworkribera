import { logic } from '../../logic'

export const UpdateProduct = ({ product, alert, onCancelClicked, onProductUpdated }) => {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nombre = form.nombre.value
        const descripcion = form.descripcion.value
        const precio = form.precio.value
        const stock = form.stock.value

        try {
            logic.updateProduct(product.id, nombre, descripcion, precio, stock)
                .then(() => {
                    form.reset()
                    onProductUpdated()
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return (
        <section className="mx-auto mt-6 max-w-3xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                            Actualizar producto
                        </h2>
                        <p className="text-sm text-slate-600">
                            Modifica los datos del producto y guarda los cambios.
                        </p>
                    </div>
                </header>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>

                    {/* Grid de campos */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                                type="text"
                                name="nombre"
                                id="nombre"
                                defaultValue={product.nombre}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="precio">
                                Precio (€)
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                                type="number"
                                step="0.01"
                                name="precio"
                                id="precio"
                                defaultValue={product.precio}
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="descripcion">
                                Descripción
                            </label>
                            <textarea
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                                name="descripcion"
                                id="descripcion"
                                rows="3"
                                defaultValue={product.descripcion}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="stock">
                                Stock
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                                type="number"
                                name="stock"
                                id="stock"
                                defaultValue={product.stock}
                            />
                        </div>

                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
                            type="button"
                            onClick={onCancelClicked}
                        >
                            Cancelar
                        </button>

                        <button
                            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            type="submit"
                        >
                            Actualizar
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}
