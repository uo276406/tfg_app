const puppeteer = require("puppeteer");

jest.setTimeout(80000);

const viewport = {  width: 1600, height: 800 };



describe("Test / page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/login");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Profile view for a registered user", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/");
    await page.goto("http://localhost:3000/profile");

    await new Promise((r) => setTimeout(r, 2000));

    const content = await page.content();
    await expect(content.includes("Datos personales")).toBe(true);
    await expect(content.includes("profesor1")).toBe(true);

  });
});
