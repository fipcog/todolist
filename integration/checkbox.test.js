describe('Checkbox', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-checkbox--checkbox-story&viewMode=story',
            {
                waitUntil: "networkidle2",
                timeout: 50000
            });

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('Checkbox active', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-checkbox--checkbox-active-story&viewMode=story',
            {
                waitUntil: "networkidle2",
                timeout: 50000
            });

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});