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
        <div className="mt-4">

            <h2 className="text-[22px] font-bold text-[#119fd3] mb-4">
                Actualizar producto
            </h2>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="nombre">Nombre</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="text"
                        name="nombre"
                        id="nombre"
                        defaultValue={product.nombre}
                    />
                </div>

                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="descripcion">Descripción</label>
                    <textarea
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        name="descripcion"
                        id="descripcion"
                        defaultValue={product.descripcion}
                    ></textarea>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="precio">Precio</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="number"
                        step="0.01"
                        name="precio"
                        id="precio"
                        defaultValue={product.precio}
                    />
                </div>

                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="stock">Stock</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="number"
                        name="stock"
                        id="stock"
                        defaultValue={product.stock}
                    />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition"
                        type="button"
                        onClick={onCancelClicked}
                    >
                        Cancelar
                    </button>

                    <button
                        className="text-white bg-[#0ab5ee] font-thin border-none rounded-[10px] cursor-pointer px-4 py-2"
                        type="submit"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    )
}
