import { Locator, Page } from "playwright/test";

export class LoginPage {
    // define locators
    readonly page: Page // Page object helps us to interact with the web page
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.locator("input[name='username']")
        this.passwordInput = page.locator("input[name='password']")
        this.loginButton = page.locator("button[type='submit']")
    }

    // define steps
    async login(username: string, password: string): Promise<void> {
        // Wait for loading page successfully
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {
            waitUntil: 'domcontentloaded', // wait until the DOM content is loaded
            timeout: 30000 // set a timeout of 30 seconds
        })

        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    // define hàm cho test cases
    // if login successfully, endpoint will be dashboard page
    async isLoginSuccessfull(): Promise<boolean> {
        try {
            await this.page.waitForURL(/.*dashboard/, {timeout: 4000})
            return true
        } catch (error) {
            return false
        }    
    }
}