import { test, expect } from '@playwright/test';

const email = process.env.email;
const password = process.env.password;

test('Handle error for incorrect password/email', async ({ page }) => {
    await page.goto('https://app.int.devo.com/login');
    //Send email keys.
    await page.getByLabel('Email').fill('test@test.com');
    //Send password
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Invalid email or password.')).toBeVisible();
    await page.getByRole('banner').click();
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('User able to login', async ({ page }) => {
    await page.goto('https://app.int.devo.com/login');
    //Send email keys.
    await page.getByLabel('Email').fill(email);
    //Send password
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByLabel('Log out')).toBeVisible();
  });