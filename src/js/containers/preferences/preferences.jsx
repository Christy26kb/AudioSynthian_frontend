import React from 'react';
import PropTypes from 'prop-types';
import { Steps, notification, Select, Button, Input, Radio, Spin } from 'antd';
import { UserOutlined, SolutionOutlined, SettingOutlined, AudioOutlined } from '@ant-design/icons';
import { getMediaStream } from '../../utils/speechUtils';

const { Step } = Steps;
const { Option } = Select;
const stepsData = ['settings', 'details', 'login'];

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: {
        settings: 'finish',
        details: 'finish',
        login: 'finish'
      },
      activeStep: 'settings',
      recorder: null,
      recordedAudio: null
    };
  }

  componentDidMount() {
    this.props.fetchQuestionSets();
    this.props.fetchQuestions();
  }

  showNotification = (notificationData) => {
    const { type, title, description } = notificationData;
    notification[type]({
      message: title,
      description
    });
  };

  renderSettingsContent = () => {
    const { examConfigs, questionSets, onUpdateExamConfigs, userInteractionMode,
      onInteractionModeChange } = this.props;
    return (
      <div className="options full-content p-4">
        <div className="mb-4">
          <div className="mb-2">Question Sets:</div>
          <div className="d-flex align-items-center">
            <Select
              name="question_set"
              style={{ width: '20%' }}
              placeholder="Select"
              onChange={value => onUpdateExamConfigs({ ...examConfigs, questionSet: value })}
              optionLabelProp="label"
              value={examConfigs.questionSet}
            >
              {questionSets.map(set => (
                <Option key={set.id} value={set.id} label={set.title}>
                  <div>{set.title}</div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <div className="mb-2">User Interaction Mode:</div>
          <Radio.Group
            onChange={event => onInteractionModeChange(event.target.value)}
            value={userInteractionMode}
          >
            <Radio value="action">By Action</Radio>
            <Radio value="voice">By Voice Commands</Radio>
          </Radio.Group>
        </div>
      </div>
    );
  };

  onEmailConfigsChange = (event) => {
    const { emailConfigs, onUpdateEmailConfigs } = this.props;
    const { value } = event.target;
    const modifiedEmailConfigs = { ...emailConfigs, [event.target.name]: value };
    onUpdateEmailConfigs(modifiedEmailConfigs);
  };

  renderDetailsContent = () => {
    const { emailConfigs } = this.props;
    return (
      <div className="options p-4">
        <div className="py-2">
          <div className="pb-2">
            {`Admin's Email: (to send the detailed exam results)`}
          </div>
          <Input
            style={{ height: 30, width: 350 }}
            name="adminEmail"
            value={emailConfigs.adminEmail || ''}
            onChange={this.onEmailConfigsChange}
          />
        </div>
        <div className="py-2">
          <div className="pb-2">
            {`Candidate's Email: (to notify candidate about the score)`}
          </div>
          <Input
            style={{ height: 30, width: 350 }}
            name="candidateEmail"
            value={emailConfigs.candidateEmail || ''}
            onChange={this.onEmailConfigsChange}
          />
        </div>
      </div>
    );
  }

  onExamConfigsChange = (event) => {
    const { examConfigs, onUpdateExamConfigs } = this.props;
    const { value } = event.target;
    const modifiedExamConfigs = { ...examConfigs, [event.target.name]: value };
    onUpdateExamConfigs(modifiedExamConfigs);
  };

  onLogin = () => {
    const { onCandidateActionLogin, examConfigs } = this.props;
    // TODO: Need to add voice and action based login actions.
    onCandidateActionLogin(examConfigs.candidateUsername, examConfigs.candidatePassword);
  };

  processMediaStream = (stream) => {
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      const audioChunks = [];
      audioChunks.push(event.data);
      let objectUrl = null;
      if (recorder.state === 'inactive') {
        const blob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
        // TODO: Sent this blob data to server to authenticate and login the candidate to exam page.
        objectUrl = URL.createObjectURL(blob);
        this.setState({ recordedAudio: objectUrl });
      }
    };
    this.setState({ recorder });
    recorder.start();
  };

  onVoiceAuthentication = () => {
    const { recorder } = this.state;
    if (!recorder) getMediaStream(this.processMediaStream);
    else recorder.stop();
  };

  renderCandidateLogin = () => {
    const { examConfigs, userInteractionMode } = this.props;
    const { recorder, recordedAudio } = this.state;
    return (
      <div className="options p-5 d-flex-center flex-column">
        {userInteractionMode === 'action' ? (
          <div>
            <div className="py-2">
              <div className="pb-2">
                {`Username: (email address)`}
              </div>
              <Input
                placeholder="Username"
                style={{ height: 30, width: 350 }}
                name="candidateUsername"
                value={examConfigs.candidateUsername || ''}
                onChange={this.onExamConfigsChange}
              />
            </div>
            <div className="py-2">
              <div className="pb-2">
                {`Password:`}
              </div>
              <Input.Password
                placeholder="Password"
                style={{ height: 30, width: 350 }}
                name="candidatePassword"
                value={examConfigs.candidatePassword || ''}
                onChange={this.onExamConfigsChange}
              />
            </div>
            <Button
              type="primary"
              className="mt-2"
              style={{ width: 350 }}
              disabled={!(examConfigs.candidateUsername && examConfigs.candidatePassword)}
              onClick={this.onLogin}
            >
              Login
            </Button>
          </div>)
          : (
            <div className="d-flex flex-column align-items-center">
              <div className="font-head-5 pb-4">Voice Authentication</div>
              <AudioOutlined
                className="mb-4"
                style={{ fontSize: 50 }}
                onClick={this.onVoiceAuthentication}
              />
              {(() => {
                let voiceMetaElement = '';
                if (recordedAudio && recorder) {
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  voiceMetaElement = <audio style={{ outline: 'none' }} controls={true} src={recordedAudio} />;
                } else if (recorder) voiceMetaElement = <Spin size="large" />;
                return voiceMetaElement;
              })()}
            </div>
          )}
      </div>
    );
  }

  onSwitchSteps = (direction) => {
    const { activeStep } = this.state;
    const currentStepIndex = stepsData.findIndex(step => activeStep === step);
    const updatedActiveStep = direction === 'forward'
      ? stepsData[currentStepIndex + 1] : stepsData[currentStepIndex - 1];
    this.setState({ activeStep: updatedActiveStep });
    // TODO: Need to handle states of steps.
  };

  render() {
    const { steps, activeStep } = this.state;
    return (
      <div className="full-content p-5">
        <div
          className="font-head-4 font-semi-bold pb-3 mb-4"
          style={{ borderBottom: '1px solid #e5e2e2' }}
        >
          Preferences
        </div>
        <div className="d-flex flex-column justify-content-between" style={{ height: '90%' }}>
          <div style={{ width: '100%' }}>
            <Steps>
              <Step status={steps.settings} title="Settings" icon={<SettingOutlined />} />
              <Step status={steps.details} title="Details" icon={<SolutionOutlined />} />
              <Step status={steps.login} title="Candidate Login" icon={<UserOutlined />} />
            </Steps>
            <div style={{ height: '80%' }} className="mt-4">
              {(() => {
                switch (activeStep) {
                  case 'settings':
                    return this.renderSettingsContent();
                  case 'details':
                    return this.renderDetailsContent();
                  case 'login':
                    return this.renderCandidateLogin();
                  default:
                    return '';
                }
              })()}
            </div>
          </div>
          <div className="actions-section d-flex align-items-center justify-content-end">
            <Button
              className="mr-2"
              onClick={() => this.onSwitchSteps('backward')}
              disabled={stepsData.findIndex(step => step === activeStep) === 0}
            >
              Previous
            </Button>
            <Button
              type="primary"
              onClick={() => this.onSwitchSteps('forward')}
              disabled={stepsData.findIndex(step => step === activeStep) === (stepsData.length - 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Preferences.contextTypes = {
  router: PropTypes.shape({}).isRequired
};

Preferences.propTypes = {
  userInteractionMode: PropTypes.string.isRequired,
  questionSets: PropTypes.arrayOf(PropTypes.shape({})),
  examConfigs: PropTypes.shape({}).isRequired,
  emailConfigs: PropTypes.shape({}).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  fetchQuestionSets: PropTypes.func.isRequired,
  onUpdateExamConfigs: PropTypes.func.isRequired,
  onUpdateEmailConfigs: PropTypes.func.isRequired,
  onInteractionModeChange: PropTypes.func.isRequired,
  onCandidateActionLogin: PropTypes.func.isRequired
};

Preferences.defaultProps = {
  questionSets: []
};

export default Preferences;
