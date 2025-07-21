import React from 'react';

export default function Sources({ lang, labels }) {
  return (
    <section>
      <h3>{labels.data_source_title}</h3>
      <p>{labels.sources_text}</p>
    </section>
  );
}
