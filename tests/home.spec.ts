import test, { expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"

test.describe("Home page tests", () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.login("Admin", "admin123")
        await loginPage.isLoginSuccessfull()
        await page.waitForTimeout(3000)
    })

    test("Verify sidebar menu names", async ({page}) => {
        const homePage = new HomePage(page)
        const menuNames = await homePage.getSidebarMenuNames()

        // kiểm tra số lượng menu
        await test.step("Verify menu count", async () => {
            expect(menuNames.length).toBeGreaterThan(0)
        })

        // kiểm tra menu Admin có exist
        await test.step("Verify Admin menu exists", async () => {
            expect(menuNames).toContain("Admin")
        })
    })
})