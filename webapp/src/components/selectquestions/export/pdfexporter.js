import { jsPDF } from "jspdf";

class PdfExporter {
  export(questions) {
    const file = new jsPDF();
    const pdfToPrintSolve = document.createElement("div");
    const pdfToPrint = document.createElement("div");
    questions.forEach((question) => {
      if (question.question) {
        
        let newQuestionSolve = document.createElement("h4");
        newQuestionSolve.innerHTML = question.question;
        pdfToPrintSolve.appendChild(newQuestionSolve);
        
        let newQuestion = document.createElement("h4");
        newQuestion.innerHTML = question.question;
        pdfToPrint.appendChild(newQuestion);

        question.options.forEach((option) => {

          let newOptionSolve = document.createElement("p");
          newOptionSolve.innerHTML = option.value + (option.correct ? " T " : " F ");
          pdfToPrintSolve.appendChild(newOptionSolve);

          let newOption = document.createElement("p");
          newOption.innerHTML = option.value;
          pdfToPrint.appendChild(newOption);
        });
      }
    });

    file.html(pdfToPrintSolve, {
      callback: (file) => file.save("questions-solve.pdf"),
      margin: [10, 10, 10, 10],
      autoPaging: true,
      x: 0,
      y: 0,
      width: 190,
      windowWidth: 675,
    });

    file.html(pdfToPrint, {
      callback: (file) => file.save("questions.pdf"),
      margin: [10, 10, 10, 10],
      autoPaging: true,
      x: 0,
      y: 0,
      width: 190,
      windowWidth: 675,
    });
  }
}

export default PdfExporter;
