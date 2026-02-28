export const Alert = ({ message, onAccepted }) => {
    const handleAcceptAlert = () => onAccepted()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">

            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg animate-popIn">

                <h3 className="text-lg font-semibold text-slate-900">
                    Aviso
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleAcceptAlert}
                        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 duration-200 active:scale-[0.98]"
                    >
                        Aceptar
                    </button>
                </div>

            </div>
        </div>
    )
}