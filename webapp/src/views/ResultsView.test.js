const puppeteer = require("puppeteer");

jest.setTimeout(80000);

const viewport = {  width: 1600, height: 800 };



describe("Test /results page", () => {
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

  test("Results view for user without tests created", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesor2@uniovi.es");
    await page.type("#basic_password", "Profesor2");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/");
    await page.goto("http://localhost:3000/results");

    await new Promise((r) => setTimeout(r, 2000));

    const content = await page.content();
    await expect(content.includes("No se han encontrado tests")).toBe(true);

  });
});


describe("Test /results page", () => {
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

  test("Results view for user with tests created (test without users)", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/");
    await page.goto("http://localhost:3000/results");

    await new Promise((r) => setTimeout(r, 2000));

    await page.click('#appear-long-year-education')
    const content = await page.content();
    await new Promise((r) => setTimeout(r, 1000));
    await expect(content.includes("No hay alumnos en el test")).toBe(true);

  });
});


describe("Test /results page", () => {
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

  test("Results view for user with tests created (test with users -passed,failed,in progress-)", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/");
    await page.goto("http://localhost:3000/results");

    await new Promise((r) => setTimeout(r, 2000));

    await page.click('#must-leave-cold-student')
    const content = await page.content();
    await new Promise((r) => setTimeout(r, 1000));
    await expect(content.includes("estudiante1")).toBe(true);
    await expect(content.includes("estudiante2")).toBe(true);
    await expect(content.includes("estudiante3")).toBe(true);
    await expect(content.includes("estudiante1")).toBe(true);
    await expect(content.includes("Aprobado")).toBe(true);
    await expect(content.includes("Suspenso")).toBe(true);
    await expect(content.includes("En progreso")).toBe(true);

  });
});
