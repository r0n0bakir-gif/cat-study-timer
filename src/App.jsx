import { useEffect, useMemo, useState } from "react";
import "./App.css";

const CAT_IMAGES = {
  studying:
    "https://i.pinimg.com/1200x/41/10/4c/41104c7356b368e418e9c6b144fdcef1.jpg",
  sleeping:
    "https://i.pinimg.com/1200x/b7/4c/fc/b74cfcbfca599d4e84d894b0d4824830.jpg",
  celebrating:
    "https://i.pinimg.com/736x/30/f3/9f/30f39f021d32ac9170ce20a5e0d7914b.jpg",
  ready:
    "https://i.pinimg.com/1200x/41/10/4c/41104c7356b368e418e9c6b144fdcef1.jpg",
};

const STORAGE_KEY = "cat-study-pro-dashboard";

const todayString = () => new Date().toISOString().slice(0, 10);

const getYesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

const formatTime = (n) => String(n).padStart(2, "0");

const getInitialData = () => {
  const defaults = {
    studyMinutes: 25,
    breakMinutes: 5,
    studySessions: 0,
    totalFocusMinutes: 0,
    xp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    dailySessions: {},
    soundOn: true,
    darkMode: false,
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaults;
    return { ...defaults, ...JSON.parse(saved) };
  } catch {
    return defaults;
  }
};

export default function App() {
  const initial = getInitialData();

  const [studyMinutes, setStudyMinutes] = useState(initial.studyMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initial.breakMinutes);
  const [studySessions, setStudySessions] = useState(initial.studySessions);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(
    initial.totalFocusMinutes
  );
  const [xp, setXp] = useState(initial.xp);
  const [currentStreak, setCurrentStreak] = useState(initial.currentStreak);
  const [longestStreak, setLongestStreak] = useState(initial.longestStreak);
  const [lastStudyDate, setLastStudyDate] = useState(initial.lastStudyDate);
  const [dailySessions, setDailySessions] = useState(initial.dailySessions);
  const [soundOn, setSoundOn] = useState(initial.soundOn);
  const [darkMode, setDarkMode] = useState(initial.darkMode);

  const [mode, setMode] = useState("study");
  const [timeLeft, setTimeLeft] = useState(initial.studyMinutes * 60);
  const [running, setRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        studyMinutes,
        breakMinutes,
        studySessions,
        totalFocusMinutes,
        xp,
        currentStreak,
        longestStreak,
        lastStudyDate,
        dailySessions,
        soundOn,
        darkMode,
      })
    );
  }, [
    studyMinutes,
    breakMinutes,
    studySessions,
    totalFocusMinutes,
    xp,
    currentStreak,
    longestStreak,
    lastStudyDate,
    dailySessions,
    soundOn,
    darkMode,
  ]);

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

  const completeStudySession = () => {
    const today = todayString();
    const yesterday = getYesterdayString();

    setStudySessions((prev) => prev + 1);
    setTotalFocusMinutes((prev) => prev + studyMinutes);
    setXp((prev) => prev + 10);

    setDailySessions((prev) => ({
      ...prev,
      [today]: (prev[today] || 0) + 1,
    }));

    let nextStreak = 1;

    if (lastStudyDate === today) {
      nextStreak = currentStreak || 1;
    } else if (lastStudyDate === yesterday) {
      nextStreak = currentStreak + 1;
    }

    setCurrentStreak(nextStreak);
    setLongestStreak((prev) => Math.max(prev, nextStreak));
    setLastStudyDate(today);

    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 3500);
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playBell();

          if (mode === "study") {
            completeStudySession();
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
  }, [
    running,
    mode,
    studyMinutes,
    breakMinutes,
    soundOn,
    lastStudyDate,
    currentStreak,
  ]);

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft((mode === "study" ? studyMinutes : breakMinutes) * 60);
    setIsCelebrating(false);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setRunning(false);
    setIsCelebrating(false);
    setTimeLeft((nextMode === "study" ? studyMinutes : breakMinutes) * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const sessionsToday = dailySessions[todayString()] || 0;
  const totalStudyHours = (totalFocusMinutes / 60).toFixed(1);
  const level = Math.floor(xp / 50) + 1;
  const xpIntoLevel = xp % 50;
  const levelProgress = (xpIntoLevel / 50) * 100;

  const totalDuration = (mode === "study" ? studyMinutes : breakMinutes) * 60;
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  const catMood = useMemo(() => {
    if (isCelebrating) {
      return {
        key: "celebrating",
        badge: "Celebrating",
        emoji: "🎉",
        title: "Victory cat",
        text: "Session complete. Your cat is proud of you.",
      };
    }

    if (mode === "break") {
      return {
        key: "sleeping",
        badge: "Sleeping",
        emoji: "😴",
        title: "Rest mode cat",
        text: "Break time. Let the cat recharge with you.",
      };
    }

    if (running) {
      return {
        key: "studying",
        badge: "Studying",
        emoji: "📚",
        title: "Focus cat",
        text: "Deep work mode activated. Stay locked in.",
      };
    }

    return {
      key: "ready",
      badge: "Ready",
      emoji: "🐾",
      title: "Ready cat",
      text: "Your next focus sprint is waiting.",
    };
  }, [isCelebrating, mode, running]);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="background-glow background-glow-1" />
      <div className="background-glow background-glow-2" />
      <div className="paw-bg" />

      <div className="dashboard-shell">
        <div className="topbar">
          <div>
            <span className="eyebrow">Cat Productivity Suite</span>
            <h1>Cat Study Timer</h1>
            <p className="subtitle">
              A cozy focus dashboard with streaks, levels, stats, and cat
              energy.
            </p>
          </div>

          <button className="theme-toggle" onClick={() => setDarkMode((v) => !v)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="hero-grid">
          <section className="glass panel timer-panel">
            <div className="panel-top">
              <div>
                <p className="section-label">Current cycle</p>
                <h2>{mode === "study" ? "Focus Session" : "Break Session"}</h2>
              </div>

              <div className={`mode-pill ${mode}`}>
                {mode === "study" ? "Focus" : "Break"}
              </div>
            </div>

            <div className="mode-row">
              <button
                className={mode === "study" ? "mode-btn active-mode" : "mode-btn"}
                onClick={() => switchMode("study")}
              >
                Study
              </button>

              <button
                className={mode === "break" ? "mode-btn active-mode" : "mode-btn"}
                onClick={() => switchMode("break")}
              >
                Break
              </button>
            </div>

            <div className="timer-display">
              {formatTime(minutes)}:{formatTime(seconds)}
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${Math.max(0, Math.min(progressPercent, 100))}%` }}
              />
            </div>

            <div className="controls">
              <button
                className="main-btn primary"
                onClick={() => !running && setRunning(true)}
              >
                Start
              </button>
              <button className="main-btn secondary" onClick={() => setRunning(false)}>
                Pause
              </button>
              <button className="main-btn ghost" onClick={resetTimer}>
                Reset
              </button>
            </div>

            <div className="settings-grid">
              <div className="setting-card">
                <div className="setting-head">
                  <label>Study time</label>
                  <span>{studyMinutes} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={studyMinutes}
                  disabled={running}
                  onChange={(e) => setStudyMinutes(Number(e.target.value))}
                />
              </div>

              <div className="setting-card">
                <div className="setting-head">
                  <label>Break time</label>
                  <span>{breakMinutes} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={breakMinutes}
                  disabled={running}
                  onChange={(e) => setBreakMinutes(Number(e.target.value))}
                />
              </div>
            </div>
          </section>

          <section className="glass panel cat-panel">
            <div className="cat-panel-head">
              <span className={`cat-badge ${catMood.key}`}>
                {catMood.emoji} {catMood.badge}
              </span>
            </div>

            <div className={`cat-frame ${catMood.key}`}>
              <img
                className={`cat-image ${catMood.key}`}
                src={CAT_IMAGES[catMood.key] || CAT_IMAGES.ready}
                alt={catMood.title}
              />
            </div>

            <h3>{catMood.title}</h3>
            <p className="cat-copy">{catMood.text}</p>

            <div className="mini-actions">
              <button className="icon-btn" onClick={() => setSoundOn((v) => !v)}>
                {soundOn ? "🔔 Sound on" : "🔕 Sound off"}
              </button>
            </div>
          </section>
        </div>

        <div className="stats-grid">
          <div className="glass stat-card">
            <span className="stat-label">Sessions today</span>
            <strong className="stat-value">{sessionsToday}</strong>
            <span className="stat-sub">Completed focus rounds today</span>
          </div>

          <div className="glass stat-card">
            <span className="stat-label">Current streak</span>
            <strong className="stat-value">{currentStreak} 🔥</strong>
            <span className="stat-sub">Days in a row with study sessions</span>
          </div>

          <div className="glass stat-card">
            <span className="stat-label">Longest streak</span>
            <strong className="stat-value">{longestStreak}</strong>
            <span className="stat-sub">Your all-time best streak</span>
          </div>

          <div className="glass stat-card">
            <span className="stat-label">Total study hours</span>
            <strong className="stat-value">{totalStudyHours}h</strong>
            <span className="stat-sub">Accumulated deep work time</span>
          </div>
        </div>

        <div className="bottom-grid">
          <section className="glass panel xp-panel">
            <div className="panel-top">
              <div>
                <p className="section-label">Progression</p>
                <h2>XP & Level System</h2>
              </div>
              <div className="level-chip">Level {level}</div>
            </div>

            <div className="xp-number">{xp} XP</div>

            <div className="progress-track large">
              <div
                className="progress-fill xp-fill"
                style={{ width: `${levelProgress}%` }}
              />
            </div>

            <p className="helper-text">
              1 session = 10 XP · every 50 XP unlocks the next level
            </p>
          </section>

          <section className="glass panel summary-panel">
            <p className="section-label">Overview</p>
            <h2>Productivity snapshot</h2>

            <div className="summary-list">
              <div className="summary-row">
                <span>Total completed sessions</span>
                <strong>{studySessions}</strong>
              </div>
              <div className="summary-row">
                <span>Current mode</span>
                <strong>{mode === "study" ? "Focus" : "Break"}</strong>
              </div>
              <div className="summary-row">
                <span>Sound</span>
                <strong>{soundOn ? "Enabled" : "Muted"}</strong>
              </div>
              <div className="summary-row">
                <span>Theme</span>
                <strong>{darkMode ? "Dark" : "Light"}</strong>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}