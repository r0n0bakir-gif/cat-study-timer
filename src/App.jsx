import { useEffect, useMemo, useState } from "react";
import "./App.css";

const CAT_EVOLUTIONS = [
  {
    level: 1,
    name: "Strong Kitten",
    img: "https://i.pinimg.com/1200x/08/11/0e/08110e2c75a14451e64961b2f35469aa.jpg",
  },
  {
    level: 2,
    name: "Business Kitten",
    img: "https://i.pinimg.com/736x/01/0c/14/010c14fb6b364da84af1b7287fc0d455.jpg",
  },
  {
    level: 3,
    name: "Bee Kitten",
    img: "https://i.pinimg.com/736x/bc/b6/eb/bcb6ebdf0df30c8af611906c48734ed6.jpg",
  },
  {
    level: 4,
    name: "Book Kitten",
    img: "https://i.pinimg.com/1200x/fd/06/f0/fd06f0255421120f32325f0b0de62dfa.jpg",
  },
  {
    level: 5,
    name: "Nerd Kitten",
    img: "https://i.pinimg.com/736x/19/03/21/1903219a0d811706152fd587c652596a.jpg",
  },
  {
    level: 6,
    name: "Sleepy Kitten",
    img: "https://i.pinimg.com/736x/32/06/7e/32067edc4aec2cb80d69cd2619b46f71.jpg",
  },
  {
    level: 7,
    name: "Surprised Kitten",
    img: "https://i.pinimg.com/736x/f8/5d/53/f85d539879240d960905672c464bff87.jpg",
  },
  {
    level: 8,
    name: "Blanket Kitten",
    img: "https://i.pinimg.com/736x/09/36/fe/0936fe4f274107410a20ac5e62a837d4.jpg",
  },
  {
    level: 9,
    name: "Evil Kitten",
    img: "https://i.pinimg.com/736x/36/bf/10/36bf107a8cc92aae90c63dec430841bd.jpg",
  },
  {
    level: 10,
    name: "Angel Kitten",
    img: "https://i.pinimg.com/736x/ac/a5/57/aca557b133b44daba8dca7520dabbf3e.jpg",
  },
  {
    level: 11,
    name: "Vampire Kitten",
    img: "https://i.pinimg.com/736x/f8/81/6c/f8816c1b5257aa30eec589852645ea20.jpg",
  },
  {
    level: 12,
    name: "Pumpkin Kitten",
    img: "https://i.pinimg.com/736x/0a/26/e3/0a26e31030e3062f5108bd4a8e8d849f.jpg",
  },
  {
    level: 13,
    name: "Christmas Tree Kitten",
    img: "https://i.pinimg.com/736x/0a/3b/ba/0a3bbaa161b865db5a53d8416433b306.jpg",
  },
  {
    level: 14,
    name: "Clown Kitten",
    img: "https://i.pinimg.com/736x/65/5f/7f/655f7f369477d561bd45a00cdac5af68.jpg",
  },
  {
    level: 15,
    name: "Sun Kitten",
    img: "https://i.pinimg.com/736x/aa/ea/fc/aaeafc93010ba51909b4c4ab610bef13.jpg",
  },
  {
    level: 16,
    name: "Cucumber Kitten",
    img: "https://i.pinimg.com/736x/9c/6b/d2/9c6bd2d28aea094c2de44c5e7e27b32d.jpg",
  },
  {
    level: 17,
    name: "Blueberry Kitten",
    img: "https://i.pinimg.com/736x/e5/4d/af/e54daf4e34ee4277c80898a3a17a2e51.jpg",
  },
  {
    level: 18,
    name: "Pooping Kitten",
    img: "https://i.pinimg.com/1200x/d1/d1/f7/d1d1f740cdcf6ee5046220c8272504b4.jpg",
  },
  {
    level: 19,
    name: "Batman Kitten",
    img: "https://i.pinimg.com/736x/29/60/55/2960553f693b50515d231763153830ab.jpg",
  },
  {
    level: 20,
    name: "Judging Kitten",
    img: "https://i.pinimg.com/736x/33/81/8f/33818f4b1abfc949d11bde59c6cf11d9.jpg",
  },
  {
    level: 25,
    name: "Rich Kitten",
    img: "https://i.pinimg.com/736x/fc/d6/73/fcd673c5aa17b93c15d35ee17412ec89.jpg",
  },
];

const BREAK_SUGGESTIONS = [
  "Drink a glass of water",
  "Roll your shoulders and stretch your neck",
  "Look away from the screen for 20 seconds",
  "Take 5 slow breaths",
];

const STORAGE_KEY = "cat-study-pro-dashboard";
const XP_PER_SESSION = 10;
const XP_PER_LEVEL = 50;

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
    darkMode: true,
    selectedCatName: "Strong Kitten",
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaults;
    return { ...defaults, ...JSON.parse(saved) };
  } catch {
    return defaults;
  }
};

const getLast7Days = (dailySessions) => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);

    return {
      key,
      label: date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2),
      value: dailySessions[key] || 0,
      isToday: key === todayString(),
    };
  });
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
  const [selectedCatName, setSelectedCatName] = useState(initial.selectedCatName);

  const [mode, setMode] = useState("study");
  const [timeLeft, setTimeLeft] = useState(initial.studyMinutes * 60);
  const [running, setRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState("");
  const [lastUnlockedCat, setLastUnlockedCat] = useState(null);

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
        selectedCatName,
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
    selectedCatName,
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

    const oldLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
    const newXp = xp + XP_PER_SESSION;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

    setStudySessions((prev) => prev + 1);
    setTotalFocusMinutes((prev) => prev + studyMinutes);
    setXp(newXp);

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

    if (newLevel > oldLevel) {
      const unlockedCat = CAT_EVOLUTIONS.find((cat) => cat.level === newLevel);
      if (unlockedCat) {
        setLastUnlockedCat(unlockedCat);
        setUnlockMessage(`🐱 New cat unlocked: ${unlockedCat.name}!`);

        setSelectedCatName((prevSelected) => {
          const selectedStillUnlocked = CAT_EVOLUTIONS.some(
            (cat) => cat.name === prevSelected && cat.level <= newLevel
          );
          return selectedStillUnlocked ? prevSelected : unlockedCat.name;
        });

        setTimeout(() => {
          setUnlockMessage("");
        }, 3500);
      }
    }

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
          }

          setMode("study");
          return studyMinutes * 60;
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
    xp,
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
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const levelProgress = (xpIntoLevel / XP_PER_LEVEL) * 100;
  const xpToNextLevel = XP_PER_LEVEL - xpIntoLevel || XP_PER_LEVEL;

  const unlockedCats = CAT_EVOLUTIONS.filter((cat) => level >= cat.level);
  const highestUnlockedCat = unlockedCats[unlockedCats.length - 1] || CAT_EVOLUTIONS[0];

  const selectedUnlockedCat =
    unlockedCats.find((cat) => cat.name === selectedCatName) || highestUnlockedCat;

  const currentEvolution = selectedUnlockedCat;
  const nextCatUnlock = CAT_EVOLUTIONS.find((cat) => cat.level > level);

  const totalDuration = (mode === "study" ? studyMinutes : breakMinutes) * 60;
  const progressPercent = Math.max(
    0,
    Math.min(100, ((totalDuration - timeLeft) / totalDuration) * 100)
  );
  const sessionMinutesElapsed = Math.floor((totalDuration - timeLeft) / 60);
  const sessionMinutesLeft = Math.ceil(timeLeft / 60);

  const ringRadius = 124;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progressPercent / 100) * ringCircumference;

  const weeklyActivity = getLast7Days(dailySessions);
  const weeklyPeak = Math.max(...weeklyActivity.map((day) => day.value), 1);
  const completedTodayMinutes = sessionsToday * studyMinutes;
  const catEnergy = Math.min(100, sessionsToday * 22 + (running ? 18 : 8));
  const nextReward = nextCatUnlock
    ? `${nextCatUnlock.name} at level ${nextCatUnlock.level}`
    : "All cats unlocked";

  const achievements = [
    {
      label: "First steps",
      done: studySessions >= 1,
    },
    {
      label: "3-day streak",
      done: longestStreak >= 3,
    },
    {
      label: "100 XP",
      done: xp >= 100,
    },
  ];

  const catMood = useMemo(() => {
    if (isCelebrating) {
      return {
        badge: "Celebrating",
        emoji: "🎉",
        title: currentEvolution?.name || "Victory cat",
        text: "Session complete. Your cat is very impressed.",
        quote: "One more sprint down. Keep stacking wins.",
      };
    }

    if (mode === "break") {
      return {
        badge: "Resting",
        emoji: "🌙",
        title: currentEvolution?.name || "Rest mode cat",
        text: "Pause, stretch, drink water, and reset your brain.",
        quote: "Recovery is part of the focus cycle.",
      };
    }

    if (running) {
      return {
        badge: "Locked in",
        emoji: "📚",
        title: currentEvolution?.name || "Focus cat",
        text: `${sessionMinutesLeft} min left in this sprint. Stay with the task.`,
        quote: "Small sessions still count as real progress.",
      };
    }

    return {
      badge: "Ready",
      emoji: "🐾",
      title: currentEvolution?.name || "Ready cat",
      text: "Your next focus sprint is waiting.",
      quote: "Start messy. Momentum can come after.",
    };
  }, [isCelebrating, mode, running, sessionMinutesLeft, currentEvolution]);

  const timerStateLabel = isCelebrating
    ? "Completed"
    : running
    ? mode === "study"
      ? "Focus in progress"
      : "Break in progress"
    : mode === "study"
    ? "Ready to focus"
    : "Ready to recharge";

  return (
    <div
      className={`app ${darkMode ? "dark" : ""} ${
        running ? "focus-active" : ""
      } ${mode}`}
    >
      <div className="background-glow background-glow-1" />
      <div className="background-glow background-glow-2" />
      <div className="background-glow background-glow-3" />
      <div className="paw-bg" />

      <div className="dashboard-shell">
        <div className="topbar">
          <div>
            <span className="eyebrow">Cat Productivity Suite</span>
            <h1>Cat Study Timer</h1>
            <p className="subtitle">
              A cozy focus dashboard with streaks, level-ups, session insights,
              and a study cat that evolves with you.
            </p>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((v) => !v)}
          >
            <span className="theme-toggle-icon">{darkMode ? "☀️" : "🌙"}</span>
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>
        </div>

        <div className="hero-grid">
          <section className="glass panel timer-panel interactive-panel">
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
                className={
                  mode === "study" ? "mode-btn active-mode study" : "mode-btn"
                }
                onClick={() => switchMode("study")}
              >
                Study
              </button>

              <button
                className={
                  mode === "break" ? "mode-btn active-mode break" : "mode-btn"
                }
                onClick={() => switchMode("break")}
              >
                Break
              </button>
            </div>

            <div className="timer-display-wrap">
              <div className={`timer-ring-shell ${mode} ${running ? "running" : ""}`}>
                <svg className="timer-ring" viewBox="0 0 300 300" aria-hidden="true">
                  <circle className="timer-ring-track" cx="150" cy="150" r={ringRadius} />
                  <circle
                    className="timer-ring-progress"
                    cx="150"
                    cy="150"
                    r={ringRadius}
                    style={{
                      strokeDasharray: ringCircumference,
                      strokeDashoffset: ringOffset,
                    }}
                  />
                </svg>

                <div className="timer-display-core">
                  <span className="timer-kicker">{timerStateLabel}</span>
                  <div className="timer-display">
                    {formatTime(minutes)}:{formatTime(seconds)}
                  </div>
                  <div className="timer-caption">
                    {mode === "study" ? "Stay with one task" : "Let your brain reset"}
                  </div>
                </div>
              </div>

              <div className="timer-status-row">
                <span className="timer-chip">
                  {running ? "● In progress" : "○ Waiting"}
                </span>
                <span className="timer-chip subtle">
                  {running
                    ? `${sessionMinutesElapsed} min done`
                    : `${mode === "study" ? studyMinutes : breakMinutes} min planned`}
                </span>
              </div>
            </div>

            <div className="progress-track shimmer-track">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            <div className="controls">
              <button
                className="main-btn primary"
                onClick={() => !running && setRunning(true)}
              >
                Start
              </button>
              <button
                className="main-btn secondary"
                onClick={() => setRunning(false)}
              >
                Pause
              </button>
              <button className="main-btn ghost" onClick={resetTimer}>
                Reset
              </button>
            </div>

            {mode === "break" ? (
              <div className="break-helper-card">
                <div className="break-helper-head">
                  <div>
                    <p className="section-label">Break guide</p>
                    <h3>Use this break well</h3>
                  </div>
                  <span className="break-helper-badge">💤 Reset mode</span>
                </div>

                <p className="break-helper-copy">
                  Your kitten is resting. Step away for a moment so your next focus sprint feels easier.
                </p>

                <div className="break-suggestion-list">
                  {BREAK_SUGGESTIONS.map((tip) => (
                    <div key={tip} className="break-tip">
                      <span>•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="settings-grid">
              <div className="setting-card interactive-card">
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

              <div className="setting-card break-setting interactive-card">
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

          <section className="glass panel cat-panel interactive-panel">
            <div className="cat-panel-head">
              <span className="cat-badge">
                {catMood.emoji} {catMood.badge}
              </span>
              <span className="cat-mini-status">Energy {catEnergy}%</span>
            </div>

            <div className={`cat-frame ${running ? "active" : ""} ${mode === "break" ? "rest-mode" : "focus-mode"}`}>
              {running && mode === "study" ? <div className="pulse-ring" /> : null}
              <img
                className={`cat-image ${running ? "is-running" : ""} ${mode === "break" ? "is-resting" : "is-focused"} ${isCelebrating ? "is-celebrating" : ""}`}
                src={currentEvolution.img}
                alt={currentEvolution.name}
              />
            </div>

            <h3>{catMood.title}</h3>
            <p className="cat-evolution-label">
              Level {level} cat · {unlockedCats.length}/{CAT_EVOLUTIONS.length} unlocked
            </p>

            {unlockMessage ? (
              <div className="unlock-popup">{unlockMessage}</div>
            ) : null}

            <p className="cat-copy">{catMood.text}</p>
            <p className="cat-quote">“{catMood.quote}”</p>

            <div className="energy-card interactive-card">
              <div className="energy-head">
                <span>Cat energy</span>
                <strong>{catEnergy}%</strong>
              </div>
              <div className="progress-track energy-track">
                <div
                  className="progress-fill energy-fill"
                  style={{ width: `${catEnergy}%` }}
                />
              </div>
            </div>

            <div className="cat-stats-mini">
              <div className="interactive-card">
                <span>Next sprint</span>
                <strong>
                  {mode === "study" ? `${studyMinutes} min` : `${breakMinutes} min`}
                </strong>
              </div>
              <div className="interactive-card">
                <span>Today</span>
                <strong>{completedTodayMinutes} min</strong>
              </div>
            </div>

            <div className="mini-actions">
              <button className="icon-btn" onClick={() => setSoundOn((v) => !v)}>
                {soundOn ? "🔔 Sound on" : "🔕 Sound off"}
              </button>
            </div>
          </section>
        </div>

        <div className="stats-grid">
          <div className="glass stat-card stat-card-primary interactive-panel">
            <span className="stat-icon">🔥</span>
            <span className="stat-label">Current streak</span>
            <strong className="stat-value">{currentStreak}</strong>
            <span className="stat-sub">Keep the chain alive tomorrow.</span>
          </div>

          <div className="glass stat-card interactive-panel">
            <span className="stat-icon">🎯</span>
            <span className="stat-label">Sessions today</span>
            <strong className="stat-value">{sessionsToday}</strong>
            <span className="stat-sub">Focus rounds completed today.</span>
          </div>

          <div className="glass stat-card interactive-panel">
            <span className="stat-icon">⏱️</span>
            <span className="stat-label">Focus hours</span>
            <strong className="stat-value">{totalStudyHours}h</strong>
            <span className="stat-sub">Total deep work time saved.</span>
          </div>

          <div className="glass stat-card interactive-panel">
            <span className="stat-icon">🏆</span>
            <span className="stat-label">Best streak</span>
            <strong className="stat-value">{longestStreak}</strong>
            <span className="stat-sub">Your all-time streak record.</span>
          </div>
        </div>

        <div className="bottom-grid">
          <section className="glass panel xp-panel interactive-panel">
            <div className="panel-top">
              <div>
                <p className="section-label">Progression</p>
                <h2>XP & Level System</h2>
              </div>
              <div className="level-chip">Level {level}</div>
            </div>

            <div className="xp-top-row">
              <div>
                <div className="xp-number">{xp} XP</div>
                <p className="helper-text">
                  1 session = {XP_PER_SESSION} XP · every {XP_PER_LEVEL} XP unlocks the next
                  level
                </p>
              </div>

              <div className="next-unlock-card interactive-card">
                <span>Next unlock</span>
                <strong>{nextReward}</strong>
                <small>{xpToNextLevel} XP to go</small>
              </div>
            </div>

            <div className="progress-track large shimmer-track xp-track">
              <div
                className="progress-fill xp-fill"
                style={{ width: `${levelProgress}%` }}
              />
            </div>

            <div className="xp-meta-grid">
              <div className="mini-panel interactive-card">
                <span className="mini-panel-label">Next level</span>
                <strong>{xpToNextLevel} XP left</strong>
              </div>
              <div className="mini-panel interactive-card">
                <span className="mini-panel-label">Session bonus</span>
                <strong>+{XP_PER_SESSION} XP each</strong>
              </div>
              <div className="mini-panel interactive-card">
                <span className="mini-panel-label">Unlocked cats</span>
                <strong>
                  {unlockedCats.length} / {CAT_EVOLUTIONS.length}
                </strong>
              </div>
              <div className="mini-panel interactive-card">
                <span className="mini-panel-label">Current cat</span>
                <strong>{currentEvolution.name}</strong>
              </div>
            </div>

            <div className="achievement-strip">
              {achievements.map((achievement) => (
                <div
                  key={achievement.label}
                  className={`achievement-chip ${achievement.done ? "done" : ""}`}
                >
                  <span>{achievement.done ? "✓" : "•"}</span>
                  <span>{achievement.label}</span>
                </div>
              ))}
            </div>

            <div className="weekly-progress-card interactive-card">
              <div className="weekly-progress-head">
                <span>Weekly focus rhythm</span>
                <strong>
                  {weeklyActivity.reduce((sum, day) => sum + day.value, 0)} sessions
                </strong>
              </div>

              <div className="weekly-bars">
                {weeklyActivity.map((day) => (
                  <div
                    key={day.key}
                    className={`week-bar-wrap ${day.isToday ? "today" : ""}`}
                  >
                    <div
                      className="week-bar"
                      style={{
                        height: `${Math.max(14, (day.value / weeklyPeak) * 100)}%`,
                      }}
                    />
                    <span>{day.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass panel summary-panel interactive-panel">
            <p className="section-label">Overview</p>
            <h2>Productivity snapshot</h2>

            <div className="summary-list">
              <div className="summary-row interactive-card">
                <span>Completed sessions</span>
                <strong>{studySessions}</strong>
              </div>
              <div className="summary-row interactive-card">
                <span>Mode</span>
                <strong>{mode === "study" ? "Focus" : "Break"}</strong>
              </div>
              <div className="summary-row interactive-card">
                <span>Sound</span>
                <strong>{soundOn ? "Enabled" : "Muted"}</strong>
              </div>
              <div className="summary-row interactive-card">
                <span>Theme</span>
                <strong>{darkMode ? "Dark" : "Light"}</strong>
              </div>
              <div className="summary-row interactive-card">
                <span>Last unlock</span>
                <strong>{lastUnlockedCat?.name || currentEvolution.name}</strong>
              </div>
            </div>

            <div className="focus-state-card interactive-card">
              <span className="focus-state-label">Focus state</span>
              <strong>{running ? "Deep work mode active" : "Ready to begin"}</strong>
              <p>
                {running
                  ? `Your dashboard is in focus mode while this ${mode} session runs.`
                  : "Hit start when you want the interface to shift into a focused session state."}
              </p>
            </div>
          </section>
        </div>

        <section className="glass panel collection-panel interactive-panel">
          <div className="panel-top">
            <div>
              <p className="section-label">Collection</p>
              <h2>Cat Gallery</h2>
            </div>
            <div className="level-chip">
              {unlockedCats.length}/{CAT_EVOLUTIONS.length} unlocked
            </div>
          </div>

          <div className="cat-collection-grid">
            {CAT_EVOLUTIONS.map((cat) => {
              const isUnlocked = level >= cat.level;
              const isCurrent = currentEvolution.name === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  className={`collection-card ${isUnlocked ? "unlocked" : "locked"} ${
                    isCurrent ? "current" : ""
                  }`}
                  onClick={() => {
                    if (isUnlocked) {
                      setSelectedCatName(cat.name);
                    }
                  }}
                  disabled={!isUnlocked}
                >
                  <div className="collection-image-wrap">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="collection-image"
                    />
                    {!isUnlocked ? (
                      <div className="collection-lock">🔒 Locked</div>
                    ) : null}
                    {isCurrent ? (
                      <div className="collection-current-badge">Using now</div>
                    ) : null}
                  </div>

                  <div className="collection-info">
                    <h3>{cat.name}</h3>
                    <p>
                      {isUnlocked
                        ? `Click to use · unlocked at level ${cat.level}`
                        : `Unlocks at level ${cat.level}`}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
