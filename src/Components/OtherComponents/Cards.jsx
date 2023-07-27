import React from 'react';
import './Cards.css';



function Cards(Props) {
  return (

    <div className="stats">
                    
    <div className="stat">
    <div className="stat-title">{Props.DisplayText}</div>
    <div className="stat-value">{Props.count}</div>
    
    </div>

    </div>
  );
}

export default Cards;