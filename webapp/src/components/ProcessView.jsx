import React, { useState } from "react";
import { Divider } from "antd";
import Stepper from "../components/stepper/Stepper";
import TextProcessForm from "../components/textprocess/TextProcessForm";
import SelectKeywordsForm from "../components/selectkeywords/SelectKeywordForm";
import SelectQuestionsForm from "../components/selectquestions/SelectQuestionsForm";

const dividerStyle = { border: "1px solid" };

/**
 * A component that processes a given text and generates questions based on the keywords found.
 * @returns A React component that displays a form for processing text and generating questions.
 */
function ProcessView(props) {
  //Maneja los pasos de la página web ---------------------------------------------------------
  const [step, setStep] = useState(0);
  const getStep = (currentStep) => {
    const steps = {
      0: (
        <TextProcessForm
          changeStep={handleStep}
          handleKeywordsFound={handleKeywordsFound}
          textValue={text}
          accessToken={props.accessToken}
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
          accessToken={props.accessToken}
        />
      ),
      2: (
        <SelectQuestionsForm
          changeStep={handleStep}
          questions={questions}
          accessToken={props.accessToken}
        />
      ),
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
  const percentageOfSelected = 0.3;
  const handleKeywordsFound = (textSent, keywordsFound) => {
    setText(textSent);
    setKeywordsFound([
      ...keywordsFound.map((k, index) => {
        let toSelect =
          index < keywordsFound.length * percentageOfSelected ? true : false;
        let numberOfQuestions = toSelect ? 1 : 0;
        return {
          index: k.index,
          value: k.value,
          selected: toSelect,
          numberOfQuestions: numberOfQuestions,
        };
      }),
    ]);
    setTotalKeywords([]);
  };

  // Recoge las preguntas devueltas -------------------------------------------------------------
  const [questions, setQuestions] = useState();
  const handleQuestions = (questionsGenerated) => {
    setQuestions(questionsGenerated);
  };

  // Guarda lista de palabars totales
  const [totalKeywords, setTotalKeywords] = useState([]);
  const handleTotalKeywords = (totalKeywords) => {
    setTotalKeywords(totalKeywords);
  };

  return (
    <div>
      <Stepper step={step} />
      <Divider style={dividerStyle} />
      <div>{getStep(step)}</div>
    </div>
  );
}

export default ProcessView;
