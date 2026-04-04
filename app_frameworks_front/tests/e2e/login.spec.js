import { test, expect } from '@playwright/test'

test('permite iniciar sesión con credenciales válidas', async ({ page, request }) => {
  const username = `maria${Date.now()}`
  const email = `${username}@test.com`
  const password = '123456'

  const registerResponse = await request.post('http://127.0.0.1:8080/api/auth/register', {
    data: {
      nombreUsuario: username,
      email,
      password
    }
  })

  expect(registerResponse.ok()).toBeTruthy()

  await page.goto('/login')

  await page.getByLabel('Nombre de usuario').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(
    page.getByRole('heading', { name: 'Panel de gestión de productos' })
  ).toBeVisible()
})