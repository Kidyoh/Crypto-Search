import React from "react";
import "./Shega.css";



const Shega = ({
  name,
  price,
  convertedPrice,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  showChart,
  curOpen,
  onOpen,
  num
}) => {
  const isOpen = num === curOpen;

  function handleToggle (){
    onOpen(isOpen ? null : num);
  }

  return (
    <div className="shega-container min-w-3" onClick={handleToggle}>
      <div className="shega-row">
        <div className="shega">
          <img src={image} alt="crypto" />
          <h2>{name}</h2>
          <p className="shega-symbol">{symbol}</p>
        </div>
        <div className="shega-data">
          <p className="shega-price">${price}</p>
          
          <p className="shega-priceChange">${convertedPrice}</p>
          <p className="shega-volume">${volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className="shega-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="shega-percent green">{priceChange.toFixed(2)}%</p>
          )}

          <p className="shega-marketcap">
            ${marketcap.toLocaleString()}
          </p>
         <p>{isOpen ? "Hide Chart" : "Show Chart"}</p>
        </div>
      </div>
    </div>
  );
};

export default Shega;
