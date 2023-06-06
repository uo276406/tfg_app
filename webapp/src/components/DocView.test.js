const puppeteer = require("puppeteer");

jest.setTimeout(300000);

const viewport = {  width: 1600, height: 800 };

describe("Test /doc page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/doc");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Home page is shown for anonymous users", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    let content = await page.content();
    
    await expect(content.includes("Documentación API")).toBe(true);
    await expect(content.includes("ReDoc")).toBe(true);
    await expect(content.includes("Swagger UI")).toBe(true);

  });
});