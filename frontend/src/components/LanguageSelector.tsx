import { useState } from "react";
import type { Language } from "../i18n/language";
import { useLanguage } from "../i18n/useLanguage";
import "./LanguageSelector.css";

const languages: Array<{
  code: Language;
  flagCodes: string[];
  label: string;
  shortLabel: string;
}> = [
  { code: "fr", flagCodes: ["fr"], label: "Français", shortLabel: "FR" },
  { code: "en", flagCodes: ["gb", "us"], label: "English", shortLabel: "EN" },
];

function renderFlags(flagCodes: string[]) {
  return (
    <span
      className={`language-selector__flags language-selector__flags--${flagCodes.length}`}
      aria-hidden="true"
    >
      {flagCodes.map((flagCode) => (
        <span
          className={`language-selector__flag language-selector__flag--${flagCode}`}
          key={flagCode}
        />
      ))}
    </span>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0];

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setIsOpen(false);
  }

  return (
    <div className="language-selector">
      <button
        className="language-selector__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {renderFlags(currentLanguage.flagCodes)}
        <span>{currentLanguage.shortLabel}</span>
      </button>

      {isOpen && (
        <div className="language-selector__menu" role="menu">
          {languages.map((item) => (
            <button
              className={`language-selector__option${
                item.code === language ? " language-selector__option--active" : ""
              }`}
              key={item.code}
              type="button"
              role="menuitemradio"
              aria-checked={item.code === language}
              onClick={() => handleLanguageChange(item.code)}
            >
              {renderFlags(item.flagCodes)}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
