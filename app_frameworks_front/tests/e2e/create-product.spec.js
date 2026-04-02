import { test, expect } from '@playwright/test'

test('permite crear un producto', async ({ page }) => {
  const productName = `Producto E2E ${Date.now()}`

  await page.goto('/login')

  await page.getByLabel('Nombre de usuario').fill('maria')
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByText('Panel de gestión de productos')).toBeVisible()

  await page.getByRole('button', { name: '+ Nuevo producto' }).click()

  await expect(page.getByText('Crear producto')).toBeVisible()

  await page.getByLabel('Nombre').fill(productName)
  await page.getByLabel('Descripción').fill('Creado desde Playwright')
  await page.getByLabel('Precio (€)').fill('25')
  await page.getByLabel('Stock').fill('4')

  await page.getByRole('button', { name: 'Crear' }).click()

  await expect(
    page.getByRole('heading', { name: productName })
  ).toBeVisible()
})