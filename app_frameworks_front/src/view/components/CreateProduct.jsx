import { logic } from '../../logic'

export const CreateProduct = ({ alert, onCancelClicked, onProductCreated }) => {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nombre = form.nombre.value
        const descripcion = form.descripcion.value
        const precio = form.precio.value
        const stock = form.stock.value

        try {
            logic.registerProduct(nombre, descripcion, precio, stock)
                .then(() => {
                    form.reset()
                    onProductCreated()
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

    const handleCancelClick = () => onCancelClicked()

    console.log("CreateProduct -> render")

    return (
        <section className="mx-auto mt-6 max-w-3xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                            Crear producto
                        </h1>
                        <p className="text-sm text-slate-600">
                            Completa los datos para añadir un nuevo producto al catálogo.
                        </p>
                    </div>
                </header>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>

                    {/* Grid de campos: 1 columna móvil / 2 columnas tablet+ */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Nombre */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre del producto"
                            />
                        </div>

                        {/* Precio */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="precio">
                                Precio (€)
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                                type="number"
                                id="precio"
                                name="precio"
                                step="0.01"
                                placeholder="Precio"
                            />
                        </div>

                        {/* Descripción ocupa dos columnas */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="descripcion">
                                Descripción
                            </label>
                            <textarea
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                                id="descripcion"
                                name="descripcion"
                                rows="3"
                                placeholder="Descripción del producto"
                            />
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800" htmlFor="stock">
                                Stock
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                                type="number"
                                id="stock"
                                name="stock"
                                placeholder="Cantidad en stock"
                            />
                        </div>

                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
                        >
                            Cancelar
                        </button>

                        <button
                            className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                            type="submit"
                        >
                            Crear
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}
