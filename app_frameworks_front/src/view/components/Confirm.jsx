export const Confirm = ({ message, onCancelled, onAccepted }) => {
    const handleCancelConfirm = () => onCancelled()

    const handleAcceptConfirm = () => onAccepted()

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">

                <h3 className="text-lg font-semibold text-slate-900">
                    Confirmación
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex gap-3 justify-end">

                    <button
                        onClick={handleCancelConfirm}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleAcceptConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                    >
                        Confirmar
                    </button>

                </div>

            </div>
        </div>
    )
}