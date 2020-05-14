// Basic WebSpeech API utility methods.

const isSpeechRecognitionSupported = () => ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
const isSpeechSynthesisSupported = () => ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);

const getMediaStream = (streamCallback, options = { audio: true }) => {
  navigator.mediaDevices.getUserMedia(options).then(streamCallback);
};

const initSpeechToText = (params) => {
  const {
    isContinous,
    isPartialResults = false,
    onStart,
    onResult,
    onNoMatch,
    onError,
    onEnd
  } = params;

  // Constructing grammer for recognizer.
  const speechRecognitionList = new window.webkitSpeechGrammarList() || window.SpeechGrammarList();
  const options = ['a', 'b', 'c', 'd'];
  const grammar = `#JSGF V1.0; grammar options; public <option> = '${options.join(' | ')}'`;
  speechRecognitionList.addFromString(grammar, 1);

  // Initialize
  const speechRecognizer = new window.webkitSpeechRecognition() || window.SpeechRecognition();

  // Properties
  // TODO: Need to setup grammers passed in as parameters;
  // speechRecognizer.grammars = speechRecognitionList;
  speechRecognizer.continuous = isContinous;
  speechRecognizer.interimResults = isPartialResults;

  // Callback Listeners
  speechRecognizer.onstart = onStart;
  speechRecognizer.onresult = onResult;
  speechRecognizer.onnomatch = onNoMatch;
  speechRecognizer.onerror = onError;
  speechRecognizer.onend = onEnd;

  return speechRecognizer;
};

const initTextToSpeech = (params) => {
  const { message, onEnd } = params;

  const speechSynthesizer = window.speechSynthesis;

  // Initialize speech speech-synthesis.
  const speechSynthesis = new SpeechSynthesisUtterance(message);

  // Collecting available voices.
  // Note: some voices don't support altering params
  // const voices = window.speechSynthesis.getVoices();
  // speechSynthesis.voice = voices[10];

  speechSynthesis.voiceURI = 'native';
  speechSynthesis.volume = 1; // 0 to 1
  speechSynthesis.rate = 1; // 0.1 to 10
  speechSynthesis.pitch = 1; // 0 to 2
  speechSynthesis.lang = 'en-US';

  // Callback Listeners
  // TODO: Adds the basic callback states
  speechSynthesis.onend = onEnd;

  return { speechSynthesizer, synthesizedSpeech: speechSynthesis };
};

export {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  initSpeechToText,
  initTextToSpeech,
  getMediaStream
};
