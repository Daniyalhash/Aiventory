import React from 'react';
import "@/styles/Why.css"; // Import your CSS styles

const Why = () => {
  return (
    <div className="whyContainer">
      <h2>
        Why <span className="brand">A</span><span className='brandSub'>iventory</span><span className='brandSub2'>?</span>
      </h2>
      <p>
        Our system ensures efficient stock management by automating tasks, predicting demand, and optimizing 
        inventory levels with <span className="highlight">AI-driven</span> insights.
      </p>

      {/* Keywords Section */}
      <div className="keywords">
        <span className="keyword yellow">Integration</span>
        <span className="keyword red">Simplicity</span>
        <span className="keyword purple">Security</span>
        <span className="keyword blue">Insights</span>
        <span className="keyword white">Compliance</span>
        <span className="keyword white">Visibility</span>
        <span className="keyword yellow">Optimization</span>
        <span className="keyword pink">Scalability</span>
        <span className="keyword yellow">Reliability</span>
        <span className="keyword green">Autoamtion</span>
        <span className="keyword black">Replenishment</span>
        <span className="keyword pink">Efficiency</span>
        <span className="keyword green">Accuracy</span>
        <span className="keyword blue">Forecasting</span>
        <span className="keyword yellow">Stock Control</span>
        <span className="keyword blue">Real-time Tracking</span>
        <span className="keyword black">Supply Chain</span>

      </div>
    </div>
  );
};

export default Why;
