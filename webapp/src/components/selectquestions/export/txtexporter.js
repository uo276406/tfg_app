class TxtExporter {
  export(questions) {
    let text = "";
    questions.forEach((question) => {
      if (question.question) {
        text += question.question + "\r\n";
        question.options.forEach((option) => {
          text += option.value + (option.correct ? " T " : " F ") + "\r\n";
        });
      }
      text += "\r\n";
    });
    const file = new Blob([text], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "questions.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
}

export default TxtExporter;
