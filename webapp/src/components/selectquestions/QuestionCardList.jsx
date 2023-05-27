import QuestionCard from "./QuestionCard";
import { useState } from "react";
import { Row, Col, Button, message } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

const listStyle = {
  padding: "1%",
  backgroundColor: "white",
  overflow: "scroll",
  maxHeight: 450,
};

const buttonAddQuestionStyle = {
  width: "100%",
  height: "50px",
  fontSize: "20px",
  marginRight: "1%",
  marginLeft: "1%",
};

const droppableStyle = {
  width: "100%",
}

/**
 * A functional component that renders a list of QuestionCard components.
 * @param {{questions: Array<{question: string, options: Array<string>}>}} props - An object containing an array of question objects, each with a question string and an array of options.
 * @returns A div containing a list of QuestionCard components.
 */
function QuestionCardList(props) {
  const { t } = useTranslation();

  let [questions, setQuestions] = useState([
    ...props.questions.map((q, index) => {
      return { id: index, question: q.question, options: q.options, repeated: q.repeated };
    }),
  ]);

  const updateQuestion = (index, questionText, options) => {
    const newQuestions = [...questions];
    newQuestions[index].question = questionText;
    newQuestions[index].options = options;
    setQuestions(newQuestions);
    props.updateQuestions(newQuestions);
  };

  // Elimina la pregunta ----------------------------------------------------------
  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    props.updateQuestions(newQuestions);
  };

  // Drag and Drop ----------------------------------------------------------------

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const questionsList = reorder(
      questions,
      result.source.index,
      result.destination.index
    );

    setQuestions(questionsList);
    props.updateQuestions(questionsList);
  };

  // Agrega una nueva pregunta ----------------------------------------------------
  function getRandomInt(min, max) {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    let range = max - min + 1;
    let max_range = Math.pow(2, 32);
    return min + Math.floor((array[0] / max_range) * range);
  }

  const generateSkelettonQuestion = () => {
    let random = getRandomInt(0, 3);
    console.log(random);
    return {
      id: questions.length,
      question: "<<Escriba el enunciado...>>",
      options: [
        { value: "a", correct: random === 0 ? true : false },
        { value: "b", correct: random === 1 ? true : false },
        { value: "c", correct: random === 2 ? true : false },
        { value: "d", correct: random === 3 ? true : false },
      ],
    };
  };

  const addNewQuestion = (question, index) => {
    question.id = Math.max(...questions.map((q) => q.id)) + 1;
    const newQuestions = [...questions];
    newQuestions.splice(index, 0, question);
    setQuestions(newQuestions);
    props.updateQuestions(newQuestions);
    message.success(t("questionAdded"));
    console.log(newQuestions);
  };

  return (
    <div>
      <Col span={24}>
        <Row style={listStyle}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="id">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={droppableStyle}
                >
                  {questions.map((q, index) => {
                    return (
                      <Draggable
                        key={q.id}
                        draggableId={q.id + ""}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <QuestionCard
                              key={index}
                              index={index}
                              id={index}
                              questionText={q.question}
                              options={q.options}
                              repeated={q.repeated || false}
                              updateQuestion={updateQuestion}
                              deleteQuestion={deleteQuestion}
                              addNewQuestion={addNewQuestion}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            type="dashed"
            style={buttonAddQuestionStyle}
            id="addQuestionButton"
            onClick={() =>
              addNewQuestion(generateSkelettonQuestion(), questions.length)
            }
          >
            {t("addNewQuestion")}
          </Button>
        </Row>
      </Col>
    </div>
  );
}

export default QuestionCardList;
