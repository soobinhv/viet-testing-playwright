import test, {expect} from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs'

test.describe("get by role test", () => {
    test("Demo get by role", async ({page}) => {
        const htmlPath = path.join(__dirname, "fixtures", "getbyrole-demo.html")
        const htmlContent = fs.readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent)

        const heading1 = page.getByRole("heading", {
            name: "Test getByRole - Playwright Demo",
            level: 1,
            exact: true
        })
        await expect(heading1).toBeVisible()

        const heading2 = page.getByRole("heading", {
            name: "Heading Level 2",
            level: 2,
            exact: true
        })
        await expect(heading2).toBeVisible()

        const homeLink = page.getByRole("link", {name: "Trang chủ"})
        await expect(homeLink).toBeVisible()

        const form = page.getByRole("form")
        await expect(form).toBeVisible()

        const usernameInput = page.getByRole("textbox", {name: "Username input field"})
        await expect(usernameInput).toBeVisible()

        const messageTextarea = page.getByRole("textbox", {name: "Message textarea"})
        await expect(messageTextarea).toBeVisible()

        const agreeCheckbox = page.getByRole("checkbox", {name: "Agree to terms checkbox"})
        await agreeCheckbox.check()
        await page.waitForTimeout(3000)
        await expect(agreeCheckbox).toBeChecked()

        // const maleRadio = page.getByRole("radio", {name: "Male gender option"})
        // await maleRadio.check()
        // await expect(maleRadio).toBeChecked()

        // const femaleRadio = page.getByRole("radio", {name: "Female gender option"})
        // await expect(femaleRadio).not.toBeChecked()

        const countrySelect = page.getByRole("combobox", {name: "Country selection"})
        await countrySelect.selectOption("vn")
        await expect(countrySelect).toHaveValue("vn")

        const submitBtn = page.getByRole("button", {name: "Submit form button"})
        await expect(submitBtn).toBeVisible()

        const table = page.getByRole("table")
        const row = page.getByRole("row")
        await expect(row).toHaveCount(4) // 1 header + 3 data
    })
})