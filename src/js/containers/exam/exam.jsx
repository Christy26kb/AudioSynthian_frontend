import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import Question from './components/question';

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      activeQuestion: null
    };
  }

  componentDidMount() {
    const { examConfigs } = this.props;
    if (examConfigs.questionSet) {
      const questions = this.getQuestionsFromQuestionSet(examConfigs.questionSet);
      this.setState({ questions, activeQuestion: questions.length > 0 ? questions[0] : null });
    }
  }

  getQuestionsFromQuestionSet(questionSetId) {
    const { questionSets, questions } = this.props;
    const selectedQuestionSet = questionSets.find(questionSet => questionSet.id === questionSetId);
    if (selectedQuestionSet) {
      const enabledQuestions = selectedQuestionSet.questions.reduce((acc, questionId) => {
        const currentQuestion = questions.find(question => question.id === questionId);
        if (currentQuestion) return acc.concat(currentQuestion);
        return acc;
      }, []);
      return enabledQuestions;
    }
    return [];
  }

  showNotification = (notificationData) => {
    const { type, title, description } = notificationData;
    notification[type]({
      message: title,
      description
    });
  };

  onSwitchQuestions = (direction) => {
    const { activeQuestion, questions } = this.state;
    const currentQuestionIndex = questions.findIndex(question => question.id === activeQuestion.id);
    let updatedActiveQuestion = questions[currentQuestionIndex];

    if (direction === 'forward' && questions[currentQuestionIndex + 1]) {
      updatedActiveQuestion = questions[currentQuestionIndex + 1];
    } else if (direction === 'backward' && questions[currentQuestionIndex - 1]) {
      updatedActiveQuestion = questions[currentQuestionIndex - 1];
    }
    this.setState({ activeQuestion: updatedActiveQuestion });
  };

  updateCandidateAnswer = (questionId, value) => {
    const { examConfigs, updateExamConfigs } = this.props;
    const updatedResults = [...examConfigs.result];
    const currentQuestionIndex = updatedResults.findIndex(result => result.id === questionId);
    if (currentQuestionIndex !== -1) {
      updatedResults.splice(currentQuestionIndex, 1, { id: questionId, value });
    } else {
      updatedResults.push({ id: questionId, value });
    }
    updateExamConfigs({ ...examConfigs, result: updatedResults });
  };

  render() {
    const { activeQuestion, questions } = this.state;
    const { userInteractionMode } = this.props;
    return (
      <div className="full-content d-flex flex-column align-items-center p-5">
        {activeQuestion && (
          <div className="full-content">
            <Question
              questions={questions}
              questionFields={activeQuestion}
              onSwitchQuestions={this.onSwitchQuestions}
              updateCandidateAnswer={this.updateCandidateAnswer}
              userInteractionMode={userInteractionMode}
            />
          </div>)}
      </div>
    );
  }
}

Exam.contextTypes = {
  router: PropTypes.shape({}).isRequired
};

Exam.propTypes = {
  userInteractionMode: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  questionSets: PropTypes.arrayOf(PropTypes.shape({})),
  examConfigs: PropTypes.shape({}).isRequired,
  updateExamConfigs: PropTypes.func.isRequired
};

Exam.defaultProps = {
  questions: [],
  questionSets: []
};

export default Exam;
