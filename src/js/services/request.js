import axios from 'axios';
import { replace as replaceRouter } from 'react-router-redux';
import registry from 'app-registry';
import { store } from '../store';

const isAuthTokenValid = authToken => (authToken === null || authToken === '');

export default function* request(payload) {
  const { API_CALL, url, isAuthRequired = true } = payload;

  // Reading API configs from config/env
  const config = registry.get('config');
  const API_URL = `${config.api_endpoint}${url}`;

  // Reading auth-token from local storage
  const authToken = isAuthRequired && (registry.get('storage').get('auth-token'));

  // Re-routing to login if not authorized
  if (isAuthRequired && isAuthTokenValid(authToken)) {
    store.dispatch(replaceRouter('/login'));
    return null;
  }

  // Setting API parameters
  const apiParams = {
    ...API_CALL,
    url: API_URL,
    ...(isAuthRequired && { headers: { Authorization: authToken } })
  };

  try {
    // Make API call
    const apiResponse = yield axios(apiParams);
    const { data, status } = apiResponse;
    // Transforning response data to only required fields.
    const responseData = { status, data };
    if (apiResponse) {
      // API call success
      return responseData;
    }
  } catch (err) {
    // API call failure
    let errMessage = err.message;
    if (err.response) {
      errMessage = err.response.data.message || err.response.data.error.message;
    }
    // Logging the error
    registry.get('logger').info(`The API ${API_URL} returned this error:`, JSON.stringify(errMessage));
    return { status: err.response.status, message: errMessage };
  }
  return null;
}
