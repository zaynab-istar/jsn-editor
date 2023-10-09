import React from 'react';
import './JsonEditor.css';

function ResultPanel({ data }) {
  return (
    <div className="col-8 p-3 json-container">
      {data.map((item, index) => (
        <div key={index} className="mb-3">
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

export default ResultPanel;
