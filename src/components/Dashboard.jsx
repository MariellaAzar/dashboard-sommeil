import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
} from 'recharts';

// Exemple données fictives
const sleepData = {
  groupes: [
    { groupe: '13-17', sommeil: 8 },
    { groupe: '18-21', sommeil: 7 },
    { groupe: '22-25', sommeil: 6.5 },
  ],
};

const saisonData2022 = [
  {
    saison: 'Hiver',
    Bébés: 14,
    Enfants: 10,
    Adolescents: 8,
    Étudiants: 6.5,
    'Employés FT': 6,
    'Employés PT': 7,
    Seniors: 7.5,
  },
  {
    saison: 'Printemps',
    Bébés: 13.8,
    Enfants: 9.5,
    Adolescents: 8.2,
    Étudiants: 6.2,
    'Employés FT': 6,
    'Employés PT': 7.2,
    Seniors: 7.3,
  },
  {
    saison: 'Été',
    Bébés: 13.5,
    Enfants: 9,
    Adolescents: 7.8,
    Étudiants: 6,
    'Employés FT': 5.8,
    'Employés PT': 6.9,
    Seniors: 7,
  },
  {
    saison: 'Automne',
    Bébés: 14,
    Enfants: 9.8,
    Adolescents: 8,
    Étudiants: 6.4,
    'Employés FT': 6,
    'Employés PT': 7.1,
    Seniors: 7.4,
  },
];

export default function Dashboard({ lang, labels }) {
  return (
    <div className="dashboard">
      <div className="graph-section">
        <h3>{labels.bar_chart_title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sleepData.groupes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="groupe" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sommeil" fill="#00c2ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-section" style={{ marginTop: '40px' }}>
        <h3>{labels.dashboard_description}</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={saisonData2022}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="saison" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Bébés" stackId="a" fill="#ff5e5e" />
            <Bar dataKey="Enfants" stackId="a" fill="#ffa500" />
            <Bar dataKey="Adolescents" stackId="a" fill="#ffd700" />
            <Bar dataKey="Étudiants" stackId="a" fill="#00bfff" />
            <Bar dataKey="Employés FT" stackId="a" fill="#8a2be2" />
            <Bar dataKey="Employés PT" stackId="a" fill="#00fa9a" />
            <Bar dataKey="Seniors" stackId="a" fill="#ccc" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
