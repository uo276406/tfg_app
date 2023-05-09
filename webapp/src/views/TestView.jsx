import React, { useState } from "react";
import JoinTestForm from "../components/maketest/JoinTestForm";
import Test from "../components/maketest/Test";
import { useSearchParams } from "react-router-dom";


/**
 * A component that processes a given text and generates questions based on the keywords found.
 * @returns A React component that displays a form for processing text and generating questions.
 */
function TestView() {

  //Obtiene el id del test si se pasa en la petición
  let [searchParams, setSearchParams] = useSearchParams();


  //Maneja los pasos de la página web ---------------------------------------------------------
  const [step, setStep] = useState(0);
  
  const [student, setStudent] = useState("");
  const handleSetStudent = (studentId) => {
    setStudent(studentId);
  }

  const [testInfo, setTestInfo] = useState("");
  const [testId, setTestId] = useState(searchParams.get("testId")||"");
  const handleSetTestInfo = (testInfo, testId) => {
    setTestInfo(testInfo);
    setTestId(testId);
  }

  const getStep = (currentStep) => {
    const steps = {
      0: (
        <JoinTestForm testId={testId.trim()} handleStep={handleStep} handleSetStudent={handleSetStudent} handleSetTestInfo={handleSetTestInfo}
        />
      ),
      1: (
        <Test student={student} testId={testId.trim()} testInfo={testInfo} handleStep={handleStep} />
      ),
    };
    return steps[currentStep];
  };
  const handleStep = (nextStep) => {
    setStep(nextStep);
  };



  return (
    <div>
      <div>{getStep(step)}</div>
    </div>
  );
}

export default TestView;
