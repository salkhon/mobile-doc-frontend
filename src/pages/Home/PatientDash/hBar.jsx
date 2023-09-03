import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons } from '@fortawesome/free-solid-svg-icons';


const HorizontalBar = ({text1,text2,text3}) => {
  const items = [
    { icon: <FontAwesomeIcon icon={faIcons} />, text: text1 },
    { icon: <FontAwesomeIcon icon={faIcons} />, text: text2 },
    { icon: <FontAwesomeIcon icon={faIcons} />, text: text3 },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // background: '#f0f0f0',
        padding: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 10px',
            // borderRadius: '6px',
            // background: '#fff',
            // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ marginRight: '8px' }}>{item.icon}</div>
          <div>{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBar;
