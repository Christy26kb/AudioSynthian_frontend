import registry from 'app-registry';
import { replace as replaceRouter } from 'react-router-redux';
import { put } from 'redux-saga/effects';
import { notification } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export function* processExamResults(action) {
  const request = registry.get('request');

  const { candidateScore, questionSet, totalScore, adminEmail, candidateEmail } = action.data;
  try {
    const data = {
      questionSet,
      totalScore,
      candidateScore,
      adminEmail,
      candidateEmail
    };
    const url = `/mail`;
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
          description: 'Exam results processed successfully'
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
