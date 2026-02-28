export const Alert = ({ message, onAccepted }) => {
    const handleAcceptAlert = () => onAccepted()

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">

                <h3 className="text-lg font-semibold text-slate-900">
                    Aviso
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleAcceptAlert}
                        className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
                    >
                        Aceptar
                    </button>
                </div>

            </div>
        </div>
    )
}