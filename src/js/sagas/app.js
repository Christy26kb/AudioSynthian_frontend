import registry from 'app-registry';
import { replace as replaceRouter } from 'react-router-redux';
import { put } from 'redux-saga/effects';
import { notification } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export function* fetchCurrentUser(action) {
  const request = registry.get('request');

  const { username, password } = action;
  try {
    const data = {
      type: 'admin',
      email: username,
      password
    };
    const url = `/login`;
    const requestArgs = {
      API_CALL: { method: 'POST', data },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);

    switch (response.status) {
      case 200: {
        // TODO Need to setup localstorage variable here for admin auth verify to use.
        yield put({ type: 'CURRENT_USER:SET', data: response.data.result });
        notification.success({
          message: 'Success',
          description: 'Login successful'
        });
        yield put(replaceRouter('/dashboard'));
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
