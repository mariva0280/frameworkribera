import { test, expect } from '@playwright/test'

test('permite crear un producto', async ({ page, request }) => {
  const username = `maria${Date.now()}`
  const email = `${username}@test.com`
  const password = '123456'
  const productName = `Producto E2E ${Date.now()}`

  const registerResponse = await request.post('http://localhost:8080/api/auth/register', {
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
  ).toBeVisible({ timeout: 10000 })

  await page.getByRole('button', { name: '+ Nuevo producto' }).click()

  await expect(
    page.getByRole('heading', { name: 'Crear producto' })
  ).toBeVisible()

  await page.getByLabel('Nombre').fill(productName)
  await page.getByLabel('Descripción').fill('Creado desde Playwright')
  await page.getByLabel('Precio (€)').fill('25')
  await page.getByLabel('Stock').fill('4')

  await page.getByRole('button', { name: 'Crear' }).click()

  await expect(
    page.getByRole('heading', { name: productName })
  ).toBeVisible()
})