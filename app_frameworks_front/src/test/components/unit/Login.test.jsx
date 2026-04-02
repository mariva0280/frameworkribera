import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Login } from '../../../view/Login'


// Mock del módulo logic
vi.mock('../../../logic', () => ({
  logic: {
    loginUser: vi.fn()
  }
}))

// Mock del contexto
const mockAlert = vi.fn()

vi.mock('../../../context', () => ({
  useContext: () => ({
    alert: mockAlert
  })
}))

import { logic } from '../../../logic'

describe('Login component', () => {
  const onRegisterClicked = vi.fn()
  const onUserLoggedIn = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
    render(
      <Login
        onRegisterClicked={onRegisterClicked}
        onUserLoggedIn={onUserLoggedIn}
      />
    )

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('calls onRegisterClicked when register link is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Login
        onRegisterClicked={onRegisterClicked}
        onUserLoggedIn={onUserLoggedIn}
      />
    )

    await user.click(screen.getByText('¿No tienes cuenta? Regístrate'))

    expect(onRegisterClicked).toHaveBeenCalledTimes(1)
  })

  it('calls loginUser and onUserLoggedIn when form is submitted successfully', async () => {
    const user = userEvent.setup()

    logic.loginUser.mockResolvedValueOnce()

    render(
      <Login
        onRegisterClicked={onRegisterClicked}
        onUserLoggedIn={onUserLoggedIn}
      />
    )

    await user.type(screen.getByLabelText('Nombre de usuario'), 'maria')
    await user.type(screen.getByLabelText('Password'), '123456')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(logic.loginUser).toHaveBeenCalledWith('maria', '123456')
      expect(onUserLoggedIn).toHaveBeenCalledTimes(1)
    })
  })

  it('calls alert when login fails', async () => {
    const user = userEvent.setup()

    logic.loginUser.mockRejectedValueOnce(new Error('Credenciales incorrectas'))

    render(
      <Login
        onRegisterClicked={onRegisterClicked}
        onUserLoggedIn={onUserLoggedIn}
      />
    )

    await user.type(screen.getByLabelText('Nombre de usuario'), 'maria')
    await user.type(screen.getByLabelText('Password'), 'mal')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Credenciales incorrectas')
    })
  })

  it('handles empty response from login service', async () => {
  const user = userEvent.setup()

  // simulamos respuesta vacía (caso raro)
  logic.loginUser.mockResolvedValueOnce(undefined)

  render(
    <Login
      onRegisterClicked={onRegisterClicked}
      onUserLoggedIn={onUserLoggedIn}
    />
  )

  await user.type(screen.getByLabelText('Nombre de usuario'), 'maria')
  await user.type(screen.getByLabelText('Password'), '123456')
  await user.click(screen.getByRole('button', { name: 'Login' }))

  await waitFor(() => {
    // sigue funcionando aunque la respuesta sea vacía
    expect(onUserLoggedIn).toHaveBeenCalled()
  })
})
})