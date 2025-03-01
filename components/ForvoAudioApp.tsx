"use client";

import { useState } from "react";

const languages = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  ru: "Russian",
  uk: "Ukrainian",
  lv: "Latvian",
};

const ForvoAudioApp = () => {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState("en");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAudio = async () => {
    if (!word) return;
    setError(null);
    setAudioUrl(null);

    try {
      const response = await fetch(
        `/api/forvo?word=${word}&language=${language}`,
      );

      if (!response.ok) {
        throw new Error(`Помилка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Отримані дані:", data);

      if (data.items && data.items.length > 0) {
        setAudioUrl(data.items[0].pathmp3);
      } else {
        setError("Аудіо не знайдено.");
      }
    } catch (err) {
      console.error("Помилка отримання даних:", err);
      setError("Помилка отримання даних. Перевірте API-ключ або запит.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Forvo Audio Pronunciation</h2>
      <input
        type="text"
        placeholder="Введіть слово"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select
        className="border p-2 rounded w-full mt-2"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
        onClick={fetchAudio}
      >
        Отримати аудіо
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {audioUrl && (
        <audio className="mt-4" controls>
          <source src={audioUrl} type="audio/mpeg" />
          Ваш браузер не підтримує аудіо.
        </audio>
      )}
    </div>
  );
};

export default ForvoAudioApp;
