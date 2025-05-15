import React from 'react';
import './WorkStages.css';

const WorkStages = ({ stages }) => (
  <section className="work-stages">
    <h2>НАШИ ПРИЕМУЩЕСТВА</h2>
    <div className="stages-grid">
      {stages.map((stage, i) => (
        <div key={i} className="stage-card">
          <div className="stage-number">
            <img src={stage.image} alt={`Stage ${i + 1}`} />
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WorkStages;
