import QuestionCard from "./QuestionCard";
import { useState } from "react";
import { Row, Col, Button } from "antd";
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
};

/**
 * A functional component that renders a list of QuestionCard components.
 * @param {{questions: Array<{question: string, options: Array<string>}>}} props - An object containing an array of question objects, each with a question string and an array of options.
 * @returns A div containing a list of QuestionCard components.
 */
function QuestionCardList(props) {
  const { t } = useTranslation();

  let [questions, setQuestions] = useState([
    ...props.questions.map((q, index) => {
      return { id: index, question: q.question, options: q.options };
    }),
  ]);

  const updateQuestion = (index, questionText, options) => {
    const newQuestions = [...questions];
    newQuestions[index].question = questionText;
    newQuestions[index].options = options;
    setQuestions(newQuestions);
  };

  // Elimina la pregunta ----------------------------------------------------------
  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
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

    console.log(questionsList);
  };

  // Agrega una nueva pregunta ----------------------------------------------------
  const addNewQuestion = () => {
    let random = Math.floor(Math.random() * 4);
    console.log(random)
    const newQuestions = [...questions];
    newQuestions.push({
      id: newQuestions.length,
      question: "<<Escriba el enunciado...>>",
      options: [
        { value: "a", correct: random === 0 ? true : false },
        { value: "b", correct: random === 1 ? true : false },
        { value: "c", correct: random === 2 ? true : false },
        { value: "d", correct: random === 3 ? true : false },
      ],
    });
    setQuestions(newQuestions);
    console.log(newQuestions)
  };

  return (
    <div>
      <Col span={24}>
        <Row style={listStyle}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="id">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
                              updateQuestion={updateQuestion}
                              deleteQuestion={deleteQuestion}
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
            on
            onClick={addNewQuestion}
          >
            {t("addNewQuestion")}
          </Button>
        </Row>
      </Col>
    </div>
  );
}

export default QuestionCardList;
