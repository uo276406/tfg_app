import React, {useState} from "react";
import { Divider } from "antd";
import Stepper from "../components/stepper/Stepper";
import TextProcessArea from "../components/textprocess/TextProcessArea";
import SelectKeywordsForm from "../components/selectkeywords/SelectKeywordForm";


function ProcessView(props) {
  
  //Maneja los pasos de la página web
  const [step, setStep] = useState(0);
  function getStep(currentStep){
    const steps ={
      0: <SelectKeywordsForm changeStep={changeStep} onSendText={handleText} textValue={text}/>,
      1: <SelectKeywordsForm changeStep={changeStep} textValue={text}/>,
    }
    return steps[currentStep]
  }
  function changeStep(nextStep){
    setStep(nextStep)
  }

  //Maneja el texto introducido por el usuario
  const [text, setText] = useState('')
  function handleText(textSent){
    console.log(textSent)
    setText(textSent)
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
