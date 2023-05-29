const puppeteer = require("puppeteer");

jest.setTimeout(100000);

const viewport = {  width: 1600, height: 800 };

describe("Test /signin page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/signin");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Email existing in database", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_name", "ProfesorTest");
    await page.type("#basic_surname1", "ProfesorTest");
    await page.type("#basic_surname2", "ProfesorTest");
    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Profesor1");
    await page.type("#basic_passwordConfirm", "Profesor1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/signin");
    const content = await page.content();
    await expect(content.includes("Usuario con correo existente")).toBe(true);
  });
});


describe("Test /signin page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/signin");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Email valid, password without mayus", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_name", "ProfesorTest");
    await page.type("#basic_surname1", "ProfesorTest");
    await page.type("#basic_surname2", "ProfesorTest");
    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "test12");
    await page.type("#basic_passwordConfirm", "test12");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/signin");
    const content = await page.content();
    await expect(content.includes("La contraseña debe tener al menos una letra minúscula, una mayúscula y un número")).toBe(true);
  });
});



describe("Test /signin page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/signin");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Email valid, password with less than 6 chars", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_name", "ProfesorTest");
    await page.type("#basic_surname1", "ProfesorTest");
    await page.type("#basic_surname2", "ProfesorTest");
    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Test1");
    await page.type("#basic_passwordConfirm", "Test1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/signin");
    const content = await page.content();
    await expect(content.includes("La contraseña debe tener al menos 6 caracteres")).toBe(true);
  });
});


describe("Test /signin page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/signin");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Email valid, password with blankspaces", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_name", "ProfesorTest");
    await page.type("#basic_surname1", "ProfesorTest");
    await page.type("#basic_surname2", "ProfesorTest");
    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Test 12");
    await page.type("#basic_passwordConfirm", "Test 12");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/signin");
    const content = await page.content();
    await expect(content.includes("La contraseña no puede contener espacios en blanco")).toBe(true);
  });
});


describe("Test /signin page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/signin");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Email valid, passwords do not fit", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_name", "ProfesorTest");
    await page.type("#basic_surname1", "ProfesorTest");
    await page.type("#basic_surname2", "ProfesorTest");
    await page.type("#basic_email", "profesor1@uniovi.es");
    await page.type("#basic_password", "Test12");
    await page.type("#basic_passwordConfirm", "Test13");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));

    await expect(page.url()).toBe("http://localhost:3000/signin");
    const content = await page.content();
    await expect(content.includes("Las contraseñas no coinciden")).toBe(true);
  });
});
