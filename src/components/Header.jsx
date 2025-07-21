import React from 'react';

export default function Header({ lang, setView, labels }) {
  return (
    <header className="header">
      <h1 onClick={() => setView('dashboard')} style={{ cursor: 'pointer' }}>
        {labels.dashboard_title}
      </h1>
      <nav>
        <button onClick={() => setView('tips')}>{labels.tips_title}</button>
        <button onClick={() => setView('sources')}>{labels.data_source_title}</button>
      </nav>
    </header>
  );
}
