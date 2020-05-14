import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import CreateQuestionSet from './components/create-questionset';
import QuestionSetList from './components/questionset-list';

const QuestionSet = (props) => {
  const { questions, questionSets, fetchQuestionSets, createQuestionSet, updateQuestionSet,
    deleteQuestionSet } = props;
  const [questionSetAction, setQuestionSetAction] = useState(null);
  const [editQuestionSetId, setEditQuestionSetId] = useState(null);

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  return (
    <div>
      {(questionSetAction === 'create' || questionSetAction === 'edit') ? (
        <CreateQuestionSet
          questions={questions}
          questionSets={questionSets}
          isEdit={questionSetAction === 'edit'}
          setQuestionSetAction={() => setQuestionSetAction(null)}
          questionSetId={editQuestionSetId}
          createQuestionSet={createQuestionSet}
          upadateQuestionSet={updateQuestionSet}
        />
      ) : (
        <div className="px-2">
          <div style={{ width: '100%' }} className="d-flex align-items-center justify-content-between mb-4">
            <div>You can create, edit and view your question sets</div>
            <Button type="primary" onClick={() => setQuestionSetAction('create')}>Create</Button>
          </div>
          <QuestionSetList
            questionSets={questionSets}
            setQuestionSetAction={setQuestionSetAction}
            setEditQuestionSetId={setEditQuestionSetId}
            deleteQuestionSet={deleteQuestionSet}
          />
        </div>)}
    </div>
  );
};

QuestionSet.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  questionSets: PropTypes.arrayOf(PropTypes.shape({})),
  fetchQuestionSets: PropTypes.func.isRequired,
  createQuestionSet: PropTypes.func.isRequired,
  updateQuestionSet: PropTypes.func.isRequired,
  deleteQuestionSet: PropTypes.func.isRequired
};

QuestionSet.defaultProps = {
  questions: [],
  questionSets: []
};

export default QuestionSet;
