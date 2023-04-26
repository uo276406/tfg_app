import { Document, Packer, Paragraph, TextRun } from "docx";

class DocxExporter {
  export(questions) {
    let children = [];
    questions.forEach((question) => {
      if (question.question) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: question.question,
                bold: true,
                fontSize: 16,
              }),
            ],
          })
        );
        question.options.forEach((option) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: option.value + (option.correct ? " T " : " F "),
                  fontSize: 11,
                }),
              ],
            })
          );
        });
      }
      children.push(new Paragraph({
        children: [],
      }))
    });

    const doc = new Document({
      creator: "Keywords App",
      description: "Generated questions from Keywords App",
      title: "Exam Questions",
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "questions.docx";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  }
}

export default DocxExporter;
