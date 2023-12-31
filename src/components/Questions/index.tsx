import { FC, ReactNode } from "react";
import { QuestionnaireProps } from "../../types";
import Accordian from "../Accordian";
import Input from '../Input';
import {
  QuestionStatus,
  TitleContainer,
  QuestionTitle,
  Container,
  AnswerSection,
  ActionButtonContainer,
  SubmitButton,
  InputContainer
} from "./Questions.styled";

export interface CommonEventsHandlerProps {
  onChange: (
    e: React.ChangeEvent<HTMLElement>,
    currentQuestion: number
  ) => void;
  onCancelQuestion: (id: number) => void;
  onSubmitQuestion: (id: number) => void;
  onEditQuestion: (id: number) => void;
}

interface QuestionaireProps extends CommonEventsHandlerProps {
  questions: QuestionnaireProps[];
  toggleAccordianCollapseState: (id: number) => void;
  reloadQuestions: () => void;
  checkIfItemEnabled: (id: number) => void;
}

const Questions: FC<QuestionaireProps> = ({
  questions = [],
  onChange,
  onCancelQuestion,
  onSubmitQuestion,
  onEditQuestion,
  toggleAccordianCollapseState,
  reloadQuestions,
  checkIfItemEnabled
}) => {

  const generateContent = (
    item: QuestionnaireProps,
    currentQuestion: number
  ): ReactNode => {
    return (
      <div>
        <span>{item.description}</span>
        <InputContainer>
          <Input
            item={item}
            onChange={onChange}
            currentQuestion={currentQuestion}
            onCancelQuestion={onCancelQuestion}
            onSubmitQuestion={onSubmitQuestion}
            onEditQuestion={onEditQuestion}
          />
        </InputContainer>
      </div>
    );
  };

  const generateTitle = (item: QuestionnaireProps): ReactNode => {
    const { isExpanded } = item;
    return (
      <TitleContainer>
        <QuestionTitle isExpanded={isExpanded}>{item.title}</QuestionTitle>
        {!isExpanded && (
          <>
            <AnswerSection>{item.value}</AnswerSection>
            <QuestionStatus isFilled={!!item.value} />
          </>
        )}
      </TitleContainer>
    );
  };

  return (
    <Container>
      {questions.map((item, index) => (
        <Accordian
          key={item.id}
          questions={questions}
          isExpanded={item.isExpanded}
          currentQuestionIndex={index}
          isAnswerGiven={item.isAnswerGiven}
          content={generateContent(item, index)}
          title={generateTitle(item)}
          toggleAccordianCollapseState={toggleAccordianCollapseState}
          checkIfItemEnabled={checkIfItemEnabled}
        />
      ))}
      <ActionButtonContainer marginTop={60}>
        <SubmitButton onClick={reloadQuestions}>Reset</SubmitButton>
      </ActionButtonContainer>
    </Container>
  );
};

export default Questions;
