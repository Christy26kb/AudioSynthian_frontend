import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Avatar, Spin } from 'antd';
import { UserOutlined, AudioOutlined } from '@ant-design/icons';
import { getMediaStream } from '../../../../utils/speechUtils';


import './styles.css';

class CandidateSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      recorder: null,
      recordedAudio: null,
      recordedAudioBlob: null
    };
  }

  onSignUp = () => {
    const { email, password, name, recordedAudioBlob } = this.state;
    const { onCandidateSignup } = this.props;
    const convertionSuccess = (base64Data) => {
      onCandidateSignup({ email, password, name, audio: base64Data });
    };
    if (recordedAudioBlob) this.convertToBase64(recordedAudioBlob, convertionSuccess);
    else onCandidateSignup({ email, password, name });
  };

  convertToBase64 = (blob, callback) => {
    let base64 = null;
    const reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      const dataUrl = reader.result;
      // eslint-disable-next-line prefer-destructuring
      base64 = dataUrl.split(',')[1];
      callback(dataUrl);
    };
    return base64;
  }

  onChange = (event) => {
    const { target: { value, name } } = event;
    this.setState({ [name]: value });
  };

  processMediaStream = (stream) => {
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      const audioChunks = [];
      audioChunks.push(event.data);
      let objectUrl = null;
      if (recorder.state === 'inactive') {
        const blob = new Blob(audioChunks, { type: 'audio/mpeg' });
        // TODO: Sent this blob data to server to authenticate and login the candidate to exam page.
        objectUrl = URL.createObjectURL(blob);
        this.setState({ recordedAudio: objectUrl, recordedAudioBlob: blob });
      }
    };
    this.setState({ recorder });
    recorder.start();
  };

  onVoiceAuthentication = () => {
    const { recorder } = this.state;
    if (!recorder) {
      const audiostreamOptions = {
        audio: {
          sampleRate: 48000,
          channelCount: 2,
          volume: 1.0,
          noiseSuppression: true
        }
      };
      getMediaStream(this.processMediaStream, audiostreamOptions);
    } else recorder.stop();
  };

  render() {
    const { email, password, name, recordedAudio, recorder } = this.state;

    return (
      <div className="full-content d-flex align-items-center flex-column pt-5">
        <div className="font-head-4 font-semi-bold mb-4">Candidate Registration</div>
        <Avatar
          size={88}
          icon={<UserOutlined />}
          className="mb-4"
          style={{ backgroundColor: '#40a9ff' }}
        />
        <div className="login-actions mt-4" style={{ width: 300 }}>
          <Input
            placeholder="Name"
            name="name"
            style={{ margin: 10 }}
            value={name}
            onChange={this.onChange}
          />
          <Input
            placeholder="Email"
            name="email"
            style={{ margin: 10 }}
            value={email}
            onChange={this.onChange}
          />
          <Input.Password
            placeholder="Password"
            name="password"
            style={{ margin: 10 }}
            value={password}
            onChange={this.onChange}
          />
          <div className="d-flex flex-column align-items-center">
            <div className="my-2">Voice based login (optional)</div>
            <AudioOutlined
              className="mb-4 p-3 mt-2"
              style={{ fontSize: 50, border: '1px solid grey', borderRadius: 50 }}
              onClick={this.onVoiceAuthentication}
            />
            {(() => {
              let voiceMetaElement = '';
              if (recordedAudio && recorder) {
                // eslint-disable-next-line jsx-a11y/media-has-caption
                voiceMetaElement = <audio style={{ outline: 'none' }} controls={true} src={recordedAudio} />;
              } else if (recorder) {
                voiceMetaElement = <Spin size="large" />;
              }
              return voiceMetaElement;
            })()}
          </div>
          <Button
            type="primary"
            size="large"
            loading={false}
            style={{ width: 300, marginTop: 10 }}
            onClick={this.onSignUp}
            disabled={!(email && password && name)}
          >
            Signup
          </Button>
        </div>
      </div>
    );
  }
}

CandidateSignup.propTypes = {
  onCandidateSignup: PropTypes.func.isRequired
};

export default CandidateSignup;
