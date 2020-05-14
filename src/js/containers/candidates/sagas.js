import registry from 'app-registry';
import { replace as replaceRouter } from 'react-router-redux';
import { put } from 'redux-saga/effects';
import { notification } from 'antd';

export function* candidateActionLogin(action) {
  const request = registry.get('request');
  const { email, password } = action;

  try {
    const data = {
      type: 'candidate',
      email,
      password
    };
    const url = '/login';
    const requestArgs = {
      API_CALL: { method: 'POST', data },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200: {
        notification.success({
          message: 'Success',
          description: 'Candidate login successful'
        });
        yield put(replaceRouter('/exam'));
        break;
      }
      case 400:
        notification.error({ message: response.message });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* fetchCandidates() {
  const request = registry.get('request');

  try {
    const url = '/candidate';
    const requestArgs = {
      API_CALL: { method: 'GET' },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'CANDIDATES:SET', data: response.data.result });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* deleteCandidate(action) {
  const request = registry.get('request');
  const { id } = action;

  try {
    const url = `/candidate/?id=${id}`;
    const requestArgs = {
      API_CALL: { method: 'DELETE' },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'CANDIDATES:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}
