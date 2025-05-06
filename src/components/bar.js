import { useEffect, useState } from "react";
import "./bar.css";

function Bar({ index, length, color, changeArray = () => {} }) {
  const [len, setLen] = useState(length);

  useEffect(() => {
    setLen(length);
  }, [length]);

  const colors = [
    ['rgba(61,90,241,0.5)', 'rgba(61,90,241,0.2)'],
    ['rgba(255,48,79,1)', 'rgba(255,48,79,0.5)'],
    ['rgba(131,232,90,0.5)', 'rgba(131,232,90,0.2)'],
  ];

  const validColor = (color !== undefined && color >= 0 && color < colors.length) ? color : 0;

  const inputStyle = {
    position: 'relative',
    top: Math.floor(len / 2) - 12,
    width: len,
    left: -Math.floor(len / 2) + 13,
    border: 'none',
    background: 'none',
  };

  const bottom = {
    transform: `translateY(${200 - len}px) rotateX(-90deg)`,
    backgroundColor: `${colors[validColor][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[validColor][1]}`,
    transition: '0.3s'
  };

  const front_back_right_left = {
    height: `${len}px`,
    transform: `translateY(${200 - len}px)`,
    backgroundColor: `${colors[validColor][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[validColor][1]}`,
    transition: '0.3s'
  };

  const quantity = {
    position: 'relative',
    top: 225,
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === '') {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      const newVal = Math.min(200, Math.max(5, val));
      setLen(newVal);
      changeArray(index, newVal);
    }
  };

  const increment = () => {
    setLen(prevLen => {
      const newLen = Math.min(prevLen + 1, 200);
      changeArray(index, newLen);
      return newLen;
    });
  };

  const decrement = () => {
    setLen(prevLen => {
      const newLen = Math.max(prevLen - 1, 5);
      changeArray(index, newLen);
      return newLen;
    });
  };

  return (
    <>
      <div className="bar">
        <div className="side top"></div>
        <div className="side bottom" style={bottom}></div>
        <div className="side right">
          <div className="color-bar right-color-bar" style={front_back_right_left}></div>
        </div>
        <div className="side left">
          <div className="color-bar right-color-bar" style={front_back_right_left}></div>
        </div>
        <div className="side front">
          <div className="color-bar front-color-bar" style={front_back_right_left}>
            <input
              type="number"
              style={inputStyle}
              value={len}
              className="input"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="side back">
          <div className="color-bar back-color-bar" style={front_back_right_left}></div>
        </div>

        {/* + and - Buttons for individual bar */}
        <div className="quantity-nav">
          <div className="quantity-button quantity-up" style={quantity} onClick={increment}>+</div>
          <div className="quantity-button quantity-down" style={quantity} onClick={decrement}>-</div>
        </div>
      </div>
    </>
  );
}

export default Bar;
