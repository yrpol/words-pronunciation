"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";

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
  const { translations } = useLocale();
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState("en");
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAudio = async () => {
    if (!word) return;
    setError(null);
    setAudioUrls([]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/forvo?word=${encodeURIComponent(word)}&language=${language}`,
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Received data:", data);

      if (data.items && data.items.length > 0) {
        setAudioUrls(data.items.map((item: any) => item.pathmp3));
      } else {
        setError(translations.app.noAudioFound);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(translations.app.error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAudio = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${word}-${language}-${index + 1}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <h2 className="text-xl font-bold mb-4 dark:text-white">
        {translations.app.title}
      </h2>

      <input
        type="text"
        placeholder={translations.app.wordPlaceholder}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <select
        className="border p-2 rounded w-full mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {translations.languages[code]}
          </option>
        ))}
      </select>

      <button
        className={`mt-2 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={fetchAudio}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : translations.app.getAudio}
      </button>

      {error && <p className="text-red-500 mt-2 dark:text-red-400">{error}</p>}

      {audioUrls.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold dark:text-white">
            {translations.app.pronunciationVariants}
          </h3>
          {audioUrls.map((url, index) => (
            <div key={index} className="mt-2">
              <audio controls className="w-full dark:bg-gray-700">
                <source src={url} type="audio/mpeg" />
                {translations.app.browserNotSupported}
              </audio>
              <button
                className="mt-1 bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
                onClick={() => downloadAudio(url, index)}
              >
                {translations.app.download} {index + 1}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForvoAudioApp;
