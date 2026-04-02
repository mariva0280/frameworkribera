import { test, expect } from '@playwright/test'

test('muestra la landing correctamente', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Gestión de Productos' })
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'Crear cuenta' })
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'Iniciar Sesión' })
  ).toBeVisible()
})