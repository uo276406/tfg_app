const puppeteer = require("puppeteer");

jest.setTimeout(300000);

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

    await page.goto("http://localhost:3000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Home page is shown for anonymous users", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    let content = await page.content();
    
    await expect(content.includes("Keywords App")).toBe(true);
    await expect(content.includes("Iniciar sesión")).toBe(true);
  });
});


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

  test("Home page shown for authenticated users", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    const content = await page.content();
    await expect(content.includes("Resultados")).toBe(true);
    await expect(content.includes("Crear examen")).toBe(true);
  });
});
