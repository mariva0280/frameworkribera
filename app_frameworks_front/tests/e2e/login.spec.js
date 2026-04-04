import { test, expect } from '@playwright/test'

test('permite iniciar sesión con credenciales válidas', async ({ page }) => {
  const username = `maria${Date.now()}`
  const email = `${username}@test.com`
  const password = '123456'

  await page.goto('/register')

  await page.getByLabel('Nombre de usuario').fill(username)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)

  await page.getByRole('button', { name: /registr/i }).click()

  await page.waitForURL('**/login')

  await page.getByLabel('Nombre de usuario').fill(username)
  await page.getByLabel('Password').fill(password)

  await page.getByRole('button', { name: 'Login' }).click()

  await page.waitForURL('**/')

  await expect(
    page.getByRole('heading', { name: 'Panel de gestión de productos' })
  ).toBeVisible()
})