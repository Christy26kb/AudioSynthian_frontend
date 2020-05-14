import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Select } from 'antd';

const { Option } = Select;

const CreateQuestionSet = (props) => {
  const defaultQuestionSet = {
    title: '',
    questions: [],
    time: '',
    score: ''
  };

  const { questions, questionSets, isEdit, setQuestionSetAction, questionSetId,
    createQuestionSet, upadateQuestionSet } = props;
  const [questionSetFields, setQuestionSetFields] = useState(defaultQuestionSet);

  useEffect(() => {
    if (isEdit) {
      const currentQuestionSet = questionSets.find(questionSet => questionSet.id === questionSetId);
      if (currentQuestionSet) setQuestionSetFields(currentQuestionSet);
    }
  }, []);

  const onChange = (event) => {
    const { value } = event.target;
    const modifiedQuestionSetFields = { ...questionSetFields, [event.target.name]: value };
    setQuestionSetFields(modifiedQuestionSetFields);
  };

  const getTimeAndScore = (questionIds) => {
    const totalTime = questionIds.reduce((acc, questionId) => {
      const questionItemData = questions.find(question => question.id === questionId);
      // eslint-disable-next-line no-param-reassign
      if (questionItemData) acc += questionItemData.time ? parseInt(questionItemData.time, 10) : 0;
      return acc;
    }, 0);
    return { time: totalTime, score: questionIds.length };
  };

  const onQuestionsChange = (values) => {
    const timeAndScore = getTimeAndScore(values);
    const modifiedQuestionSetFields = { ...questionSetFields, questions: values, ...timeAndScore };
    setQuestionSetFields(modifiedQuestionSetFields);
  };

  const onSave = () => {
    // TODO: Need to add empty validations.
    if (isEdit) upadateQuestionSet(questionSetFields);
    else createQuestionSet(questionSetFields);

    setQuestionSetAction();
  };

  return (
    <div className="px-2">
      <div className="font-semi-bold">
        Define your Question Set by selecting the questions for your set,
          and you can view the total time duration and score details.
      </div>
      <div className="question-section" style={{ width: '80%' }}>
        {isEdit && (
          <div className="py-2">
            <div className="pb-2">ID:</div>
            <Input
              style={{ height: 30 }}
              value={questionSetFields.id || ''}
              disabled={true}
            />
          </div>)}
        <div className="py-2">
          <div className="pb-2">
            {`Name: (must be unique across question sets)`}
          </div>
          <Input
            style={{ height: 30 }}
            name="title"
            value={questionSetFields.title}
            onChange={onChange}
          />
        </div>
        <div className="py-2">
          <div className="pb-2">
            {`Questions: (you can select questions from your list)`}
          </div>
          <Select
            name="questions"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="select your questions"
            onChange={onQuestionsChange}
            optionLabelProp="label"
            value={[...questionSetFields.questions]}
          >
            {questions.map(questionItem => (
              <Option key={questionItem.id} value={questionItem.id} label={questionItem.title}>
                <div>{questionItem.title}</div>
              </Option>
            ))}
          </Select>
        </div>
        <div className="py-2">
          <div className="pb-2">Time and Score:</div>
          <div className="options p-4 d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center" style={{ width: '50%' }}>
              <div className="mr-2">Total time duration (min):</div>
              <Input
                type="number"
                name="time"
                min={1}
                max={1800}
                value={questionSetFields.time}
                style={{ width: '35%' }}
                disabled={true}
              />
            </div>
            <div className="d-flex align-items-center" style={{ width: '50%' }}>
              <div className="mr-2">Total Score:</div>
              <Input
                type="number"
                name="score"
                min={1}
                max={1800}
                value={questionSetFields.score}
                style={{ width: '35%' }}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="actions-section d-flex align-items-center justify-content-end">
        <Button onClick={setQuestionSetAction} className="mr-2">Cancel</Button>
        <Button type="primary" onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

CreateQuestionSet.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  questionSets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isEdit: PropTypes.bool.isRequired,
  setQuestionSetAction: PropTypes.func.isRequired,
  createQuestionSet: PropTypes.func.isRequired,
  upadateQuestionSet: PropTypes.func.isRequired,
  questionSetId: PropTypes.number
};

CreateQuestionSet.defaultProps = {
  questionSetId: null
};

export default CreateQuestionSet;
