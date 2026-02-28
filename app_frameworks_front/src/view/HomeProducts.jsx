import { useState } from 'react';
import { logic } from '../logic';
import { useContext } from '../context';

import { ProductsList } from './components/ProductsList';
import { CreateProduct } from './components/CreateProduct';
import { UpdateProduct } from './components/UpdateProduct';

export const HomeProducts = ({ onUserLoggedOut }) => {
    const { alert, confirm } = useContext();

    const [view, setView] = useState('list');
    const [productToUpdate, setProductToUpdate] = useState(null);


    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
            onUserLoggedOut()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCreateClick = () => setView('create')

    const handleProductCreated = () => setView('list')

    const handleUpdateClick = product => {
        setProductToUpdate(product)
        setView('update')
    }

    const handleProductUpdated = () => {
        setProductToUpdate(null)
        setView('list')
    }

    const handleCancel = () => {
        setProductToUpdate(null)
        setView('list')
    }

    console.log('HomeProducts -> render')

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-8">

                {/* Header / barra superior */}
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-600">
                            💻 Programación de Aplicaciones utilizando Frameworks 💻
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            Panel de gestión de productos
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Crea, actualiza y elimina productos.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            title="Crear nuevo producto"
                            type="button"
                            onClick={handleCreateClick}
                        >
                            + Nuevo producto
                        </button>

                        <button
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            title="Salir"
                            type="button"
                            onClick={handleLogoutClick}
                        >
                            Salir
                        </button>
                    </div>
                </header>



                {view === 'list' &&
                    <ProductsList
                        alert={alert}
                        confirm={confirm}
                        onUpdateClicked={handleUpdateClick}
                    />
                }

                {view === 'create' &&
                    <CreateProduct
                        alert={alert}
                        onCancelClicked={handleCancel}
                        onProductCreated={handleProductCreated}
                    />
                }

                {view === 'update' &&
                    <UpdateProduct
                        alert={alert}
                        product={productToUpdate}
                        onCancelClicked={handleCancel}
                        onProductUpdated={handleProductUpdated}
                    />
                }
            </div>
        </div>
    )
}