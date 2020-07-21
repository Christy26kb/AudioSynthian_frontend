import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notification, Input, Select, Button, Modal, Result } from 'antd';
import { initTextToSpeech, initSpeechToText } from '../../../../utils/speechUtils';

const { TextArea } = Input;
const { Option } = Select;

const Question = (props) => {
  const { questions, questionFields, onSwitchQuestions, updateCandidateAnswer, userInteractionMode,
    examConfigs, emailConfigs, onExamComplete } = props;
  const defaultRecognizerResult = { transcript: '', confidence: '' };
  const [speechRecognizerResult, setSpeechRecognizerResult] = useState(defaultRecognizerResult);
  const [speechRecognizer, setSpeechRecognizer] = useState(null);
  const [speechRecognizerError, setSpeechRecognizerError] = useState(null);
  // const [adminPassword, setAdminPassword] = useState('');
  const [isExamComplete, setExamComplete] = useState(false);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    // TODO: Need to handle unmount case to clear or stop speech sythesis and recognition if running.
    return () => {
      // To reroute to preferences when reloaded.
      // props.history.push('/preferences');
    };
  }, []);

  useEffect(() => {
    if (questionFields) {
      if (userInteractionMode === 'voice') {
        // To clear results when moving back and forth between questions.
        setSpeechRecognizerResult({ transcript: '', confidence: '' });
        setSpeechRecognizerError(null);
        // Initializing each question module.
        const questionString = constructQuestionText(questionFields);
        onStartSpeechSythesis(questionString, onCompleteSpeechSynthesis);
      }
    }
  }, [questionFields]);

  const constructQuestionText = (currentQuestion) => {
    let questionText = `${currentQuestion.question}. Your options.`;
    if (currentQuestion.options.length > 0) {
      // eslint-disable-next-line no-return-assign
      currentQuestion.options.forEach(option => questionText += `option ${option.option_key}. ${option.option_value}.`);
    }
    return questionText;
  };

  const onCompleteSpeechSynthesis = (event) => {
    if (event.type === 'end') {
      onStartSpeechRecognization();
    }
  };

  const onStartSpeechSythesis = (transcript, onComplete) => {
    const speechSythesizerConfigs = {
      message: transcript,
      onEnd: onComplete
    };
    const { speechSynthesizer, synthesizedSpeech } = initTextToSpeech(speechSythesizerConfigs);
    speechSynthesizer.speak(synthesizedSpeech);
  };

  const initSpeechRecognition = () => {
    const speechRecognizerConfig = {
      isContinous: false,
      onStart: () => {},
      onEnd: () => setSpeechRecognizer(null),
      onResult: event => onSpeechTranscriptChange(event, speechAnwserValidator),
      onError: onSpeechRecognizationError,
      onNoMatch: () => {}
    };
    return initSpeechToText(speechRecognizerConfig);
  };

  const onStartSpeechRecognization = () => {
    if (!speechRecognizer) {
      // Initial case will init the speechRecognizer module with params.
      const recognizer = initSpeechRecognition();
      recognizer.start();
      setSpeechRecognizer(recognizer);
      setSpeechRecognizerError(null);
      const notificationData = {
        type: 'info',
        title: 'Voice recognition started',
        description: 'Try to place the microphone close to your mouth, while talking!'
      };
      showNotification(notificationData);
    }
  };

  const onSpeechTranscriptChange = (event, resultCallback) => {
    const { transcript, confidence } = event.results[event.results.length - 1][0];
    setSpeechRecognizerResult({ transcript, confidence });
    resultCallback(transcript, confidence);
  };

  const onSpeechRecognizationError = (error) => {
    // TODO: Need to handle when no answer is being chosen until wait time or any other error throws.
    // Reset errors, recognizer and maybe repeat the question again.
    setSpeechRecognizerError(error);
    if (error) {
      const notificationData = {
        type: 'error',
        title: 'Some issues with voice recognition',
        description: error.message
      };
      showNotification(notificationData);
    }
  };

  const speechAnwserValidator = (resultString, confidence) => {
    const updatedResultString = resultString ? resultString.toLowerCase().trim() : '';
    if (confidence > 0.6) {
      const extractedAnswerKey = updatedResultString.substring(7, updatedResultString.length);
      const isOptionsMatch = questionFields.options.some(item => item.option_key === extractedAnswerKey);
      if (isOptionsMatch) {
        // Setting data to exam configs.
        updateCandidateAnswer(questionFields.id, extractedAnswerKey);
        const notificationData = {
          type: 'success',
          title: 'Success',
          description: 'Your answer has been successfully registered!'
        };
        showNotification(notificationData);
        setSpeechRecognizer(null);

        // Successfully registered answer and moving to next question, after propmting the user.
        // TODO: Need to swicth b/w questions automatically based on questions data and direction.
        if (isCurrentQuestionPosition('last')) {
          // If current question is the last one. winding up the exam.
          onStartSpeechSythesis(
            'Your answer has been successfully registered. And you had successfully completed the exam.'
            + 'Exam results will be sent to your registered email.'
            + 'Contact your admin for further actions. Thank you',
            () => setExamComplete(true)
          );
        } else {
          // If there are more questions to move forward.
          onStartSpeechSythesis(
            'Your answer has been successfully registered. Moving to the next question.',
            () => onSwitchQuestions('forward')
          );
        }
      } else onUnRecognizedSpeech();
    } else {
      // If confidence level of answer is below a certain threshold repeating the question process again.
      onStartSpeechSythesis(
        'I didnt get you. Can you move the mic closer to your mouth, and try again.',
        onCompleteSpeechSynthesis
      );
    }
  };

  const onUnRecognizedSpeech = () => {
    // TODO: Need to revamp.
    const notificationData = {
      type: 'warning',
      title: 'Unrecognized speech',
      description: 'Answer key does not match among the available options.'
    };
    showNotification(notificationData);
    // TODO: Need to read the question again, and start recognition or just start recognition.
    onStartSpeechSythesis(
      'Answer key does not match among the available options. Can you try once again',
      onCompleteSpeechSynthesis
    );
  };

  const isCurrentQuestionPosition = (section) => {
    const currentQuestionIndex = (questions && questions.length > 0
      && questions.findIndex(question => question.id === questionFields.id));
    const isAvail = section === 'last' ? (currentQuestionIndex === (questions.length - 1))
      : (currentQuestionIndex === 0);
    return isAvail;
  };

  const showNotification = (notificationData) => {
    const { type, title, description } = notificationData;
    notification[type]({
      message: title,
      description
    });
  };

  const renderOptionItem = (option, optionIndex) => (
    <div className="d-flex align-items-center justify-content-between mb-2" key={optionIndex}>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <div className="mr-2">Option:</div>
          <Input
            style={{ width: '60%' }}
            value={option.option_key || ''}
            disabled={true}
          />
        </div>
        <div className="full-content d-flex align-items-center">
          <div className="mr-2">Content:</div>
          <TextArea
            style={{ height: 30, width: '80%' }}
            value={option.option_value || ''}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );

  const getCandidateAnswer = () => {
    let answer = '';
    if (questionFields && questionFields.id) {
      const candidateAnswer = examConfigs.result.find(result => result.id === questionFields.id);
      answer = candidateAnswer && candidateAnswer.value ? candidateAnswer.value : '';
    }
    return answer;
  };

  const submit = () => {
    const score = examConfigs.result.reduce((acc, result) => {
      const currentQuestion = questions.find(question => question.id === result.id);
      if (currentQuestion) {
        const correctAnswer = currentQuestion.answer.trim().toLowerCase();
        const candidateAnswer = result.value.trim().toLowerCase();
        if (correctAnswer === candidateAnswer) {
          // eslint-disable-next-line no-param-reassign
          acc += 1;
        }
      }
      return acc;
    }, 0);
    const data = {
      ...examConfigs,
      ...emailConfigs,
      candidateScore: score,
      totalScore: questions.length ? questions.length : 0
    };
    onExamComplete(data);
  };

  return (
    <>
      <div className="full-content d-flex flex-column justify-content-between">
        <div className="py-2">
          <div className="pb-2">Question:</div>
          <TextArea style={{ height: 30 }} value={questionFields.question} disabled={true} />
        </div>
        <div className="mb-4">
          <div className="pb-2">Options:</div>
          <div className="options p-4">
            {questionFields.options && questionFields.options.map(renderOptionItem)}
          </div>
        </div>
        <div className="mb-4">
          <div className="pb-2">Answer:</div>
          <div className="options p-4 d-flex align-items-center mb-4">
            <div className="mr-2">Option Key:</div>
            <Select
              name="answer"
              style={{ width: '20%' }}
              placeholder="select an option key"
              onChange={value => updateCandidateAnswer(questionFields.id, value)}
              optionLabelProp="label"
              // TODO: Use answer key data from store to persist answer while moving b/w the questions.
              value={getCandidateAnswer() || ''}
            >
              {questionFields.options && questionFields.options.map(option => (
                <Option key={option.option_key} value={option.option_key} label={option.option_key}>
                  <div>{option.option_key}</div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {userInteractionMode === 'voice' && (
          <div className="font-semi-bold">
            <div className="mb-1">
              {`Diagnosis: ${(speechRecognizerResult.transcript || speechRecognizerError) || ' ...'}`}
            </div>
            <div>
              {`Confidence: ${(speechRecognizerResult.confidence || speechRecognizerError) || ' ...'}`}
            </div>
          </div>)}
        <div className="d-flex align-items-center justify-content-end">
          <Button
            className="mr-2"
            style={{ width: 100 }}
            onClick={() => onSwitchQuestions('backward')}
            disabled={isCurrentQuestionPosition('first')}
          >
            Previous
          </Button>
          <Button
            className="mr-2"
            style={{ width: 100 }}
            onClick={() => onSwitchQuestions('forward')}
            disabled={isCurrentQuestionPosition('last')}
          >
            Next
          </Button>
          {userInteractionMode === 'action' && (
            <Button
              type="primary"
              style={{ width: 150 }}
              onClick={() => setExamComplete(true)}
            >
              Done
            </Button>
          )}
        </div>
      </div>
      <Modal
        className="p-4"
        closable={false}
        visible={isExamComplete}
        centered={true}
        footer={null}
        width="80%"
      >
        <Result
          status="success"
          title="Exam Successfully Completed"
          subTitle="Exam results will be sent to your registered email. Contact your admin for further actions"
          // extra={[
          //   <Input.Password
          //     style={{ width: '40%' }}
          //     value={adminPassword}
          //     onChange={e => setAdminPassword(e.target.value)}
          //     placeholder="Admin password"
          //   />,
          //   <Button type="primary" onClick={submit}>
          //     Submit
          //   </Button>
          // ]}
        />
        {isExamComplete && submit()}
      </Modal>
    </>
  );
};

Question.propTypes = {
  userInteractionMode: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  questionFields: PropTypes.shape({}).isRequired,
  examConfigs: PropTypes.shape({}).isRequired,
  emailConfigs: PropTypes.shape({}).isRequired,
  onSwitchQuestions: PropTypes.func.isRequired,
  updateCandidateAnswer: PropTypes.func.isRequired,
  onExamComplete: PropTypes.func.isRequired
};

export default withRouter(Question);
