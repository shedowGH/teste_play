import { test, expect, Page } from '@playwright/test';

// ==============================================================================
// EXERCÍCIO 13 — Função de Reutilização de Código
// ==============================================================================
/**
 * Navega para a página de Web Inputs da aplicação de treino.
 * @param page Instância do Playwright Page
 */
async function acessarPagina(page: Page) {
  await page.goto('https://practice.expandtesting.com/inputs');
}

test.describe('Atividade Prática — Testes de Formulário com Playwright', () => {

  test("deve abrir a página de Web Inputs", async ({ page }) => {
    await acessarPagina(page);

    // Validar título principal
    await expect(page.getByRole('heading', {
      name: 'Web inputs page for Automation Testing Practice'
    })).toBeVisible();

    // Validar botão Display Inputs
    await expect(page.getByRole('button', {
      name: 'Display Inputs'
    })).toBeVisible();

    // Validar botão Clear Inputs
    await expect(page.getByRole('button', {
      name: 'Clear Inputs'
    })).toBeVisible();
  });

  test("deve apresentar todos os campos de entrada", async ({ page }) => {
    await acessarPagina(page);

    await expect(page.getByLabel('Input: Number')).toBeVisible();
    await expect(page.getByLabel('Input: Text')).toBeVisible();
    await expect(page.getByLabel('Input: Password')).toBeVisible();
    await expect(page.getByLabel('Input: Date')).toBeVisible();
  });

  test("deve exibir o texto informado", async ({ page }) => {
    await acessarPagina(page);

    await page.getByLabel('Input: Text').fill('Teste com Playwright');
    await page.getByRole('button', { name: 'Display Inputs' }).click();

    await expect(page.getByText('Teste com Playwright')).toBeVisible();
  });

  test("deve exibir o número informado", async ({ page }) => {
    await acessarPagina(page);

    await page.getByLabel('Input: Number').fill('2026');
    await page.getByRole('button', { name: 'Display Inputs' }).click();

    await expect(page.getByText('2026')).toBeVisible();
  });

  test("deve preencher e exibir múltiplos campos", async ({ page }) => {
    await acessarPagina(page);

    await page.getByLabel('Input: Number').fill('16');
    await page.getByLabel('Input: Text').fill('SENAI');
    await page.getByLabel('Input: Password').fill('teste123');
    // Para campos de data, o formato esperado pelo input HTML5 costuma ser YYYY-MM-DD
    await page.getByLabel('Input: Date').fill('2026-09-16');

    await page.getByRole('button', { name: 'Display Inputs' }).click();

    // Validações
    await expect(page.getByText('16')).toBeVisible();
    await expect(page.getByText('SENAI')).toBeVisible();
    await expect(page.getByText('teste123')).toBeVisible();
    await expect(page.getByText('2026-09-16')).toBeVisible();
  });

  test("deve limpar os campos preenchidos", async ({ page }) => {
    await acessarPagina(page);

    // Preencher campos
    await page.getByLabel('Input: Number').fill('100');
    await page.getByLabel('Input: Text').fill('Texto Limpeza');
    
    // Clicar em Clear Inputs
    await page.getByRole('button', { name: 'Clear Inputs' }).click();

    // Verificar se os inputs voltaram a ficar vazios
    await expect(page.getByLabel('Input: Number')).toHaveValue('');
    await expect(page.getByLabel('Input: Text')).toHaveValue('');
  });

  test("deve preencher exibir e limpar os dados", async ({ page }) => {
    await acessarPagina(page);

    // 1. Preencher 3 campos
    await page.getByLabel('Input: Number').fill('42');
    await page.getByLabel('Input: Text').fill('QA Engineer');
    await page.getByLabel('Input: Password').fill('senha123');

    // 2. Clicar em Display Inputs e verificar
    await page.getByRole('button', { name: 'Display Inputs' }).click();
    await expect(page.getByText('42')).toBeVisible();
    await expect(page.getByText('QA Engineer')).toBeVisible();

    // 3. Clicar em Clear Inputs e verificar se limpou os campos
    await page.getByRole('button', { name: 'Clear Inputs' }).click();
    await expect(page.getByLabel('Input: Number')).toHaveValue('');
    await expect(page.getByLabel('Input: Text')).toHaveValue('');
    await expect(page.getByLabel('Input: Password')).toHaveValue('');
  });

  test("deve exibir texto simples: Playwright", async ({ page }) => {
    await acessarPagina(page);
    await page.getByLabel('Input: Text').fill('Playwright');
    await page.getByRole('button', { name: 'Display Inputs' }).click();
    await expect(page.getByText('Playwright')).toBeVisible();
  });

  test("deve exibir texto com ano: Teste automatizado 2026", async ({ page }) => {
    await acessarPagina(page);
    await page.getByLabel('Input: Text').fill('Teste automatizado 2026');
    await page.getByRole('button', { name: 'Display Inputs' }).click();
    await expect(page.getByText('Teste automatizado 2026')).toBeVisible();
  });

  test("deve exibir texto com hifen: SENAI - Desenvolvimento de Sistemas", async ({ page }) => {
    await acessarPagina(page);
    await page.getByLabel('Input: Text').fill('SENAI - Desenvolvimento de Sistemas');
    await page.getByRole('button', { name: 'Display Inputs' }).click();
    await expect(page.getByText('SENAI - Desenvolvimento de Sistemas')).toBeVisible();
  });

  test("deve aceitar e exibir caracteres especiais no campo de texto", async ({ page }) => {
    await acessarPagina(page);
    const textoEspecial = 'Teste @#$% 123 !?';
    
    await page.getByLabel('Input: Text').fill(textoEspecial);
    await page.getByRole('button', { name: 'Display Inputs' }).click();

    await expect(page.getByText(textoEspecial)).toBeVisible();
  });

  test("deve tratar o envio com campos vazios", async ({ page }) => {
    await acessarPagina(page);

    await page.getByRole('button', { name: 'Display Inputs' }).click();

    // Validação automatizada: garante que os campos permanecem vazios após o clique
    await expect(page.getByLabel('Input: Text')).toHaveValue('');
    await expect(page.getByLabel('Input: Number')).toHaveValue('');
  });

  test("deve validar o texto do SENAI (exemplo de teste corrigido)", async ({ page }) => {
    await acessarPagina(page);

    await page.getByLabel('Input: Text').fill('SENAI');
    await page.getByRole('button', { name: 'Display Inputs' }).click();

    // Teste corrigido para 'SENAI' (anteriormente alterado para 'SENAC' para falhar)
    await expect(page.getByText('SENAI')).toBeVisible();
  });

  test("deve verificar se o campo de senha possui o atributo de segurança correto", async ({ page }) => {
    await acessarPagina(page);

    const campoSenha = page.getByLabel('Input: Password');
    await expect(campoSenha).toHaveAttribute('type', 'password');
  });

  test("deve executar o fluxo completo do formulário", async ({ page }) => {
    // 1. Abrir a página
    await acessarPagina(page);

    // 2. Verificar os elementos principais
    await expect(page.getByRole('heading', { name: 'Web inputs page for Automation Testing Practice' })).toBeVisible();
    await expect(page.getByLabel('Input: Number')).toBeVisible();
    await expect(page.getByLabel('Input: Text')).toBeVisible();
    await expect(page.getByLabel('Input: Password')).toBeVisible();
    await expect(page.getByLabel('Input: Date')).toBeVisible();

    // 3. Preencher Number
    await page.getByLabel('Input: Number').fill('99');

    // 4. Preencher Text
    await page.getByLabel('Input: Text').fill('Automação Completa');

    // 5. Preencher Password
    await page.getByLabel('Input: Password').fill('SenhaForte123');

    // 6. Preencher Date
    await page.getByLabel('Input: Date').fill('2026-12-31');

    // 7. Clicar em Display Inputs
    await page.getByRole('button', { name: 'Display Inputs' }).click();

    // 8. Validar os dados exibidos
    await expect(page.getByText('99')).toBeVisible();
    await expect(page.getByText('Automação Completa')).toBeVisible();
    await expect(page.getByText('SenhaForte123')).toBeVisible();
    await expect(page.getByText('2026-12-31')).toBeVisible();

    // 9. Limpar os campos
    await page.getByRole('button', { name: 'Clear Inputs' }).click();

    // 10. Validar que foram limpos
    await expect(page.getByLabel('Input: Number')).toHaveValue('');
    await expect(page.getByLabel('Input: Text')).toHaveValue('');
    await expect(page.getByLabel('Input: Password')).toHaveValue('');
    await expect(page.getByLabel('Input: Date')).toHaveValue('');
  });

});