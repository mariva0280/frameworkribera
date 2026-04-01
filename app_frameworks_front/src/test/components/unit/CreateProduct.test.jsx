import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CreateProduct } from '../../../view/components/CreateProduct'

// Mock del logic
vi.mock('../../../logic', () => ({
  logic: {
    registerProduct: vi.fn()
  }
}))

import { logic } from '../../../logic'

describe('CreateProduct component', () => {
  const mockAlert = vi.fn()
  const onCancelClicked = vi.fn()
  const onProductCreated = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form correctly', () => {
    render(
      <CreateProduct
        alert={mockAlert}
        onCancelClicked={onCancelClicked}
        onProductCreated={onProductCreated}
      />
    )

    expect(screen.getByText('Crear producto')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Precio (€)')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
    expect(screen.getByLabelText('Stock')).toBeInTheDocument()
  })

  it('calls onCancelClicked when cancel button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <CreateProduct
        alert={mockAlert}
        onCancelClicked={onCancelClicked}
        onProductCreated={onProductCreated}
      />
    )

    await user.click(screen.getByText('Cancelar'))

    expect(onCancelClicked).toHaveBeenCalledTimes(1)
  })

  it('calls registerProduct and onProductCreated on successful submit', async () => {
    const user = userEvent.setup()

    logic.registerProduct.mockResolvedValueOnce()

    render(
      <CreateProduct
        alert={mockAlert}
        onCancelClicked={onCancelClicked}
        onProductCreated={onProductCreated}
      />
    )

    await user.type(screen.getByLabelText('Nombre'), 'Producto test')
    await user.type(screen.getByLabelText('Descripción'), 'Descripción test')
    await user.type(screen.getByLabelText('Precio (€)'), '10')
    await user.type(screen.getByLabelText('Stock'), '5')

    await user.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() => {
      expect(logic.registerProduct).toHaveBeenCalled()
      expect(onProductCreated).toHaveBeenCalledTimes(1)
    })
  })

  it('calls alert when product creation fails', async () => {
    const user = userEvent.setup()

    logic.registerProduct.mockRejectedValueOnce(new Error('Error al crear'))

    render(
      <CreateProduct
        alert={mockAlert}
        onCancelClicked={onCancelClicked}
        onProductCreated={onProductCreated}
      />
    )

    await user.type(screen.getByLabelText('Nombre'), 'Producto test')
    await user.type(screen.getByLabelText('Descripción'), 'Descripción test')
    await user.type(screen.getByLabelText('Precio (€)'), '10')
    await user.type(screen.getByLabelText('Stock'), '5')

    await user.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Error al crear')
    })
  })
})