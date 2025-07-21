import React from 'react';

export default function Tips({ lang, labels }) {
  return (
    <section>
      <h3>{labels.tips_title}</h3>
      <ul>
        {labels.tips_list.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}
