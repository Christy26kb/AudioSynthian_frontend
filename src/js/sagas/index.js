import { all, takeLatest } from 'redux-saga/effects';
import { fetchCurrentUser } from './app';
import { candidateActionLogin, candidateSignup, fetchCandidates,
  deleteCandidate } from '../containers/candidates/sagas';
import { createQuestion, fetchQuestions, updateQuestion, deleteQuestion,
  createQuestionSet, fetchQuestionSets, updateQuestionSet, deleteQuestionSet } from '../containers/dashboard/sagas';
import { processExamResults } from '../containers/exam/sagas';

const sagas = [
  // App
  [takeLatest, 'CURRENT_USER:FETCH', fetchCurrentUser],
  // Candidates
  [takeLatest, 'CANDIDATE:SIGNUP', candidateSignup],
  [takeLatest, 'CANDIDATE_ACTION:LOGIN', candidateActionLogin],
  [takeLatest, 'CANDIDATES:FETCH', fetchCandidates],
  [takeLatest, 'CANDIDATE:DELETE', deleteCandidate],
  // Questions
  [takeLatest, 'QUESTIONS:FETCH', fetchQuestions],
  [takeLatest, 'QUESTION:CREATE', createQuestion],
  [takeLatest, 'QUESTION:UPDATE', updateQuestion],
  [takeLatest, 'QUESTION:DELETE', deleteQuestion],
  // Question Sets
  [takeLatest, 'QUESTION_SETS:FETCH', fetchQuestionSets],
  [takeLatest, 'QUESTION_SET:CREATE', createQuestionSet],
  [takeLatest, 'QUESTION_SET:UPDATE', updateQuestionSet],
  [takeLatest, 'QUESTION_SET:DELETE', deleteQuestionSet],
  // Exam
  [takeLatest, 'EXAM:COMPLETE', processExamResults]
];

function* rootSaga() {
  yield all([
    sagas.map(saga => function* () {
      yield saga[0](saga[1], saga[2]);
    }).map(saga => saga.call())
  ]);
}

export default rootSaga;
