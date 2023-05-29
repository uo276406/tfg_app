const puppeteer = require("puppeteer");

jest.setTimeout(300000);

// Funciones auxiliares ---------------------------------------------------------------------------------------

const viewport = { width: 1550, height: 800 };

const isDisabled = async (element) => {
  const disabledHandle = await element.getProperty("disabled");
  const isDisabled = await disabledHandle.jsonValue();
  return isDisabled;
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


const checkQuestionText = async (page, text, element) => {
  await element.click();
  const textareas = await page.$$("textarea");
  for (const textarea of textareas) {
    await textarea.type(text);
    await page.click("#numberOfQuestions");
    let content = await page.content();
    if (text === "") {
      await expect(content.includes("No puede ser vacío")).toBe(true);
    } else {
      await expect(content.includes(text)).toBe(true);
    }
  }
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

  test("Second step: Selecting keywords (modify number of questions by word)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#keyword0");
    const card = await page.$("#keyword0");

    await card.hover();
    await page.waitForSelector("#inputNumber0");
    await page.type("#inputNumber0", "texto"); //Intenta escribir texto
    let content = await page.content();
    await expect(content.includes("12 palabras seleccionadas")).toBe(true); // No se deselecciona nada

    await card.hover();
    await page.waitForSelector("#inputNumber0");
    await page.$eval("#inputNumber0", (element) => (element.value = "2"));
    content = await page.content();
    await expect(content.includes("13")).toBe(true); // Se añade una pregunta

    await card.hover();
    await page.waitForSelector("#inputNumber0");
    await page.$eval("#inputNumber0", (element) => (element.value = "0"));
    content = await page.content();
    await expect(content.includes("11")).toBe(true);
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

  test("Second step: Selecting keywords (to pass to select questions with no repeated question)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#checkAllButton");
    await page.click("#checkAllButton");
    await page.click("#checkAllButton");

    const card = await page.$("#keyword0");
    card.hover()

    await page.waitForSelector("#keyword0");
    await page.click("#keyword0");

    await page.click("#generateQuestionsButton");

    await new Promise((r) => setTimeout(r, 4000));

    await page.waitForSelector("#question0");
    let content = await page.content();
    await expect(content.includes("Preguntas repetidas")).toBe(false);
    
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

  test("Second step: Selecting keywords (to pass to select questions with not enough question)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#checkAllButton");
    await page.click("#checkAllButton");
    await page.click("#checkAllButton");

    const card = await page.$("#keyword0");
    card.hover()

    await page.waitForSelector("#keyword0");
    await page.click("#keyword0");
    card.hover()
    await page.waitForSelector("#increaseButton0");
    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      await page.click("#increaseButton0");
    }
    
    await page.click("#generateQuestionsButton");

    await new Promise((r) => setTimeout(r, 4000));

    await page.waitForSelector("#numberOfQuestions");
    let content = await page.content();
    await expect(content.includes("No hay preguntas suficientes")).toBe(true);
    
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

  test("Second step: Selecting keywords (to pass to select questions with not enough question and repeated)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#checkAllButton");

    const card = await page.$("#keyword0");
    card.hover()

    await page.waitForSelector("#keyword0");
    await page.click("#keyword0");
    card.hover()
    await page.waitForSelector("#increaseButton0");
    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      await page.click("#increaseButton0");
    }
    
    await page.click("#generateQuestionsButton");

    await new Promise((r) => setTimeout(r, 4000));

    await page.waitForSelector("#numberOfQuestions");
    let content = await page.content();
    await expect(content.includes("No hay preguntas suficientes")).toBe(true);
    await expect(content.includes("Preguntas repetidas")).toBe(true);
    
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

  test("Third step: Selecting questions (questions repeated and add new question)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#generateQuestionsButton");
    await page.click("#generateQuestionsButton"); //Genera preguntas

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#generateTestButton");

    let content = await page.content();
    await expect(content.includes("Preguntas repetidas")).toBe(true);

    await page.waitForSelector("#addQuestionButton");
    await page.click("#addQuestionButton"); //Añade pregunta

    content = await page.content();
    await expect(content.includes("13 preguntas propuestas")).toBe(true);
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

  test("Third step: Selecting questions (duplicate question)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 10000));

    await page.waitForSelector("#generateQuestionsButton");
    await page.click("#generateQuestionsButton"); //Genera preguntas

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#questionCard0");
    const card = await page.$("#questionCard0");
    await card.hover(); // Se pone encima y espera al botón
    await page.waitForSelector("#duplicateButton0");
    await page.click("#duplicateButton0");

    let content = await page.content();
    await expect(content.includes("13 preguntas propuestas")).toBe(true);
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

  test("Third step: Selecting questions (edit question text)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#generateQuestionsButton");
    await page.click("#generateQuestionsButton"); //Genera preguntas

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#generateTestButton");

    const xpathExpression = "//div[@role='button' and @tabindex='0']";
    const elementHandles = await page.$x(xpathExpression);

    if (elementHandles.length > 0) {
      const element = elementHandles[0];
      await checkQuestionText(page, "", element);

      await checkQuestionText(page, "But when the Silk Road, the long  _________  from China to the Mediterranean", element);

      await checkQuestionText(page, "But when the Silk Road, the long  _________  from China to the Mediterranean, became costlier and more dangerous to travel, Europeans searched for a more efficient and inexpensive trade route over water, initiating the development of what we now call the Atlantic World Añadidas cosas", element);
    }
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

  test("Third step: Selecting questions (add new option)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#generateQuestionsButton");
    await page.click("#generateQuestionsButton"); //Genera preguntas

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#generateTestButton");

    let content = await page.content();
    await expect(content.includes("12 preguntas propuestas")).toBe(true);

    await page.waitForSelector("#addOption0");
    await page.click("#addOption0"); //Añade opción a la primera pregunta
    await page.type("#addOptionInput0", "OpcionTest"); //Escribe en la nueva opción
    await page.click("#numberOfQuestions");

    content = await page.content();
    await expect(content.includes("OpcionTest")).toBe(true);
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

  test("Third step: Selecting questions (delete one question)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 10000));

    await page.waitForSelector("#generateQuestionsButton");
    await page.click("#generateQuestionsButton"); //Genera preguntas

    await new Promise((r) => setTimeout(r, 6000));

    await page.waitForSelector("#questionCard0");
    const card = await page.$("#questionCard0");
    await card.hover(); // Se pone encima y espera al botón
    await page.waitForSelector("#deleteButton0");
    await page.click("#deleteButton0");
    let content = await page.content();
    await expect(content.includes("11 preguntas propuestas")).toBe(true);

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

  test("Third step: Selecting questions (delete all questions)", async () => {
    await new Promise((r) => setTimeout(r, 4000));

    await loginTestUser(page);

    await new Promise((r) => setTimeout(r, 4000));

    await page.goto("http://localhost:3000/process");

    await typeSampleText(page);

    await new Promise((r) => setTimeout(r, 10000));

    await page.waitForSelector("#generateQuestionsButton");
    await page.click("#generateQuestionsButton"); //Genera preguntas

    await new Promise((r) => setTimeout(r, 6000));

    let content = await page.content();

    for (let i = 0; i < 12; i++) {
      await new Promise((r) => setTimeout(r, 500));
      await page.waitForSelector("#questionCard0");
      const card = await page.$("#questionCard0");
      await card.hover(); // Se pone encima y espera al botón
      await page.waitForSelector("#deleteButton0");
      await page.click("#deleteButton0");
      content = await page.content();
    }
    content = await page.content();
    await expect(content.includes("0 preguntas propuestas")).toBe(true);
  });
});

