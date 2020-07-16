import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if(replace) {
      setMode(mode);
    } else {
      setMode(mode)
      setHistory([...history, mode])
    }
  };

  function back() {
    if(history.length === 1) {
      setMode(initial)
    } else {
      setMode(history[history.length - 2]);
      history.pop();
      setHistory(history);
    }
  };

  return{ mode, transition, back };
};