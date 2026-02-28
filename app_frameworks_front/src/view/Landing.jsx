export const Landing = ({ onRegisterClicked, onLoginClicked }) => {

    const handleRegisterClick = () => onRegisterClicked()

    const handleLoginClick = () => onLoginClicked()

    console.log('Landing -> render')

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto w-full max-w-3xl">
                <p className="text-center text-sm font-medium text-slate-600">
                    💻 Programación de Aplicaciones utilizando Frameworks 💻
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Gestión de Productos
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Desde aquí puedes registrarte o iniciar sesión para gestionar tus productos. ¡Bienvenido a la aplicación de gestión de productos!
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <a className="inline-flex items-center justify-center rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white
                        shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-sky-500 focus:ring-offset-2"
                        href="#" 
                        onClick={handleRegisterClick}>
                            Crear cuenta
                        </a>
                    
                        <a className="inline-flex items-center justify-center rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white
                        shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-sky-500 focus:ring-offset-2" 
                        href="#" 
                        onClick={handleLoginClick}>
                            Iniciar Sesión
                        </a>

                    </div>

                </div>
                <p className="mt-8 text-center text-xs text-slate-500">
                    Proyecto académico - Mejora de interfaz de usuario con utilidades Tailwind CSS.
                </p>
            </div>
        </div>
    )
}