import { Locator, Page } from "playwright";


export const highlightStep = async (page: Page, locator: Locator, delayMs = 500): Promise<void> => {
    const target = locator.first(); // Get the first element if there are same elements

    try {
        await target.waitFor({state: "visible", timeout: 5000});
    } catch (error) {
        return
    }

    let originalStyle = ""
    originalStyle = await target.evaluate((el) => {
        const element = el as HTMLElement
        const previousStyle = element.getAttribute("style") || ""
        element.style.outline = "2px solid red"
        element.style.backgroundColor = "yellow"
        return previousStyle
    })
    await page.waitForTimeout(delayMs)

    await target.evaluate((el, previousStyle) => {
        const element = el as HTMLElement
        if(previousStyle) {
            element.setAttribute("style", previousStyle)
        } else {
            element.removeAttribute("style")
        }
    }, originalStyle)
}