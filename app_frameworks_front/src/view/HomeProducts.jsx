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
        <div className="px-5 py-6">

            <i className="text-2xl block mb-2">💻 Programación de Aplicaciones utilizando Frameworks 💻</i>

            <div className="mt-2 flex justify-between items-center ">

                <button
                    className="font-bold rounded-[10px] w-20 h-15 text-center cursor-pointer text-white bg-[#0ab5ee] transform transition-transform duration-210 hover:scale-110"
                    title="Crear nuevo producto"
                    type="button"
                    onClick={handleCreateClick}
                >
                    + New
                </button>

                <button
                    className="font-bold text-white bg-[#0ab5ee] border-none rounded-[10px] cursor-pointer px-4 py-2 transform transition-transform duration-210 hover:scale-110"
                    title="Salir"
                    type="button"
                    onClick={handleLogoutClick}
                >
                    Salir
                </button>
            </div>

            

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
    )
}