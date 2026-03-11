import { useEffect, useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState("study");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [studySessions, setStudySessions] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const catImage =
    "https://i.pinimg.com/736x/a9/1c/f1/a91cf11c72f761754362dd69c28f1f21.jpg";

  useEffect(() => {
    const savedSessions = localStorage.getItem("cat-study-sessions");
    if (savedSessions) {
      setStudySessions(Number(savedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cat-study-sessions", String(studySessions));
  }, [studySessions]);

  useEffect(() => {
    setTimeLeft((mode === "study" ? studyMinutes : breakMinutes) * 60);
  }, [studyMinutes, breakMinutes, mode]);

  const playBell = () => {
    if (!soundOn) return;

    try {
      const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
      );
      audio.play();
    } catch (error) {
      console.log("Sound could not play.", error);
    }
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playBell();

          if (mode === "study") {
            setStudySessions((old) => old + 1);
            setMode("break");
            return breakMinutes * 60;
          } else {
            setMode("study");
            return studyMinutes * 60;
          }
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, mode, studyMinutes, breakMinutes, soundOn]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const catMood = useMemo(() => {
    if (mode === "break") return "sleepy";
    if (running) return "focused";
    return "ready";
  }, [mode, running]);

  const moodText =
    catMood === "sleepy"
      ? "Sleepy kitty on break"
      : catMood === "focused"
      ? "Focused kitty studying"
      : "Ready kitty waiting";

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft((mode === "study" ? studyMinutes : breakMinutes) * 60);
  };

  return (
    <div className="app">
      <div className="paw-bg"></div>

      <div className="timer-card">
        <div className="header">
          <div>
            <h1>Cat Study Timer</h1>
            <p className="subtitle">
              Focus softly, rest gently, study with cat energy.
            </p>
          </div>

          <div className="cat-box">
            <img
              className={`cat-image ${catMood === "sleepy" ? "sleep" : ""}`}
              src={catImage}
              alt="Cute cat"
            />
            <p className="cat-mood">{moodText}</p>
          </div>
        </div>

        <div className="mode-row">
          <button
            className={mode === "study" ? "mode-btn active-mode" : "mode-btn"}
            onClick={() => {
              setMode("study");
              setRunning(false);
              setTimeLeft(studyMinutes * 60);
            }}
          >
            Study
          </button>

          <button
            className={mode === "break" ? "mode-btn active-mode" : "mode-btn"}
            onClick={() => {
              setMode("break");
              setRunning(false);
              setTimeLeft(breakMinutes * 60);
            }}
          >
            Break
          </button>
        </div>

        <div className="timer-display">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>

        <div className="controls">
          <button className="main-btn" onClick={() => setRunning(true)}>
            Start
          </button>
          <button className="main-btn" onClick={() => setRunning(false)}>
            Pause
          </button>
          <button className="main-btn" onClick={resetTimer}>
            Reset
          </button>
        </div>

        <div className="settings-grid">
          <div className="setting-card">
            <label>Study time: {studyMinutes} min</label>
            <input
              type="range"
              min="5"
              max="90"
              value={studyMinutes}
              onChange={(e) => setStudyMinutes(Number(e.target.value))}
            />
          </div>

          <div className="setting-card">
            <label>Break time: {breakMinutes} min</label>
            <input
              type="range"
              min="1"
              max="30"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-label">Sessions today</span>
            <span className="stat-value">{studySessions}</span>
          </div>

          <div className="stat-box">
            <span className="stat-label">Sound</span>
            <button
              className="sound-btn"
              onClick={() => setSoundOn((old) => !old)}
            >
              {soundOn ? "On 🔔" : "Off 🔕"}
            </button>
          </div>
        </div>

        <div className="level-box">
          <p>
            Cat level: <strong>{Math.floor(studySessions / 3) + 1}</strong>
          </p>
          <p className="footer-text">
            Your kitty gains one level every 3 completed study sessions.
          </p>
        </div>
      </div>
    </div>
  );
}