class TxtExporter {
  export(questions) {
    let text = "";
    let initialOption = "A";
    let correctOption = "";
    questions.forEach((question) => {
      if (question.question) {
        text += question.question + "\r\n";
        question.options.forEach((option) => {
          text += initialOption + ")" + option.value + "\r\n";
          correctOption = option.correct ? initialOption : correctOption;
          initialOption = String.fromCharCode(initialOption.charCodeAt(0) + 1);
        });
      }
      text += "ANSWER: " + correctOption + "\r\n";
      text += "\r\n";
      initialOption = "A";
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
