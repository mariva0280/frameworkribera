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
        <div className="px-5 py-6">
            <h1 className="text-[22px] font-bold text-[#119fd3] mb-4">Crear producto</h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                {/* Nombre */}
                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="nombre">Nombre</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre del producto"
                    />
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="descripcion">Descripción</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        placeholder="Descripción del producto"
                    />
                </div>

                {/* Precio */}
                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="precio">Precio (€)</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="number"
                        id="precio"
                        name="precio"
                        step="0.01"
                        placeholder="Precio"
                    />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-[10px]">
                    <label className="font-medium" htmlFor="stock">Stock</label>
                    <input
                        className="border border-black bg-[#cde5ed] rounded px-3 py-2"
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="Cantidad en stock"
                    />
                </div>

                {/* Botones */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={handleCancelClick}
                        className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        className="text-white bg-[#0ab5ee] font-thin border-none rounded-[10px] cursor-pointer px-4 py-2"
                        type="submit"
                    >
                        Crear
                    </button>
                </div>
            </form>
        </div>
    )
}
