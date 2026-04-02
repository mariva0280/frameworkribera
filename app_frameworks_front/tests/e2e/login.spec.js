import { test, expect } from '@playwright/test'

test('permite iniciar sesión con credenciales válidas', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Nombre de usuario').fill('maria')
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByText('Panel de gestión de productos')).toBeVisible()
})