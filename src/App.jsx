import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const CAT_EVOLUTIONS = [
  {
    level: 1,
    name: "Strong Kitten",
    img: "https://i.pinimg.com/1200x/08/11/0e/08110e2c75a14451e64961b2f35469aa.jpg",
    ability: {
      title: "+5 XP finisher",
      description: "Gets a power bonus every completed focus session.",
      type: "xp",
      value: 5,
    },
  },
  {
    level: 2,
    name: "Business Kitten",
    img: "https://i.pinimg.com/736x/01/0c/14/010c14fb6b364da84af1b7287fc0d455.jpg",
    ability: {
      title: "Streak protection",
      description: "Can save your streak if you miss one day.",
      type: "shield",
      value: 1,
    },
  },
  {
    level: 3,
    name: "Bee Kitten",
    img: "https://i.pinimg.com/736x/bc/b6/eb/bcb6ebdf0df30c8af611906c48734ed6.jpg",
    ability: {
      title: "Faster energy regen",
      description: "Refills cat energy faster between sessions.",
      type: "energy",
      value: 18,
    },
  },
  {
    level: 4,
    name: "Book Kitten",
    img: "https://i.pinimg.com/1200x/fd/06/f0/fd06f0255421120f32325f0b0de62dfa.jpg",
    ability: {
      title: "+10 min scholar bonus",
      description: "Adds a study-minute bonus to daily quest progress.",
      type: "questMinutes",
      value: 10,
    },
  },
  {
    level: 5,
    name: "Nerd Kitten",
    img: "https://i.pinimg.com/736x/19/03/21/1903219a0d811706152fd587c652596a.jpg",
    ability: {
      title: "+2 bonus XP on quests",
      description: "Completed daily quests are a little more rewarding.",
      type: "questXp",
      value: 2,
    },
  },
  {
    level: 6,
    name: "Sleepy Kitten",
    img: "https://i.pinimg.com/736x/32/06/7e/32067edc4aec2cb80d69cd2619b46f71.jpg",
    ability: {
      title: "Longer break comfort",
      description: "Break mode starts with a calmer energy floor.",
      type: "breakEnergy",
      value: 12,
    },
  },
  {
    level: 7,
    name: "Surprised Kitten",
    img: "https://i.pinimg.com/736x/f8/5d/53/f85d539879240d960905672c464bff87.jpg",
    ability: {
      title: "Lucky pop",
      description: "Every 5th session gives a tiny extra XP surprise.",
      type: "milestoneXp",
      value: 8,
    },
  },
  {
    level: 8,
    name: "Blanket Kitten",
    img: "https://i.pinimg.com/736x/09/36/fe/0936fe4f274107410a20ac5e62a837d4.jpg",
    ability: {
      title: "Cozy streak",
      description: "Improves your displayed energy when resting.",
      type: "restEnergy",
      value: 14,
    },
  },
  {
    level: 9,
    name: "Evil Kitten",
    img: "https://i.pinimg.com/736x/36/bf/10/36bf107a8cc92aae90c63dec430841bd.jpg",
    ability: {
      title: "Chaos XP",
      description: "Gets a spike of XP after intense daily grinding.",
      type: "dailyThresholdXp",
      value: 6,
    },
  },
  {
    level: 10,
    name: "Angel Kitten",
    img: "https://i.pinimg.com/736x/ac/a5/57/aca557b133b44daba8dca7520dabbf3e.jpg",
    ability: {
      title: "Smooth recovery",
      description: "Softly boosts energy while idle.",
      type: "idleEnergy",
      value: 10,
    },
  },
  {
    level: 11,
    name: "Vampire Kitten",
    img: "https://i.pinimg.com/736x/f8/81/6c/f8816c1b5257aa30eec589852645ea20.jpg",
    ability: {
      title: "Night hunter",
      description: "Large streaks make this cat more energized.",
      type: "streakEnergy",
      value: 2,
    },
  },
  {
    level: 12,
    name: "Pumpkin Kitten",
    img: "https://i.pinimg.com/736x/0a/26/e3/0a26e31030e3062f5108bd4a8e8d849f.jpg",
    ability: {
      title: "Harvest bonus",
      description: "Session bundles make your energy jump more quickly.",
      type: "sessionEnergy",
      value: 4,
    },
  },
  {
    level: 13,
    name: "Christmas Tree Kitten",
    img: "https://i.pinimg.com/736x/0a/3b/ba/0a3bbaa161b865db5a53d8416433b306.jpg",
    ability: {
      title: "Gifted streak",
      description: "Celebrates streaks with a stronger momentum bonus.",
      type: "streakXp",
      value: 3,
    },
  },
  {
    level: 14,
    name: "Clown Kitten",
    img: "https://i.pinimg.com/736x/65/5f/7f/655f7f369477d561bd45a00cdac5af68.jpg",
    ability: {
      title: "Fun focus",
      description: "Adds a bit of energy whenever the timer is running.",
      type: "runningEnergy",
      value: 8,
    },
  },
  {
    level: 15,
    name: "Sun Kitten",
    img: "https://i.pinimg.com/736x/aa/ea/fc/aaeafc93010ba51909b4c4ab610bef13.jpg",
    ability: {
      title: "Radiant day",
      description: "Big minute totals feel even more rewarding.",
      type: "minutesThresholdXp",
      value: 5,
    },
  },
  {
    level: 16,
    name: "Cucumber Kitten",
    img: "https://i.pinimg.com/736x/9c/6b/d2/9c6bd2d28aea094c2de44c5e7e27b32d.jpg",
    ability: {
      title: "Cool reset",
      description: "Improves energy recovery after a pause.",
      type: "pauseEnergy",
      value: 12,
    },
  },
  {
    level: 17,
    name: "Blueberry Kitten",
    img: "https://i.pinimg.com/736x/e5/4d/af/e54daf4e34ee4277c80898a3a17a2e51.jpg",
    ability: {
      title: "Tiny combo XP",
      description: "Consecutive sessions stack a small reward.",
      type: "comboXp",
      value: 2,
    },
  },
  {
    level: 18,
    name: "Pooping Kitten",
    img: "https://i.pinimg.com/1200x/d1/d1/f7/d1d1f740cdcf6ee5046220c8272504b4.jpg",
    ability: {
      title: "Comic relief",
      description: "High activity days keep your cat weirdly energized.",
      type: "sessionEnergy",
      value: 6,
    },
  },
  {
    level: 19,
    name: "Batman Kitten",
    img: "https://i.pinimg.com/736x/29/60/55/2960553f693b50515d231763153830ab.jpg",
    ability: {
      title: "Guardian streak",
      description: "High streaks feel safer and more valuable.",
      type: "streakXp",
      value: 4,
    },
  },
  {
    level: 20,
    name: "Judging Kitten",
    img: "https://i.pinimg.com/736x/33/81/8f/33818f4b1abfc949d11bde59c6cf11d9.jpg",
    ability: {
      title: "Pressure bonus",
      description: "Your XP improves once you stay consistent long enough.",
      type: "milestoneXp",
      value: 10,
    },
  },
  {
    level: 25,
    name: "Rich Kitten",
    img: "https://i.pinimg.com/736x/fc/d6/73/fcd673c5aa17b93c15d35ee17412ec89.jpg",
    ability: {
      title: "Investment return",
      description: "Turns quest completion into even bigger rewards.",
      type: "questXp",
      value: 5,
    },
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
const QUEST_SESSION_TARGET = 3;
const QUEST_MINUTES_TARGET = 60;

const todayString = () => new Date().toISOString().slice(0, 10);

const getYesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

const formatTime = (n) => String(n).padStart(2, "0");

const getEvolutionStage = (level) => {
  if (level >= 10) return "Master Cat";
  if (level >= 5) return "Teen Cat";
  return "Kitten";
};

const getDailyQuestBonusMinutes = (cat) =>
  cat?.ability?.type === "questMinutes" ? cat.ability.value : 0;

const getQuestXpBonus = (cat) =>
  cat?.ability?.type === "questXp" ? cat.ability.value : 0;

const getSessionXp = ({ cat, sessionCountToday, streak }) => {
  let xpReward = XP_PER_SESSION;

  if (cat?.ability?.type === "xp") {
    xpReward += cat.ability.value;
  }

  if (cat?.ability?.type === "milestoneXp" && (sessionCountToday + 1) % 5 === 0) {
    xpReward += cat.ability.value;
  }

  if (cat?.ability?.type === "dailyThresholdXp" && sessionCountToday + 1 >= 4) {
    xpReward += cat.ability.value;
  }

  if (cat?.ability?.type === "minutesThresholdXp" && sessionCountToday + 1 >= 2) {
    xpReward += cat.ability.value;
  }

  if (cat?.ability?.type === "comboXp" && sessionCountToday >= 1) {
    xpReward += cat.ability.value * Math.min(sessionCountToday, 3);
  }

  if (cat?.ability?.type === "streakXp" && streak >= 3) {
    xpReward += cat.ability.value;
  }

  return xpReward;
};

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
    dailyMinutes: {},
    soundOn: true,
    darkMode: true,
    selectedCatName: "Strong Kitten",
    unlockedAchievements: [],
    streakShields: 0,
    claimedQuestRewards: {},
    sessionCombo: 0,
    tasks: [
      { id: 1, text: "Study math", completed: false },
      { id: 2, text: "Read chapter", completed: false },
      { id: 3, text: "Review notes", completed: false },
    ],
    sessionHistory: [],
    selectedSound: "none",
    soundVolume: 55,
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


const formatDisplayDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const formatSessionDateTime = (dateTimeString) =>
  new Date(dateTimeString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const getLastNDays = (dailyMinutes, totalDays = 84) => {
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (totalDays - 1 - index));
    const key = date.toISOString().slice(0, 10);
    const minutes = dailyMinutes[key] || 0;

    return {
      key,
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: minutes,
      intensity:
        minutes >= 120 ? 4 : minutes >= 90 ? 3 : minutes >= 45 ? 2 : minutes > 0 ? 1 : 0,
      isToday: key === todayString(),
    };
  });
};

const getWeeklyHeatmapColumns = (days) => {
  const columns = [];
  for (let i = 0; i < days.length; i += 7) {
    columns.push(days.slice(i, i + 7));
  }
  return columns;
};

export default function App() {
  const initial = getInitialData();

  const [studyMinutes, setStudyMinutes] = useState(initial.studyMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initial.breakMinutes);
  const [studySessions, setStudySessions] = useState(initial.studySessions);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(initial.totalFocusMinutes);
  const [xp, setXp] = useState(initial.xp);
  const [currentStreak, setCurrentStreak] = useState(initial.currentStreak);
  const [longestStreak, setLongestStreak] = useState(initial.longestStreak);
  const [lastStudyDate, setLastStudyDate] = useState(initial.lastStudyDate);
  const [dailySessions, setDailySessions] = useState(initial.dailySessions);
  const [dailyMinutes, setDailyMinutes] = useState(initial.dailyMinutes);
  const [soundOn, setSoundOn] = useState(initial.soundOn);
  const [darkMode, setDarkMode] = useState(initial.darkMode);
  const [selectedCatName, setSelectedCatName] = useState(initial.selectedCatName);
  const [unlockedAchievements, setUnlockedAchievements] = useState(initial.unlockedAchievements);
  const [streakShields, setStreakShields] = useState(initial.streakShields);
  const [claimedQuestRewards, setClaimedQuestRewards] = useState(initial.claimedQuestRewards);
  const [sessionCombo, setSessionCombo] = useState(initial.sessionCombo);
  const [tasks, setTasks] = useState(initial.tasks);
  const [taskInput, setTaskInput] = useState("");
  const [sessionHistory, setSessionHistory] = useState(initial.sessionHistory);
  const [selectedSound, setSelectedSound] = useState(initial.selectedSound);
  const [soundVolume, setSoundVolume] = useState(initial.soundVolume);

  const ambientAudioRef = useRef(null);

  const [mode, setMode] = useState("study");
  const [timeLeft, setTimeLeft] = useState(initial.studyMinutes * 60);
  const [running, setRunning] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState("");
  const [lastUnlockedCat, setLastUnlockedCat] = useState(null);

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const unlockedCats = CAT_EVOLUTIONS.filter((cat) => level >= cat.level);
  const highestUnlockedCat = unlockedCats[unlockedCats.length - 1] || CAT_EVOLUTIONS[0];
  const selectedUnlockedCat = unlockedCats.find((cat) => cat.name === selectedCatName) || highestUnlockedCat;
  const currentEvolution = selectedUnlockedCat;
  const today = todayString();
  const sessionsToday = dailySessions[today] || 0;
  const completedTodayMinutes = dailyMinutes[today] || 0;

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
        dailyMinutes,
        soundOn,
        darkMode,
        selectedCatName,
        unlockedAchievements,
        streakShields,
        claimedQuestRewards,
        sessionCombo,
        tasks,
        sessionHistory,
        selectedSound,
        soundVolume,
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
    dailyMinutes,
    soundOn,
    darkMode,
    selectedCatName,
    unlockedAchievements,
    streakShields,
    claimedQuestRewards,
    sessionCombo,
    tasks,
    sessionHistory,
    selectedSound,
    soundVolume,
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

  const ambientSounds = {
    none: null,
    rain: "/sounds/rain.mp3",
    forest: "/sounds/forest.mp3",
    fire: "/sounds/fire.mp3",
    cafe: "/sounds/cafe.mp3",
    lofi: "/sounds/lofi.mp3",
  };

  const stopAmbientSound = () => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current.currentTime = 0;
      ambientAudioRef.current = null;
    }
  };

  const handleSelectSound = async (soundKey) => {
    setSelectedSound(soundKey);

    if (soundKey === "none") {
      stopAmbientSound();
      return;
    }

    try {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }

      const audio = new Audio(ambientSounds[soundKey]);
      audio.loop = true;
      audio.volume = soundVolume / 100;
      await audio.play();
      ambientAudioRef.current = audio;
    } catch (error) {
      console.log("Ambient sound could not play.", error);
      pushMessage("🎵 Add your sound files inside public/sounds to enable ambient audio.");
    }
  };

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = soundVolume / 100;
    }
  }, [soundVolume]);

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const pushMessage = (message) => {
    setUnlockMessage(message);
    window.clearTimeout(pushMessage.timeout);
    pushMessage.timeout = window.setTimeout(() => {
      setUnlockMessage("");
    }, 3600);
  };

  const maybeUnlockAchievements = ({ nextStudySessions, nextLongestStreak, nextXp }) => {
    const achievementDefinitions = [
      { id: "first-session", label: "First session", check: nextStudySessions >= 1 },
      { id: "3-day-streak", label: "3-day streak", check: nextLongestStreak >= 3 },
      { id: "10-sessions", label: "10 sessions", check: nextStudySessions >= 10 },
      { id: "100-xp", label: "100 XP", check: nextXp >= 100 },
    ];

    const newlyUnlocked = achievementDefinitions.filter(
      (achievement) => achievement.check && !unlockedAchievements.includes(achievement.id)
    );

    if (newlyUnlocked.length) {
      setUnlockedAchievements((prev) => [
        ...prev,
        ...newlyUnlocked.map((achievement) => achievement.id),
      ]);
      pushMessage(`🏅 Achievement unlocked: ${newlyUnlocked[0].label}`);
    }
  };

  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: taskInput.trim(),
        completed: false,
      },
    ]);
    setTaskInput("");
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const completeStudySession = () => {
    const todayKey = todayString();
    const yesterday = getYesterdayString();
    const sessionCountToday = dailySessions[todayKey] || 0;
    const currentCat = currentEvolution;

    let nextStreak = 1;
    let nextShieldCount = streakShields;

    if (lastStudyDate === todayKey) {
      nextStreak = currentStreak || 1;
    } else if (lastStudyDate === yesterday) {
      nextStreak = currentStreak + 1;
    } else if (
      lastStudyDate &&
      currentStreak > 0 &&
      currentCat?.ability?.type === "shield" &&
      nextShieldCount > 0
    ) {
      nextStreak = currentStreak + 1;
      nextShieldCount -= 1;
      pushMessage("🛡️ Business Kitten protected your streak!");
    }

    const oldLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
    const sessionXpReward = getSessionXp({
      cat: currentCat,
      sessionCountToday,
      streak: nextStreak,
    });
    const nextStudySessions = studySessions + 1;
    const nextTotalFocusMinutes = totalFocusMinutes + studyMinutes;
    const nextXp = xp + sessionXpReward;
    const newLevel = Math.floor(nextXp / XP_PER_LEVEL) + 1;
    const nextLongestStreak = Math.max(longestStreak, nextStreak);

    setStudySessions(nextStudySessions);
    setTotalFocusMinutes(nextTotalFocusMinutes);
    setXp(nextXp);
    setCurrentStreak(nextStreak);
    setLongestStreak(nextLongestStreak);
    setLastStudyDate(todayKey);
    setStreakShields(nextShieldCount);
    setSessionCombo((prev) => (lastStudyDate === todayKey ? prev + 1 : 1));

    setDailySessions((prev) => ({
      ...prev,
      [todayKey]: (prev[todayKey] || 0) + 1,
    }));

    setDailyMinutes((prev) => ({
      ...prev,
      [todayKey]: (prev[todayKey] || 0) + studyMinutes,
    }));

    setSessionHistory((prev) => [
      {
        id: Date.now(),
        date: todayKey,
        minutes: studyMinutes,
        completedAt: new Date().toISOString(),
        mode: "study",
      },
      ...prev,
    ]);

    if (currentCat?.ability?.type === "shield" && nextShieldCount === 0 && nextStreak >= 2) {
      setStreakShields(1);
    }

    maybeUnlockAchievements({
      nextStudySessions,
      nextLongestStreak,
      nextXp,
    });

    if (newLevel > oldLevel) {
      const unlockedCat = CAT_EVOLUTIONS.find((cat) => cat.level === newLevel);
      if (unlockedCat) {
        setLastUnlockedCat(unlockedCat);
        pushMessage(`🐱 New cat unlocked: ${unlockedCat.name}!`);

        setSelectedCatName((prevSelected) => {
          const selectedStillUnlocked = CAT_EVOLUTIONS.some(
            (cat) => cat.name === prevSelected && cat.level <= newLevel
          );
          return selectedStillUnlocked ? prevSelected : unlockedCat.name;
        });
      }
    }

    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 3500);
  };

  const claimQuest = (questId) => {
    const currentCat = currentEvolution;
    const questReward = 12 + getQuestXpBonus(currentCat);
    setXp((prev) => prev + questReward);
    setClaimedQuestRewards((prev) => ({
      ...prev,
      [todayString()]: {
        ...(prev[todayString()] || {}),
        [questId]: true,
      },
    }));
    pushMessage(`✨ Daily quest claimed: +${questReward} XP`);
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
  }, [running, mode, studyMinutes, breakMinutes, soundOn, lastStudyDate, currentStreak, xp, streakShields, selectedCatName, dailySessions, studySessions, totalFocusMinutes, longestStreak]);

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
  const totalStudyHours = (totalFocusMinutes / 60).toFixed(1);
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const levelProgress = (xpIntoLevel / XP_PER_LEVEL) * 100;
  const xpToNextLevel = XP_PER_LEVEL - xpIntoLevel || XP_PER_LEVEL;
  const nextCatUnlock = CAT_EVOLUTIONS.find((cat) => cat.level > level);
  const totalDuration = (mode === "study" ? studyMinutes : breakMinutes) * 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalDuration - timeLeft) / totalDuration) * 100));
  const sessionMinutesElapsed = Math.floor((totalDuration - timeLeft) / 60);
  const sessionMinutesLeft = Math.ceil(timeLeft / 60);
  const ringRadius = 124;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progressPercent / 100) * ringCircumference;
  const weeklyActivity = getLast7Days(dailySessions);
  const weeklyPeak = Math.max(...weeklyActivity.map((day) => day.value), 1);
  const nextReward = nextCatUnlock ? `${nextCatUnlock.name} at level ${nextCatUnlock.level}` : "All cats unlocked";
  const evolutionStage = getEvolutionStage(level);
  const dailyQuestProgressMinutes = completedTodayMinutes + getDailyQuestBonusMinutes(currentEvolution);
  const dailyQuestState = claimedQuestRewards[today] || {};

  const energyBonus =
    (currentEvolution?.ability?.type === "energy" ? currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "runningEnergy" && running ? currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "restEnergy" && mode === "break" ? currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "breakEnergy" && mode === "break" ? currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "idleEnergy" && !running ? currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "sessionEnergy" ? sessionsToday * currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "streakEnergy" ? currentStreak * currentEvolution.ability.value : 0) +
    (currentEvolution?.ability?.type === "pauseEnergy" && !running ? currentEvolution.ability.value : 0);

  const catEnergy = Math.min(100, sessionsToday * 22 + (running ? 18 : 8) + energyBonus);

  const achievementDefinitions = [
    { id: "first-session", label: "First session", description: "Complete your first study session." },
    { id: "3-day-streak", label: "3-day streak", description: "Keep your chain alive for 3 days." },
    { id: "10-sessions", label: "10 sessions", description: "Finish 10 focus sessions total." },
    { id: "100-xp", label: "100 XP", description: "Reach your first 100 XP." },
  ];

  const achievements = achievementDefinitions.map((achievement) => ({
    ...achievement,
    done: unlockedAchievements.includes(achievement.id),
  }));

  const dailyQuests = [
    {
      id: "three-sessions",
      label: "Complete 3 sessions",
      current: sessionsToday,
      target: QUEST_SESSION_TARGET,
      unit: "sessions",
    },
    {
      id: "study-60-minutes",
      label: "Study 60 minutes",
      current: dailyQuestProgressMinutes,
      target: QUEST_MINUTES_TARGET,
      unit: "minutes",
    },
  ].map((quest) => ({
    ...quest,
    complete: quest.current >= quest.target,
    claimed: !!dailyQuestState[quest.id],
    progressPercent: Math.min(100, (quest.current / quest.target) * 100),
  }));

  const taskStats = {
    completed: tasks.filter((task) => task.completed).length,
    total: tasks.length,
  };

  const groupedSessionDays = useMemo(() => {
    const totals = {};

    sessionHistory.forEach((session) => {
      totals[session.date] = (totals[session.date] || 0) + session.minutes;
    });

    return Object.entries(totals)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, minutes]) => ({
        date,
        minutes,
        sessions: sessionHistory.filter((session) => session.date === date).length,
      }));
  }, [sessionHistory]);

  const productivityStats = useMemo(() => {
    const totalMinutes = sessionHistory.reduce((sum, session) => sum + session.minutes, 0);
    const averageSessionLength = sessionHistory.length
      ? Math.round(totalMinutes / sessionHistory.length)
      : 0;

    const productiveDay = groupedSessionDays.length
      ? groupedSessionDays.reduce((best, current) =>
          current.minutes > best.minutes ? current : best
        )
      : null;

    return {
      totalFocusHours: (totalMinutes / 60).toFixed(1),
      averageSessionLength,
      mostProductiveDay: productiveDay,
      sessionCount: sessionHistory.length,
    };
  }, [groupedSessionDays, sessionHistory]);

  const heatmapDays = useMemo(() => getLastNDays(dailyMinutes, 84), [dailyMinutes]);
  const heatmapColumns = useMemo(() => getWeeklyHeatmapColumns(heatmapDays), [heatmapDays]);


  const catMood = useMemo(() => {
    if (isCelebrating) {
      return {
        badge: "Celebrating",
        emoji: "🎉",
        title: currentEvolution?.name || "Victory cat",
        text: `Session complete. ${currentEvolution?.ability?.title || "Your cat"} is helping you snowball faster.`,
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

  const timerStateLabel =
    isCelebrating
      ? "Completed"
      : running
      ? mode === "study"
        ? "Focus in progress"
        : "Break in progress"
      : mode === "study"
      ? "Ready to focus"
      : "Ready to recharge";

  return (
    <div className={`app ${darkMode ? "dark" : ""} ${running ? "focus-active" : ""} ${mode}`}>
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
              A cozy focus dashboard with streaks, evolving cats, daily quests,
              achievements, tasks, analytics, session history, and focus sounds.
            </p>
          </div>

          <button className="theme-toggle" onClick={() => setDarkMode((v) => !v)}>
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

              <div className={`mode-pill ${mode}`}>{mode === "study" ? "Focus" : "Break"}</div>
            </div>

            <div className="mode-row">
              <button
                className={mode === "study" ? "mode-btn active-mode study" : "mode-btn"}
                onClick={() => switchMode("study")}
              >
                Study
              </button>

              <button
                className={mode === "break" ? "mode-btn active-mode break" : "mode-btn"}
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
                <span className="timer-chip">{running ? "● In progress" : "○ Waiting"}</span>
                <span className="timer-chip subtle">
                  {running
                    ? `${sessionMinutesElapsed} min done`
                    : `${mode === "study" ? studyMinutes : breakMinutes} min planned`}
                </span>
              </div>
            </div>

            <div className="progress-track shimmer-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="controls">
              <button className="main-btn primary" onClick={() => !running && setRunning(true)}>
                Start
              </button>
              <button className="main-btn secondary" onClick={() => setRunning(false)}>
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
              {evolutionStage} · Level {level} · {unlockedCats.length}/{CAT_EVOLUTIONS.length} unlocked
            </p>

            {unlockMessage ? <div className="unlock-popup">{unlockMessage}</div> : null}

            <div className="cat-ability-card interactive-card">
              <span className="mini-panel-label">Special ability</span>
              <strong>{currentEvolution.ability.title}</strong>
              <p>{currentEvolution.ability.description}</p>
            </div>

            <p className="cat-copy">{catMood.text}</p>
            <p className="cat-quote">“{catMood.quote}”</p>

            <div className="energy-card interactive-card">
              <div className="energy-head">
                <span>Cat energy</span>
                <strong>{catEnergy}%</strong>
              </div>
              <div className="progress-track energy-track">
                <div className="progress-fill energy-fill" style={{ width: `${catEnergy}%` }} />
              </div>
            </div>

            <div className="cat-stats-mini">
              <div className="interactive-card">
                <span>Next sprint</span>
                <strong>{mode === "study" ? `${studyMinutes} min` : `${breakMinutes} min`}</strong>
              </div>
              <div className="interactive-card">
                <span>Today</span>
                <strong>{completedTodayMinutes} min</strong>
              </div>
              <div className="interactive-card">
                <span>Streak shields</span>
                <strong>{streakShields}</strong>
              </div>
              <div className="interactive-card">
                <span>Combo</span>
                <strong>x{sessionCombo || 1}</strong>
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


        <div className="productivity-grid">
          <section className="glass panel tasks-panel interactive-panel">
            <div className="panel-top">
              <div>
                <p className="section-label">Today’s tasks</p>
                <h2>Task list</h2>
              </div>
              <div className="level-chip">
                {taskStats.completed}/{taskStats.total || 0} done
              </div>
            </div>

            <div className="task-input-row">
              <input
                className="task-input"
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                }}
                placeholder="Add a task for today..."
              />
              <button className="main-btn primary task-add-btn" onClick={addTask}>
                Add
              </button>
            </div>

            <div className="task-list">
              {tasks.length ? (
                tasks.map((task) => (
                  <div key={task.id} className={`task-row interactive-card ${task.completed ? "done" : ""}`}>
                    <label className="task-check">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className="task-custom-check" />
                    </label>

                    <div className="task-copy">
                      <strong>{task.text}</strong>
                      <small>{task.completed ? "Completed" : "Still pending"}</small>
                    </div>

                    <button className="task-delete-btn" onClick={() => deleteTask(task.id)}>
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state-card interactive-card">
                  No tasks yet. Add your first task for today.
                </div>
              )}
            </div>
          </section>

          <section className="glass panel sounds-panel interactive-panel">
            <div className="panel-top">
              <div>
                <p className="section-label">Focus sounds</p>
                <h2>Ambient player</h2>
              </div>
              <div className="level-chip">{selectedSound === "none" ? "Silent" : selectedSound}</div>
            </div>

            <div className="sound-grid">
              {[
                { key: "fire", label: "Fire" },
                { key: "rain", label: "Rain" },
                { key: "forest", label: "Forest" },
                { key: "cafe", label: "Café noise" },
                { key: "lofi", label: "Lo-fi music" },
              ].map((sound) => (
                <button
                  key={sound.key}
                  className={`sound-chip ${selectedSound === sound.key ? "active" : ""}`}
                  onClick={() => handleSelectSound(sound.key)}
                >
                  {sound.label}
                </button>
              ))}
            </div>

            <div className="sound-controls-card interactive-card">
              <div className="setting-head">
                <label>Volume</label>
                <span>{soundVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soundVolume}
                onChange={(e) => setSoundVolume(Number(e.target.value))}
              />
            </div>

            <div className="sound-footer">
              <button className="main-btn ghost" onClick={() => handleSelectSound("none")}>
                Stop sound
              </button>
              <p className="helper-text">
                Put rain.mp3, forest.mp3, fire.mp3, cafe.mp3, and lofi.mp3 inside <code>public/sounds</code>.
              </p>
            </div>
          </section>
        </div>

        <section className="glass panel analytics-panel interactive-panel">
          <div className="panel-top">
            <div>
              <p className="section-label">Statistics dashboard</p>
              <h2>Focus analytics</h2>
            </div>
            <div className="level-chip">{productivityStats.sessionCount} sessions</div>
          </div>

          <div className="analytics-stats-grid">
            <div className="analytics-stat-card interactive-card">
              <span>Total focus hours</span>
              <strong>{productivityStats.totalFocusHours}h</strong>
            </div>
            <div className="analytics-stat-card interactive-card">
              <span>Longest streak</span>
              <strong>{longestStreak} days</strong>
            </div>
            <div className="analytics-stat-card interactive-card">
              <span>Most productive day</span>
              <strong>
                {productivityStats.mostProductiveDay
                  ? formatDisplayDate(productivityStats.mostProductiveDay.date)
                  : "No data yet"}
              </strong>
            </div>
            <div className="analytics-stat-card interactive-card">
              <span>Average session</span>
              <strong>{productivityStats.averageSessionLength} min</strong>
            </div>
          </div>

          <div className="analytics-chart-card interactive-card">
            <div className="weekly-progress-head">
              <span>Focus heatmap</span>
              <strong>Last 12 weeks</strong>
            </div>

            <div className="heatmap-wrap">
              <div className="heatmap-weekdays">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="heatmap-grid">
                {heatmapColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="heatmap-column">
                    {column.map((day) => (
                      <div
                        key={day.key}
                        className={`heatmap-cell intensity-${day.intensity} ${day.isToday ? "today" : ""}`}
                        title={`${day.label} · ${day.value} focus minutes`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="heatmap-legend">
              <span>Less</span>
              <div className="legend-scale">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span key={level} className={`heatmap-cell intensity-${level}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="history-list-card interactive-card">
            <div className="weekly-progress-head">
              <span>Session history</span>
              <strong>{groupedSessionDays.length} active days</strong>
            </div>

            <div className="history-list">
              {groupedSessionDays.length ? (
                groupedSessionDays.slice(0, 8).map((day) => (
                  <div key={day.date} className="history-row">
                    <div>
                      <strong>{formatDisplayDate(day.date)}</strong>
                      <small>{day.sessions} focus session{day.sessions > 1 ? "s" : ""}</small>
                    </div>
                    <span>{day.minutes} min</span>
                  </div>
                ))
              ) : (
                <div className="empty-state-card">Complete one focus session to build your history.</div>
              )}
            </div>

            {sessionHistory.length ? (
              <div className="recent-sessions">
                <span className="mini-panel-label">Recent completions</span>
                <div className="recent-session-list">
                  {sessionHistory.slice(0, 5).map((session) => (
                    <div key={session.id} className="recent-session-chip">
                      {formatSessionDateTime(session.completedAt)} · {session.minutes} min
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <div className="bottom-grid">
          <section className="glass panel xp-panel interactive-panel">
            <div className="panel-top">
              <div>
                <p className="section-label">Progression</p>
                <h2>XP, Achievements & Quests</h2>
              </div>
              <div className="level-chip">Level {level}</div>
            </div>

            <div className="xp-top-row">
              <div>
                <div className="xp-number">{xp} XP</div>
                <p className="helper-text">
                  Base reward = {XP_PER_SESSION} XP · current cat ability can add more every session.
                </p>
              </div>

              <div className="next-unlock-card interactive-card">
                <span>Next unlock</span>
                <strong>{nextReward}</strong>
                <small>{xpToNextLevel} XP to go</small>
              </div>
            </div>

            <div className="progress-track large shimmer-track xp-track">
              <div className="progress-fill xp-fill" style={{ width: `${levelProgress}%` }} />
            </div>

            <div className="xp-meta-grid">
              <div className="mini-panel interactive-card">
                <span className="mini-panel-label">Evolution stage</span>
                <strong>{evolutionStage}</strong>
              </div>
              <div className="mini-panel interactive-card">
                <span className="mini-panel-label">Session bonus</span>
                <strong>{currentEvolution.ability.title}</strong>
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

            <div className="achievement-strip achievement-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`achievement-chip ${achievement.done ? "done" : ""}`}>
                  <span>{achievement.done ? "✓" : "•"}</span>
                  <div>
                    <strong>{achievement.label}</strong>
                    <small>{achievement.description}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="quest-grid">
              {dailyQuests.map((quest) => (
                <div key={quest.id} className={`quest-card interactive-card ${quest.complete ? "complete" : ""}`}>
                  <div className="quest-top-row">
                    <div>
                      <span className="mini-panel-label">Daily quest</span>
                      <strong>{quest.label}</strong>
                    </div>
                    <span className="quest-badge">
                      {Math.min(quest.current, quest.target)}/{quest.target} {quest.unit}
                    </span>
                  </div>

                  <div className="progress-track quest-track">
                    <div className="progress-fill quest-fill" style={{ width: `${quest.progressPercent}%` }} />
                  </div>

                  <div className="quest-footer">
                    <small>{quest.complete ? "Ready to claim" : "Keep going"}</small>
                    <button
                      className="main-btn secondary quest-claim-btn"
                      onClick={() => claimQuest(quest.id)}
                      disabled={!quest.complete || quest.claimed}
                    >
                      {quest.claimed ? "Claimed" : "Claim +XP"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="weekly-progress-card interactive-card">
              <div className="weekly-progress-head">
                <span>Weekly focus rhythm</span>
                <strong>{weeklyActivity.reduce((sum, day) => sum + day.value, 0)} sessions</strong>
              </div>

              <div className="weekly-bars">
                {weeklyActivity.map((day) => (
                  <div key={day.key} className={`week-bar-wrap ${day.isToday ? "today" : ""}`}>
                    <div className="week-bar" style={{ height: `${Math.max(14, (day.value / weeklyPeak) * 100)}%` }} />
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
                <span>Achievements</span>
                <strong>{achievements.filter((item) => item.done).length}/4</strong>
              </div>
              <div className="summary-row interactive-card">
                <span>Theme</span>
                <strong>{darkMode ? "Dark" : "Light"}</strong>
              </div>
              <div className="summary-row interactive-card">
                <span>Ambient</span>
                <strong>{selectedSound === "none" ? "Silent" : selectedSound}</strong>
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
                  className={`collection-card ${isUnlocked ? "unlocked" : "locked"} ${isCurrent ? "current" : ""}`}
                  onClick={() => {
                    if (isUnlocked) {
                      setSelectedCatName(cat.name);
                    }
                  }}
                  disabled={!isUnlocked}
                >
                  <div className="collection-image-wrap">
                    <img src={cat.img} alt={cat.name} className="collection-image" />
                    {!isUnlocked ? <div className="collection-lock">🔒 Locked</div> : null}
                    {isCurrent ? <div className="collection-current-badge">Using now</div> : null}
                  </div>

                  <div className="collection-info">
                    <h3>{cat.name}</h3>
                    <p>{isUnlocked ? cat.ability.title : `Unlocks at level ${cat.level}`}</p>
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
