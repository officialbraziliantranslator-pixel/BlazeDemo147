//Importacoes / Bibliotecas / Frameworks
import { test, expect } from '@playwright/test';

//Funcao ou metodo
test('Fluxo de reserva com Sucesso', async ({ page }) => {
  await page.goto('https://www.blazedemo.com/');
  await page.locator('select[name="fromPort"]').selectOption('São Paolo');
  await page.locator('select[name="toPort"]').selectOption('London');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await expect(page.getByRole('heading')).toContainText('Flights from São Paolo to London:');
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Jose');
  await page.locator('#cardType').selectOption('amex');
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('button', { name: 'Purchase Flight' }).click();
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!');
  await expect(page.locator('tbody')).toContainText('555 USD');
});