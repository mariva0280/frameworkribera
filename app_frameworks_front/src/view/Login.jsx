import { logic } from '../logic'
import { useContext } from '../context'

export const Login = ({ onRegisterClicked, onUserLoggedIn }) => {
    const { alert } = useContext()

    const handleRegisterClick = () => onRegisterClicked()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nombreUsuario = form.nombreUsuario.value
        const password = form.password.value

        try {
            logic.loginUser(nombreUsuario, password)

                .then(() => {
                    form.reset()

                    onUserLoggedIn()
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

    console.log('Login -> render')

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto w-full max-w-md">
                {/* Encabezado */}
                <p className="text-center text-sm font-medium text-slate-600">
                    💻 Programación de Aplicaciones utilizando Frameworks 💻
                </p>

                {/* Card */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Iniciar sesión
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Accede con tu nombre de usuario y contraseña.
                    </p>

                    <form className="mt-6 space-y-5" onSubmit={handleLoginSubmit}>
                        {/* Usuario */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-semibold text-slate-800"
                                htmlFor="nombreUsuario"
                            >
                                Nombre de usuario
                            </label>

                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                                type="text"
                                name="nombreUsuario"
                                id="nombreUsuario"
                                placeholder="Tu nombre de usuario"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-semibold text-slate-800"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <input
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Tu password"
                            />
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
                                href="#"
                                onClick={handleRegisterClick}
                            >
                                ¿No tienes cuenta? Regístrate
                            </a>

                            <button
                                className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                {/* Pie */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    Interfaz mejorada con utilidades de Tailwind (layout, tipografía, colores, spacing y alineación).
                </p>
            </div>
        </div>
    )
}
