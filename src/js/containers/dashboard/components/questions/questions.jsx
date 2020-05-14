import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import CreateQuestion from './components/create-question';
import QuestionList from './components/question-list';

const Questions = (props) => {
  const { questions, fetchQuestions, createQuestion, updateQuestion, deleteQuestion } = props;
  const [questionAction, setQuestionAction] = useState(null);
  const [editQuestionId, setEditQuestionId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      {(questionAction === 'create' || questionAction === 'edit') ? (
        <CreateQuestion
          questions={questions}
          isEdit={questionAction === 'edit'}
          setQuestionAction={() => setQuestionAction(null)}
          questionId={editQuestionId}
          createQuestion={createQuestion}
          updateQuestion={updateQuestion}
        />
      ) : (
        <div className="px-2">
          <div style={{ width: '100%' }} className="d-flex align-items-center justify-content-between mb-4">
            <div>You can create, edit and view your questions</div>
            <Button type="primary" onClick={() => setQuestionAction('create')}>Create</Button>
          </div>
          <QuestionList
            questions={questions}
            setQuestionAction={setQuestionAction}
            setEditQuestionId={setEditQuestionId}
            deleteQuestion={deleteQuestion}
          />
        </div>)}
    </div>
  );
};

Questions.propTypes = {
  history: PropTypes.shape({}).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  updateQuestion: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired
};

Questions.defaultProps = {
  questions: []
};

export default withRouter(Questions);
