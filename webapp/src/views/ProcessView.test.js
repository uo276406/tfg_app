const puppeteer = require("puppeteer");

jest.setTimeout(300000);

// Funciones auxiliares ---------------------------------------------------------------------------------------

const viewport = { width: 1550, height: 800 };

const isDisabled = async (element) => {
  const disabledHandle = await element.getProperty("disabled");
  const isDisabled = await disabledHandle.jsonValue();
  return isDisabled;
};

const getElementById = async (page, id) => {
  await page.waitForSelector("#" + id);
  const element = await page.$("#" + id);
  return element;
};

const loginTestUser = async (page) => {
  await page.type("#basic_email", "profesor1@uniovi.es");
  await page.type("#basic_password", "Profesor1");
  await page.click('button[type="submit"]');
};

const typeSampleText = async (page) => {

  await page.waitForSelector("#sampleTextButton");

  const tryTextButton = await page.$("#sampleTextButton");
  await tryTextButton.click();

  const processButton = await page.$("#processTextButton");
  await processButton.click();
};


// Comienzo tests --------------------------------------------------------------------------------------------

describe("Test /process page", () => {
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

  test("First step: Processing text", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await page.waitForSelector("#deleteTextButton");
    const deleteButton = await page.$("#deleteTextButton");

    const isDisabledDeleteButton = await isDisabled(deleteButton);
    await expect(isDisabledDeleteButton).toBe(true);

    await page.type("#TextToProcess", "Texto de prueba");
    await deleteButton.click();

    const tryTextButton = await page.$("#sampleTextButton");
    await tryTextButton.click();

    const processButton = await page.$("#processTextButton");
    const isDisabledProcessButton = await isDisabled(processButton);
    await expect(isDisabledProcessButton).toBe(false);
  });
});




describe("Test /process page", () => {
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

  test("Second step: Selecting keywords (search field)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#searchField");
    let content = await page.content();
    await expect(content.includes("Generar preguntas")).toBe(true);

    await page.type("#searchField", "Texto de prueba"); // Texto no encuentra
    content = await page.content();
    await expect(content.includes("No se han encontrado palabras")).toBe(true);

    await page.type("#searchField", "east"); // Texto encuentra
    content = await page.content();
    await expect(content.includes("water")).toBe(false);

  });
});


describe("Test /process page", () => {
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

  test("Second step: Selecting keywords (select and delete keywords system)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));
    
    await page.waitForSelector("#deleteSelectedButton");
    let deleteSelectedButton = await page.$("#deleteSelectedButton"); //Elimina seleccionadas por defecto
    await page.click("#deleteSelectedButton");
    let disabledDeleteButton = await isDisabled(deleteSelectedButton);
    await expect(disabledDeleteButton).toBe(true);
    let content = await page.content();
    await expect(content.includes("Seleccionar todas")).toBe(true);

    await page.waitForSelector("#checkAllButton");
    await page.click("#checkAllButton"); //selecciona todas y las elimina
    await page.waitForSelector("#deleteSelectedButton");
    deleteSelectedButton = await page.$("#deleteSelectedButton");
    await page.click("#deleteSelectedButton");
    disabledDeleteButton = await isDisabled(deleteSelectedButton);
    await expect(disabledDeleteButton).toBe(true);
    content = await page.content();
    await expect(content.includes("No se han encontrado palabras")).toBe(true);

  });
});



describe("Test /process page", () => {
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

  test("Second step: Selecting keywords (add new keyword)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    
    await page.waitForSelector("#addNewWordField");
    await page.type("#addNewWordField", "Europeans"); //Añade palabra válida
    await page.click("#addNewWordButton");
    let content = await page.content();
    await expect(content.includes("Europeans")).toBe(true);
    await expect(content.includes("Palabra añadida correctamente")).toBe(true);

    await page.waitForSelector("#addNewWordField");
    await page.type("#addNewWordField", "silk"); //Añade palabra repetida
    await page.click("#addNewWordButton");
    content = await page.content();
    await expect(content.includes("silk")).toBe(true);
    await expect(content.includes("Palabra repetida")).toBe(true);


    await page.waitForSelector("#addNewWordField");
    await page.type("#addNewWordField", "xfgh"); //Añade palabra no existente en texto
    await page.click("#addNewWordButton");
    content = await page.content();
    await expect(content.includes("xfgh")).toBe(false);
    await expect(content.includes("Palabra no encontrada en el texto")).toBe(true);

  });
});


describe("Test /process page", () => {
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

  test("Second step: Selecting keywords (to pass to select questions)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#checkAllButton");
    await page.click("#checkAllButton"); //selecciona todas
    await page.click("#checkAllButton"); //deselecciona todas
    let isDisabledGenerateButton = await isDisabled(await page.$("#generateQuestionsButton"));
    await expect(isDisabledGenerateButton).toBe(true);

    await page.click("#checkAllButton"); //selecciona todas
    isDisabledGenerateButton = await isDisabled(await page.$("#generateQuestionsButton"));
    await expect(isDisabledGenerateButton).toBe(false);
  
  });
});
