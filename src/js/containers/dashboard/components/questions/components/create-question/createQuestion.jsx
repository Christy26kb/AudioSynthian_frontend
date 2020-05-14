import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const CreateQuestion = (props) => {
  const defaultQuestion = {
    title: '',
    question: '',
    options: [{}],
    answer: '',
    time: '2'
  };

  const { questions, isEdit, setQuestionAction, createQuestion, updateQuestion, questionId } = props;
  const [questionFields, setQuestionFields] = useState(defaultQuestion);

  useEffect(() => {
    if (isEdit) {
      const currentQuestion = questions.find(question => question.id === questionId);
      if (currentQuestion) setQuestionFields(currentQuestion);
    }
  }, []);

  const onChange = (event) => {
    const { value } = event.target;
    const modifiedQuestionFields = { ...questionFields, [event.target.name]: value };
    setQuestionFields(modifiedQuestionFields);
  };

  const onUpdateOptions = (action, optionIndex, event) => {
    const modifiedOptions = [...questionFields.options];
    if (action === 'add') {
      modifiedOptions.splice(optionIndex + 1, 0, {});
    } else if (action === 'remove') {
      modifiedOptions.splice(optionIndex, 1);
    } else {
      const currentOption = modifiedOptions[optionIndex];
      modifiedOptions[optionIndex] = { ...currentOption, [event.target.name]: event.target.value };
    }
    const modifiedQuestionFields = { ...questionFields, options: modifiedOptions };
    setQuestionFields(modifiedQuestionFields);
  };

  const onAnswerKeyChange = (value) => {
    const modifiedQuestionFields = { ...questionFields, answer: value };
    setQuestionFields(modifiedQuestionFields);
  };

  const onSave = () => {
    // TODO: Need to add empty validations for string and options array.
    if (isEdit) updateQuestion(questionFields);
    else createQuestion(questionFields);

    setQuestionAction();
  };

  const renderOptionItem = (option, optionIndex) => (
    <div className="d-flex align-items-center justify-content-between mb-2" key={optionIndex}>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <div className="mr-2">Key:</div>
          <Input
            style={{ width: '60%' }}
            name="option_key"
            value={option.option_key || ''}
            onChange={event => onUpdateOptions('update', optionIndex, event)}
          />
        </div>
        <div className="full-content d-flex align-items-center">
          <div className="mr-2">Content:</div>
          <TextArea
            style={{ height: 30, width: '80%' }}
            name="option_value"
            value={option.option_value || ''}
            onChange={event => onUpdateOptions('update', optionIndex, event)}
          />
        </div>
      </div>
      <div className="d-flex-center">
        <Icon
          type="plus-circle"
          theme="outlined"
          className="mr-1"
          onClick={() => onUpdateOptions('add', optionIndex)}
        />
        {questionFields.options.length > 1 && (
          <Icon
            type="close-circle"
            theme="outlined"
            className="ml-1"
            onClick={() => onUpdateOptions('remove', optionIndex)}
          />)}
      </div>
    </div>
  );

  return (
    <div className="px-2">
      <div className="font-semi-bold">
        Define your question and list of options, and specify the right option key as answer.
      </div>
      <div className="question-section" style={{ width: '80%' }}>
        {isEdit && (
          <div className="py-2">
            <div className="pb-2">ID:</div>
            <Input
              style={{ height: 30 }}
              value={questionFields.id || ''}
              disabled={true}
            />
          </div>)}
        <div className="py-2">
          <div className="pb-2">
            {`Name: (must be unique across questions)`}
          </div>
          <Input
            style={{ height: 30 }}
            name="title"
            value={questionFields.title}
            onChange={onChange}
          />
        </div>
        <div className="py-2">
          <div className="pb-2">Question:</div>
          <TextArea
            style={{ height: 30 }}
            name="question"
            value={questionFields.question}
            onChange={onChange}
          />
        </div>
        <div className="py-2">
          <div className="mb-4">
            <div className="pb-2">Options:</div>
            <div className="options p-4">
              {questionFields.options.map(renderOptionItem)}
            </div>
          </div>
          <div>
            <div className="pb-2">Answer:</div>
            <div className="options p-4 d-flex align-items-center mb-4">
              <div className="mr-2">Option Key:</div>
              <Select
                name="answer"
                className="pos-relative"
                style={{ width: '20%' }}
                placeholder="select an option key"
                onChange={onAnswerKeyChange}
                optionLabelProp="label"
                value={questionFields.answer}
              >
                {questionFields.options.map(option => (
                  <Option key={option.option_key} value={option.option_key} label={option.option_key}>
                    <div>{option.option_key}</div>
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div className="pb-2">
              {`Time duration: (min)`}
            </div>
            <div className="options p-4 d-flex align-items-center mb-4">
              <div className="mr-2">Value:</div>
              <Input
                type="number"
                name="time"
                min={1}
                max={1800}
                value={questionFields.time}
                style={{ width: '20%' }}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="actions-section d-flex align-items-center justify-content-end">
        <Button onClick={setQuestionAction} className="mr-2">Cancel</Button>
        <Button type="primary" onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

CreateQuestion.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setQuestionAction: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired
};

CreateQuestion.defaultProps = {
  questionId: null
};

export default CreateQuestion;
