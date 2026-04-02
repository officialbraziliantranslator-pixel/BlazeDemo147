// importar bibliotecas e Frameworks
import { test, expect } from '@playwright/test';

// Funcao ou metodo
test('Fluxo de reserva simples', async ({ page }) => {
    // Abre o navegador e acessa a pagina
    await page.goto('https://www.blazedemo.com/');
    // Seleciona a cidade de origem e destino, e clica no botão Find Flights
    await page.locator('select[name="fromPort"]').selectOption('São Paolo');
    await page.locator('select[name="toPort"]').selectOption('London');
    await page.locator('.btn-primary').click();

    // Transicao de Página
    // Verificar se estamos na pagina certa
    await expect(page.locator('h3')).toHaveText('Flights from São Paolo to London:');
    // Selecionar o voo desejado
    // await page.locator('.btn-small').click(); // clinar no primeiro
    await page.getByRole('row', { name: 'Choose This Flight 234 United Airlines' }).getByRole('button').click();

    // Transicao de Página
    // Verificar se estamos na pagina certa baseado em parte da url
    await expect(page).toHaveURL(/purchase\.php/); // verificar se a url contem purchase.php
    // Preencher o formulario de compra
    await page.locator('#inputName').fill('Jose'); // quando for ID, usar o #
    await page.locator('#cardType').selectOption('amex');
    // Clicar no checkbox Remember me
    await page.locator('#rememberMe').check();
    // Clicar no botão Purchase Flight
    await page.locator('.btn-primary').click();

    // Transicao de Página
    await expect(page).toHaveURL(/confirmation\.php/);
    // Verificar se a compra foi realizada com sucesso e preço
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!');
    await expect(page.getByRole('row', { name: 'Amount 555 USD' })).toBeVisible();
})