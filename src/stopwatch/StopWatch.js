import React, {useState, useRef, useEffect} from "react";
import s from './StopWatch.module.css'
import Button from '@mui/material/Button';

export default function Timer() {
    const [centiseconds, setCentiseconds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useInterval(() => {
        if (!timerOn) return;

        setCentiseconds((centiseconds) =>
            centiseconds === 99 ? 0 : centiseconds + 1
        );
    }, 10);
    useInterval(() => {
        if (!timerOn) return;

        setSeconds((seconds) => (seconds === 59 ? 0 : seconds + 1));
    }, 1000);

    useInterval(() => {
        if (!timerOn) return;

        setMinutes((minutes) => (minutes === 59 ? 0 : minutes + 1));
    }, 60000);

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/-
    // The Hook made by Den Abramov:
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }


    return (
        <div className={s.WatchBackground}>
            <div className={s.clock}>
                <div className={s.time}>
                    {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}{" "}
                    : {String(centiseconds).padStart(2, "0")}
                </div>
                <span className={s.buttons}>
                {timerOn === false && (
                    <Button color="success" variant="contained" onClick={() => setTimerOn(true)}>Start</Button>
                )}
                    {timerOn === true && (
                        <Button color="success" variant="contained" onClick={() => setTimerOn(false)}>Stop</Button>
                    )}
                      </span>
                <span className={s.buttons}>
              <Button variant="contained"
                      color="success"
                      onClick={() => {
                  setTimerOn(false);
                  setCentiseconds(0);
                  setSeconds(0);
                  setMinutes(0);
              }}>Reset</Button>
                </span>

            </div>
        </div>
    );
}



