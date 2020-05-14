import registry from 'app-registry';
import { put } from 'redux-saga/effects';

export function* createQuestion(action) {
  const request = registry.get('request');
  const { data } = action;

  try {
    const url = '/question';
    const requestArgs = {
      API_CALL: { method: 'POST', data },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTIONS:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* fetchQuestions() {
  const request = registry.get('request');

  try {
    const url = '/question';
    const requestArgs = {
      API_CALL: { method: 'GET' },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTIONS:SET', data: response.data.result });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* updateQuestion(action) {
  const request = registry.get('request');
  const { data } = action;

  try {
    const url = '/question';
    const requestArgs = {
      API_CALL: { method: 'PUT', data },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTIONS:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* deleteQuestion(action) {
  const request = registry.get('request');
  const { id } = action;

  try {
    const url = `/question/?id=${id}`;
    const requestArgs = {
      API_CALL: { method: 'DELETE' },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTIONS:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* createQuestionSet(action) {
  const request = registry.get('request');
  const { data } = action;

  try {
    const url = '/questionset';
    const requestArgs = {
      API_CALL: { method: 'POST', data },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTION_SETS:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* fetchQuestionSets() {
  const request = registry.get('request');

  try {
    const url = '/questionset';
    const requestArgs = {
      API_CALL: { method: 'GET' },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTION_SETS:SET', data: response.data.result });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* updateQuestionSet(action) {
  const request = registry.get('request');
  const { data } = action;

  try {
    const url = '/questionset';
    const requestArgs = {
      API_CALL: { method: 'PUT', data },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTION_SETS:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}

export function* deleteQuestionSet(action) {
  const request = registry.get('request');
  const { id } = action;

  try {
    const url = `/questionset/?id=${id}`;
    const requestArgs = {
      API_CALL: { method: 'DELETE' },
      url,
      isAuthRequired: false
    };
    const response = yield request(requestArgs);
    switch (response.status) {
      case 200:
        yield put({ type: 'QUESTION_SETS:FETCH' });
        break;
      default:
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
  }
}
