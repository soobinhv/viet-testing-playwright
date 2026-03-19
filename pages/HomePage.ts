import { Locator, Page } from "playwright/test";

export class HomePage {
    readonly page: Page

    readonly sidebarMenuNames: Locator

    constructor(page: Page) {
        this.page = page
        this.sidebarMenuNames = page.locator("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name' and text()='Admin']")
    }

    async getSidebarMenuNames(): Promise<string[]> {
        const count = await this.sidebarMenuNames.count()

        const menuNames: string[] = []
        for(let i=0; i < count; i++) {
            const name = await this.sidebarMenuNames.nth(i).textContent()

            if (name) {
                menuNames.push(name.trim())
            }
        }
        return menuNames

    }
}