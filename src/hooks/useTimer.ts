import { useCallback, useEffect, useState } from "react";

interface TimerHook {
  seconds: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  change: (seconds: number) => void;
}

export default function useTimer(initialTime: number, autostart: boolean = false): TimerHook {
  const [ticking, setTicking] = useState(autostart);
  const [seconds, setSeconds] = useState(initialTime);

  const start = useCallback(() => setTicking(true), []);

  const stop = useCallback(() => setTicking(false), []);

  const reset = useCallback(() => {
    setTicking(false);
    setSeconds(initialTime);
  }, [initialTime]);

  const change = useCallback((seconds: number) => {
    if (seconds > 0) {
      setSeconds(seconds);
    }
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (ticking) {
      timerId = setInterval(() => {
        setSeconds((s) => {
          if (s - 1 <= 0) {
            stop();
          }
          return s - 1;
        });
      }, 1000);
    }

    return () => timerId && clearInterval(timerId);
  }, [stop, ticking]);

  return {
    seconds,
    start,
    stop,
    reset,
    change,
  };
}
