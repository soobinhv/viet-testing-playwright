import { Locator, Page } from "playwright";
import { join } from "node:path";
export class MyInfoPage {
    readonly page: Page

    readonly avatarWrapper: Locator
    readonly uploadBtn: Locator
    readonly fileInput: Locator

    constructor(page: Page) {
        this.page = page

        this.avatarWrapper = page.locator("//div[@class='orangehrm-edit-employee-image-wrapper']")
        this.uploadBtn = page.locator("button.employee-image-action")
        this.fileInput = page.locator("input[type='file']")
    }

    async uploadAvatar(): Promise<void> {
        await this.avatarWrapper.waitFor({state: 'visible', timeout: 50000})
        await this.avatarWrapper.click()

        await this.uploadBtn.waitFor({state: 'visible', timeout: 20000})
        await this.uploadBtn.click

        const filePath = join(__dirname, "..", "tests", "data", "testing11.jpg")
        await this.fileInput.setInputFiles(filePath)
        await this.page.waitForTimeout(10000)
    }
}