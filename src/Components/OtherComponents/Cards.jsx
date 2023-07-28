import React from 'react';
import './Cards.css';



function Cards(Props) {
  return (

    <div className="statss">
                    
    <div className="stat">
    <div className="stat-titles">{Props.DisplayText}</div>
    <div className="stat-values">{Props.count}</div>
    
    </div>

    </div>
  );
}

export default Cards;