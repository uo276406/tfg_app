import React, {useState} from "react";
import { Divider } from "antd";
import Stepper from "../components/stepper/Stepper";
import TextProcessArea from "../components/textprocess/TextProcessArea";
import SelectKeywordsForm from "../components/selectkeywords/SelectKeywordForm";
import KeywordsConnector from "../api/keywordsconnector";

function ProcessView(props) {
  
  //Maneja los pasos de la página web
  const [step, setStep] = useState(0);
  function getStep(currentStep){
    const steps ={
      0: <TextProcessArea changeStep={handleStep} onSendText={handleTextSent} textValue={text}/>,
      1: <SelectKeywordsForm changeStep={handleStep} textValue={text} keywordsFound={keywordsFound}/>,
    }
    return steps[currentStep]
  }
  function handleStep(nextStep){
    setStep(nextStep)
  }


  //Maneja el texto introducido por el usuario y lo envía a la api
  const [text, setText] = useState('')
  //Recoge las palabars clave devueltas
  const [keywordsFound, setKeywordsFound] = useState([])
  function handleTextSent(textSent){
    setText(textSent)
    let connector = new KeywordsConnector(textSent)
    connector.getKeywords().then((keywordsFetched) => {
      setKeywordsFound(keywordsFetched.keywords)
      console.log(keywordsFetched.keywords)
    })
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
