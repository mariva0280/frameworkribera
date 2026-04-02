import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HomeProducts } from '../../../view/HomeProducts'

// Mock de logic
vi.mock('../../../logic', () => ({
  logic: {
    logoutUser: vi.fn()
  }
}))

// Mock del contexto
const mockAlert = vi.fn()
const mockConfirm = vi.fn()

vi.mock('../../../context', () => ({
  useContext: () => ({
    alert: mockAlert,
    confirm: mockConfirm
  })
}))

// Mock de ProductsList
vi.mock('../../../view/components/ProductsList', () => ({
  ProductsList: ({ onUpdateClicked }) => (
    <div>
      <p>ProductsList mock</p>
      <button onClick={() => onUpdateClicked({ id: 1, nombre: 'Producto test' })}>
        Ir a actualizar
      </button>
    </div>
  )
}))

// Mock de CreateProduct
vi.mock('../../../view/components/CreateProduct', () => ({
  CreateProduct: ({ onCancelClicked, onProductCreated }) => (
    <div>
      <p>CreateProduct mock</p>
      <button onClick={onCancelClicked}>Cancelar creación</button>
      <button onClick={onProductCreated}>Crear producto mock</button>
    </div>
  )
}))

// Mock de UpdateProduct
vi.mock('../../../view/components/UpdateProduct', () => ({
  UpdateProduct: ({ onCancelClicked, onProductUpdated }) => (
    <div>
      <p>UpdateProduct mock</p>
      <button onClick={onCancelClicked}>Cancelar actualización</button>
      <button onClick={onProductUpdated}>Actualizar producto mock</button>
    </div>
  )
}))

import { logic } from '../../../logic'

describe('HomeProducts integration', () => {
  const onUserLoggedOut = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders ProductsList by default', () => {
    render(<HomeProducts onUserLoggedOut={onUserLoggedOut} />)

    expect(screen.getByText('ProductsList mock')).toBeInTheDocument()
  })

  it('shows CreateProduct when clicking "+ Nuevo producto"', async () => {
    const user = userEvent.setup()

    render(<HomeProducts onUserLoggedOut={onUserLoggedOut} />)

    await user.click(screen.getByRole('button', { name: '+ Nuevo producto' }))

    expect(screen.getByText('CreateProduct mock')).toBeInTheDocument()
  })

  it('returns to ProductsList when cancelling create view', async () => {
    const user = userEvent.setup()

    render(<HomeProducts onUserLoggedOut={onUserLoggedOut} />)

    await user.click(screen.getByRole('button', { name: '+ Nuevo producto' }))
    await user.click(screen.getByText('Cancelar creación'))

    expect(screen.getByText('ProductsList mock')).toBeInTheDocument()
  })

  it('shows UpdateProduct when update is triggered from ProductsList', async () => {
    const user = userEvent.setup()

    render(<HomeProducts onUserLoggedOut={onUserLoggedOut} />)

    await user.click(screen.getByText('Ir a actualizar'))

    expect(screen.getByText('UpdateProduct mock')).toBeInTheDocument()
  })

  it('calls logoutUser and onUserLoggedOut when clicking "Salir"', async () => {
    const user = userEvent.setup()

    render(<HomeProducts onUserLoggedOut={onUserLoggedOut} />)

    await user.click(screen.getByRole('button', { name: 'Salir' }))

    expect(logic.logoutUser).toHaveBeenCalledTimes(1)
    expect(onUserLoggedOut).toHaveBeenCalledTimes(1)
  })
})