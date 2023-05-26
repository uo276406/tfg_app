const puppeteer = require("puppeteer");

jest.setTimeout(60000);

const viewport = { width: 1600, height: 800 };

describe("Test /login page", () => {
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

  test("Right credentials", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/");
  });
});


describe("Test /login page", () => {
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

  test("Bad email but correct password", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_email", "profesorNotFound@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/login");
    const content = await page.content();
    await expect(content.includes("Credenciales incorrectas")).toBe(true);
  });
});


describe("Test /login page", () => {
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
  
    test("Bad password but correct email", async () => {
      await new Promise((r) => setTimeout(r, 2000));
  
      await page.type("#basic_email", "profesor1@uniovi.es");
      await page.type("#basic_password", "Profesor1Mal");
      await page.click('button[type="submit"]');
  
      await new Promise((r) => setTimeout(r, 2000));
  
      await expect(page.url()).toBe("http://localhost:3000/login");
      const content = await page.content();
      await expect(content.includes("Credenciales incorrectas")).toBe(true);
    });
  });
