import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import './App.css';

const seasonData = [
  { season: 'winter', baby: 14, teen: 9, adult: 7, senior: 8 },
  { season: 'spring', baby: 13.5, teen: 8, adult: 6.5, senior: 7 },
  { season: 'summer', baby: 13, teen: 8.5, adult: 6, senior: 6.5 },
  { season: 'fall', baby: 13.8, teen: 9.2, adult: 6.8, senior: 7.2 },
];

const yearData = [
  { year: 2020, student: 7, partTime: 6, fullTime: 6.5 },
  { year: 2021, student: 6.8, partTime: 6.1, fullTime: 6.3 },
  { year: 2022, student: 7.1, partTime: 6.4, fullTime: 6.6 },
  { year: 2023, student: 6.9, partTime: 6.2, fullTime: 6.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const order = ['baby', 'teen', 'adult', 'senior'];
    const sortedPayload = order
      .map(key => payload.find(p => p.dataKey === key))
      .filter(Boolean);

    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p><strong>{label}</strong></p>
        {sortedPayload.map(entry => (
          <p key={entry.dataKey} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.value} h
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  const order = ['baby', 'teen', 'adult', 'senior'];
  const sortedPayload = order
    .map(key => payload.find(p => p.value === key))
    .filter(Boolean);

  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      {sortedPayload.map(entry => (
        <div key={entry.value} style={{ color: entry.color, cursor: 'default', display: 'flex', alignItems: 'center' }}>
          <svg width="14" height="14" style={{ marginRight: 5 }}>
            <rect width="14" height="14" fill={entry.color} />
          </svg>
          {entry.payload.name}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [lang, setLang] = useState('en');

  const [visibleLines, setVisibleLines] = useState({
    student: true,
    partTime: true,
    fullTime: true,
  });

  const labels = {
    en: {
      title: 'Sleep Dashboard',
      tips: 'Tips',
      sources: 'Sources',
      season: 'Seasonal Sleep by Age Group',
      year: 'Sleep Trend by Job Type',
      baby: 'Baby',
      teen: 'Teen',
      adult: 'Adult',
      senior: 'Senior',
      student: 'Student',
      partTime: 'Part-time',
      fullTime: 'Full-time',
      tipList: [
        "Avoid screens before bed.",
        "Maintain a consistent sleep schedule.",
        "Sleep in a dark, quiet room."
      ],
      sourceText: "Sleep data is generated using AI tools for educational purposes.",
      seasons: {
        winter: 'Winter',
        spring: 'Spring',
        summer: 'Summer',
        fall: 'Fall',
      }
    },
    fr: {
      title: 'Tableau du Sommeil',
      tips: 'Conseils',
      sources: 'Sources',
      season: 'Sommeil saisonnier par groupe d’âge',
      year: 'Tendance du sommeil par type de travail',
      baby: 'Bébé',
      teen: 'Adolescent',
      adult: 'Adulte',
      senior: 'Aîné',
      student: 'Étudiant',
      partTime: 'Temps partiel',
      fullTime: 'Temps plein',
      tipList: [
        "Évitez les écrans avant de dormir.",
        "Gardez un horaire de sommeil régulier.",
        "Dormez dans une pièce sombre et calme."
      ],
      sourceText: "Les données sur le sommeil sont générées par l’IA à des fins éducatives.",
      seasons: {
        winter: 'Hiver',
        spring: 'Printemps',
        summer: 'Été',
        fall: 'Automne',
      }
    }
  };

  const text = labels[lang];

  const toggleLine = (line) => {
    setVisibleLines(prev => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>{text.title}</h1>
        <nav>
          <a href="#tips">{text.tips}</a>
          <a href="#sources">{text.sources}</a>
        </nav>
        <div className="lang-buttons">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            className={lang === 'fr' ? 'active' : ''}
            onClick={() => setLang('fr')}
          >
            FR
          </button>
        </div>
      </header>

      <main>
        <section>
          <h2>{text.season}</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={seasonData}>
              <XAxis dataKey="season" tickFormatter={(tick) => text.seasons[tick]} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={CustomLegend} />
              <Bar dataKey="baby" name={text.baby} fill="#FF6B6B" />
              <Bar dataKey="teen" name={text.teen} fill="#FFD93D" />
              <Bar dataKey="adult" name={text.adult} fill="#6BCB77" />
              <Bar dataKey="senior" name={text.senior} fill="#4D96FF" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section>
          <h2>{text.year}</h2>

          <div style={{ marginBottom: 10 }}>
            {["student", "partTime", "fullTime"].map(lineKey => (
              <label key={lineKey} style={{ marginRight: 15, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={visibleLines[lineKey]}
                  onChange={() => toggleLine(lineKey)}
                  style={{ marginRight: 5 }}
                />
                {text[lineKey]}
              </label>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={yearData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {visibleLines.student && (
                <Line
                  type="monotone"
                  dataKey="student"
                  name={text.student}
                  stroke="#e8720c"
                />
              )}
              {visibleLines.partTime && (
                <Line
                  type="monotone"
                  dataKey="partTime"
                  name={text.partTime}
                  stroke="#de14d0"
                />
              )}
              {visibleLines.fullTime && (
                <Line
                  type="monotone"
                  dataKey="fullTime"
                  name={text.fullTime}
                  stroke="#5e14de"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section id="tips">
          <h2>{text.tips}</h2>
          <ul>
            {text.tipList.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <section id="sources">
          <h2>{text.sources}</h2>
          <p>{text.sourceText}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
