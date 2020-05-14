import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';

const QuestionList = (props) => {
  const { questions, setQuestionAction, setEditQuestionId, deleteQuestion } = props;

  const onDelete = (event, questionId) => {
    event.stopPropagation();
    deleteQuestion(questionId);
  };

  const onEditQuestion = (questionId) => {
    setQuestionAction('edit');
    setEditQuestionId(questionId);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={questions}
        className="p-2"
        renderItem={item => (
          <div
            role="presentation"
            key={item.id}
            className="d-flex align-items-center options list-item box-shadow my-2 py-2 px-4 cursor-pointer"
            style={{ height: 100 }}
            onClick={() => onEditQuestion(item.id)}
          >
            <div style={{ width: '95%' }}>
              <div className="d-flex align-items-center">
                <div className="font-semi-bold mr-2">ID:</div>
                <div>{item.id}</div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-semi-bold mr-2">Title:</div>
                <div>{item.title}</div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-semi-bold mr-2">Question:</div>
                <div className="ellipsis">{item.question}</div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-semi-bold mr-2">Time Duration:</div>
                <div>{item.time}</div>
              </div>
            </div>
            <div className="full-content d-flex align-items-center justify-content-end">
              <Icon
                type="delete"
                theme="outlined"
                onClick={event => onDelete(event, item.id)}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({}) || PropTypes.shape([])).isRequired,
  setEditQuestionId: PropTypes.func.isRequired,
  setQuestionAction: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired
};

export default QuestionList;
