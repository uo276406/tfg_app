const puppeteer = require("puppeteer");

jest.setTimeout(300000);

// Funciones auxiliares ---------------------------------------------------------------------------------------

const viewport = { width: 1550, height: 800 }; 


// Comienzo tests --------------------------------------------------------------------------------------------

describe("Test /test page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/test");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Test view to join an exam: fails because test not exists", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_testId", "no-existe");
    await page.type("#basic_studentId", "estudiante1");
    await page.click('button[type="submit"]');    

    await new Promise((r) => setTimeout(r, 2000));
    
    let content = await page.content();
    await expect(content.includes("Test no encontrado")).toBe(true);
  });
});


describe("Test /test page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/test");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Test view to join an exam: fails because test is closed", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_testId", "change-american-fine-party");
    await page.type("#basic_studentId", "estudiante1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));
    
    let content = await page.content();
    await expect(content.includes("Test cerrado")).toBe(true);
  });
});


describe("Test /test page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/test");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Test view to join an exam: fails because student has finish the exam (passed)", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_testId", "must-leave-cold-student");
    await page.type("#basic_studentId", "estudiante2");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));
    
    let content = await page.content();
    await expect(content.includes("Alumno ha terminado en el test")).toBe(true);
  });
});


describe("Test /test page", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.setViewport(viewport);

    await page.goto("http://localhost:3000/test");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Test view to join an exam: enters because student hasn`t finished the exam", async () => {
    await new Promise((r) => setTimeout(r, 2000));

    await page.type("#basic_testId", "must-leave-cold-student");
    await page.type("#basic_studentId", "estudiante1");
    await page.click('button[type="submit"]');

    await new Promise((r) => setTimeout(r, 2000));
    
    let content = await page.content();
    await expect(content.includes("Enviar test")).toBe(true);
  });
});