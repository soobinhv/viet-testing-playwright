import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe("Login tests", () => {
    test("Test login thành công", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        await loginPage.isLoginSuccessfull()
    })
})