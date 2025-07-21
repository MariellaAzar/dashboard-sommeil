import React from 'react';

export default function LanguageToggle({ lang, setLang, labels }) {
  return (
    <div className="lang-buttons">
      <button onClick={() => setLang('fr')} disabled={lang === 'fr'}>
        Français
      </button>
      <button onClick={() => setLang('en')} disabled={lang === 'en'} style={{ marginLeft: '10px' }}>
        English
      </button>
    </div>
  );
}
