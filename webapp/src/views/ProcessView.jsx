import React, { useState } from "react";
import { Divider, Spin } from "antd";
import Stepper from "../components/stepper/Stepper";
import TextProcessForm from "../components/textprocess/TextProcessForm";
import SelectKeywordsForm from "../components/selectkeywords/SelectKeywordForm";
import SelectQuestionsForm from "../components/selectquestions/SelectQuestionsForm";

/**
 * A component that processes a given text and generates questions based on the keywords found.
 * @returns A React component that displays a form for processing text and generating questions.
 */
function ProcessView() {
  //Maneja los pasos de la página web ---------------------------------------------------------
  const [step, setStep] = useState(0);
  const getStep = (currentStep) => {
    const steps = {
      0: (
        <TextProcessForm
          changeStep={handleStep}
          handleKeywordsFound={handleKeywordsFound}
          textValue={text}
        />
      ),
      1: (
        <SelectKeywordsForm
          changeStep={handleStep}
          text={text}
          keywordsFound={
            totalKeywords.length === 0 ? keywordsFound : totalKeywords
          }
          handleQuestions={handleQuestions}
          handleTotalKeywords={handleTotalKeywords}
        />
      ),
      2: <SelectQuestionsForm changeStep={handleStep} questions={questions} />,
    };
    return steps[currentStep];
  };
  const handleStep = (nextStep) => {
    setStep(nextStep);
  };

  //Maneja el texto introducido por el usuario y lo envía a la api ---------------------------------
  const [text, setText] = useState("");
  //Recoge las palabras clave devueltas y selecciona por defecto ------------------------------------------------------------
  const [keywordsFound, setKeywordsFound] = useState([]);
  const percentageOfSelected = 0.5;
  const handleKeywordsFound = (textSent, keywordsFound) => {
    setText(textSent);
    setKeywordsFound([
      ...keywordsFound.map((k, index) => {
        let toSelect =
          index < keywordsFound.length * percentageOfSelected
            ? true
            : false;
        return { index: k.index, value: k.value, selected: toSelect };
      }),
    ]);
    setTotalKeywords([])
    console.log(keywordsFound);
  };

  // Recoge las preguntas devueltas -------------------------------------------------------------
  const [questions, setQuestions] = useState();
  const handleQuestions = (questionsGenerated) => {
    setQuestions(questionsGenerated);
    console.log(questionsGenerated);
  };

  // Guarda lista de palabars totales
  const [totalKeywords, setTotalKeywords] = useState([]);
  const handleTotalKeywords = (totalKeywords) => {
    setTotalKeywords(totalKeywords);
  };

  return (
    <div>
      <Stepper step={step} />
      <Divider style={{ border: "1px solid" }} />
      <div>{getStep(step)}</div>
    </div>
  );
}

export default ProcessView;
