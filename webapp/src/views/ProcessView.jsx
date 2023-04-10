import React, {useState} from "react";
import { Divider } from "antd";
import Stepper from "../components/stepper/Stepper";
import TextProcessForm from "../components/textprocess/TextProcessForm";
import SelectKeywordsForm from "../components/selectkeywords/SelectKeywordForm";
import SelectQuestionsForm from "../components/selectquestions/SelectQuestionsForm";

function ProcessView() {
  
  //Maneja los pasos de la página web ---------------------------------------------------------
  const [step, setStep] = useState(0);
  function getStep(currentStep){
    const steps ={
      0: <TextProcessForm changeStep={handleStep} handleKeywordsFound={handleKeywordsFound} textValue={text}/>,
      1: <SelectKeywordsForm changeStep={handleStep} text={text} keywordsFound={keywordsFound} handleQuestions={handleQuestions}/>,
      2: <SelectQuestionsForm changeStep={handleStep} questions={questions}/>
    }
    return steps[currentStep]
  }
  function handleStep(nextStep){
    setStep(nextStep)
  }


  //Maneja el texto introducido por el usuario y lo envía a la api ---------------------------------
  const [text, setText] = useState('')
  //Recoge las palabras clave devueltas ------------------------------------------------------------
  const [keywordsFound, setKeywordsFound] = useState([])
  function handleKeywordsFound(textSent, keywordsFound){
    setText(textSent)
    setKeywordsFound(keywordsFound)
  }

  // Recoge las preguntas devueltas -------------------------------------------------------------
  const [questions, setQuestions] = useState()
  function handleQuestions(questions) {
    setQuestions(questions)
  }


  return (
    <div>
      <Stepper step={step}/>
      <Divider style={{border: "1px solid"}}/>
      <div>
        {getStep(step)}
      </div>
    </div>
  );
}

export default ProcessView;
