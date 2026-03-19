import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CsvRow, readCsv } from './utils/readCsv';

test.describe("Login tests", () => {
    test("Test login thành công", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        await loginPage.isLoginSuccessfull()
    })

    test.describe("Login test with data provider", () => {
        const loginDatas: CsvRow[] = readCsv("data/login_data.csv")

        for (const testData of loginDatas) {
            const title = `Login with username=${testData.username} => ${testData.expectedResult}`
            test(title, async({page}) => {
                const loginPage = new LoginPage(page)
                await loginPage.login(testData.username, testData.password)

                if(testData.expectedResult === 'sucess') {
                    await loginPage.isLoginSuccessfull()
                } else {
                    await expect(await loginPage.isLoginSuccessfull()).toBe(false)
                }
            })
        }
    })
})