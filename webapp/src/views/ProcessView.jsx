import React, {useState} from "react";
import Stepper from "../components/stepper/Stepper";
import TextProcessArea from "../components/textprocess/TextProcessArea";
import SelectKeywordsForm from "../components/selectkeywords/SelectKeywordForm";


function ProcessView(props) {
  
  const [step, setStep] = useState(0);

  // Retorna la vista en base al paso correspondiente
  function getStep(currentStep){
    const steps ={
      0: <TextProcessArea changeStep={changeStep}/>,
      1: <SelectKeywordsForm changeStep={changeStep}/>,
    }
    return steps[currentStep]
  }

  // Modifica el paso a la siguiente vista
  function changeStep(nextStep){
    setStep(nextStep)
  }

  return (
    <div>
      <Stepper step={step}/>
      <div>
        {getStep(step)}
      </div>
    </div>
  );
}

export default ProcessView;
