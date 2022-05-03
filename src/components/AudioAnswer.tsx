import { Button, IconButton, Grid } from "@mui/material";

import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Delete } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import slugify from "slugify";

interface AudioAnswerI {
  correctWord: string;
  onSuccess: () => void;
}
const AudioAnswer: React.FC<AudioAnswerI> = ({ correctWord, onSuccess }) => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({
    //   commands: {
    //   }
  });
  const [isCorrect, setIsCorrect] = useState(false);
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "es-MX" });
  };

  useEffect(() => {
    if (slugify(transcript).includes(slugify(correctWord))) {
      const timeout = setTimeout(() => {
        onSuccess && onSuccess();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [transcript]);

  useEffect(() => {
    resetTranscript();
    setIsCorrect(false);
  }, [correctWord]);
  const toggleListening = () => {
    if (listening) SpeechRecognition.stopListening();
    else startListening();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          onClick={toggleListening}
          variant={listening ? "contained" : "outlined"}
          color={listening ? "warning" : "primary"}
        >
          Hablar
        </Button>
        <IconButton onClick={resetTranscript}>
          <Delete />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <p>
          {transcript
            .split(" ")
            .map((word) =>
              word === correctWord ? <b>{word} </b> : <span>{word} </span>
            )}
        </p>
      </Grid>
    </Grid>
  );
};

export default AudioAnswer;
