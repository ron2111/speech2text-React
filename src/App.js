import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import React, { useState } from "react";
// import { Container, Segment } from "semantic-ui-react";
import "./App.css";
import { useSpeechSynthesis } from "react-speech-kit";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();

  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  //T2S
  const [text, setText] = useState("");
  const { speak } = useSpeechSynthesis();

  const handleOnClick = () => {
    speak({ text: text });
  };

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>
          Speech-2-Text | Text-2-Speech <br />
          Converter
        </h2>
        <br />
        <p>
          Continous Sentiment Analysis using Natural Language Processing to be
          implemented soon..
        </p>
        <div className="main-content">
          <div
            className="min-container"
            onClick={() => setTextToCopy(transcript)}
          >
            {transcript}
          </div>

          <textarea
            className="min-container"
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Write anything?"
          ></textarea>
        </div>
        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
          <button
            onClick={() => {
              handleOnClick();
            }}
          >
            Text-2-Speech
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
