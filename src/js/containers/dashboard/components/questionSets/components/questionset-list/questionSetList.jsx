import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';

const QuestionSetList = (props) => {
  const { questionSets, setQuestionSetAction, deleteQuestionSet, setEditQuestionSetId } = props;

  const onDelete = (event, questionSetId) => {
    event.stopPropagation();
    deleteQuestionSet(questionSetId);
  };

  const onEditQuestionSet = (questionSetId) => {
    setQuestionSetAction('edit');
    setEditQuestionSetId(questionSetId);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={questionSets}
        className="p-2"
        renderItem={item => (
          <div
            role="presentation"
            key={item.id}
            className="d-flex align-items-center options list-item box-shadow my-2 py-2 px-4 cursor-pointer"
            style={{ height: 100 }}
            onClick={() => onEditQuestionSet(item.id)}
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
                <div className="font-semi-bold mr-2">Score:</div>
                <div className="ellipsis">{item.score}</div>
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

QuestionSetList.propTypes = {
  questionSets: PropTypes.arrayOf(PropTypes.shape({}) || PropTypes.shape([])).isRequired,
  deleteQuestionSet: PropTypes.func.isRequired,
  setEditQuestionSetId: PropTypes.func.isRequired,
  setQuestionSetAction: PropTypes.func.isRequired
};

export default QuestionSetList;
