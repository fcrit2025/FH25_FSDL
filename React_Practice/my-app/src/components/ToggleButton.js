import { useState } from 'react';

function ToggleButton() {
    const [isOn, setIsOn] = useState(false);
  
    const handleClick = () => {
      setIsOn(!isOn);
    };
  
    return (
      <button onClick={handleClick}>
        {isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
  
  export default ToggleButton;