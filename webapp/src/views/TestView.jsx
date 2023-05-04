import React, { useState } from "react";
import JoinTestForm from "../components/maketest/JoinTestForm";
import Test from "../components/maketest/Test";


/**
 * A component that processes a given text and generates questions based on the keywords found.
 * @returns A React component that displays a form for processing text and generating questions.
 */
function TestView() {
  //Maneja los pasos de la página web ---------------------------------------------------------
  const [step, setStep] = useState(0);
  const getStep = (currentStep) => {
    const steps = {
      0: (
        <JoinTestForm handleStep={handleStep} handleSetStudent={handleSetStudent} handleSetTestInfo={handleSetTestInfo}
        />
      ),
      1: (
        <Test student={student} testInfo={testInfo} handleStep={handleStep} />
      ),
    };
    return steps[currentStep];
  };
  const handleStep = (nextStep) => {
    setStep(nextStep);
  };

  const [student, setStudent] = useState("");
  const handleSetStudent = (studentId) => {
    setStudent(studentId);
  }

  const [testInfo, setTestInfo] = useState("");
  const handleSetTestInfo = (testInfo) => {
    setTestInfo(testInfo);
    console.log(testInfo);
  }



  return (
    <div>
      <div>{getStep(step)}</div>
    </div>
  );
}

export default TestView;
