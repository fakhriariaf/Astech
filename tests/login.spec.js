import { test, expect } from '@playwright/test';
import loginActions from '../tests/pom/object/loginAction';
import fs from 'fs';
import path from 'path';

test.describe('Login Test', () => {
  let login;

  const screenshotDir = path.join(__dirname, 'screenshots');
  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  test.beforeEach(async ({ page }) => {
    login = new loginActions(page);
    await login.goto();
  });

  test('TC-006: Verifikasi Login dengan Kredensial yang Valid', async ({ page }) => {
    await login.validLogin();
  });

  test('TC-007: Verifikasi Login dengan Kredensial yang Tidak Valid', async ({ page }) => {
    await login.invalidLogin('fakhriaf16@gmail.com', '1234567', 'Wrong Password Entered');
  });

  test('TC-008: Verifikasi Login dengan Email dan Kata Sandi yang Kosong', async ({ page }) => {
    await login.invalidLoginBothNull('', '', [
        'Username belum diisi',
        'Password belum diisi'
    ]);
  });

  test('TC-009: Verifikasi Login dengan Format Email yang Tidak Valid', async ({ page }) => {
    await login.invalidLogin('fakhri.dargawireja2gmail.com', '1234567', 'Email / Username tidak ditemukan');
  });

  test.afterEach(async ({ page }, testInfo) => {
    const status = testInfo.status === 'failed' ? 'fail' : 'pass';
    const title = testInfo.title.match(/TC-\d{3}/)?.[0] || 'TC-000';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const caseDir = path.join(screenshotDir, title);
  
    if (!fs.existsSync(caseDir)) {
      fs.mkdirSync(caseDir, { recursive: true });
    }
  
    const screenshotName = `${status}-${timestamp}.png`;
    const screenshotPath = path.join(caseDir, screenshotName);
    await page.screenshot({ path: screenshotPath });
  });
  
});
