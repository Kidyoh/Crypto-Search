import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Shega from "./components/Shega";
import Chart from "chart.js/auto";
import img from "./assets/2.png";

function App() {
  const [shegas, setShegas] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const chartRef = useRef(null);
  const [curOpen, setCurOpen] = useState(null);
  

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res) => {
        setShegas(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSelectedCrypto(null);
    setShowChart(false); // Reset showChart when input changes
  };

  const filterShegas = shegas.filter((shega) =>
    shega.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  useEffect(() => {
    if (selectedCrypto && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1D"],
          datasets: [
            {
              label: `${selectedCrypto.name} - Change (24h)`,
              data: [selectedCrypto.price_change_percentage_24h],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              pointRadius: 12, // Increase the point size
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointBorderColor: "rgba(75, 192, 192, 1)",
              pointHoverRadius: 16,
            },
          ],
        },
      });
    }
  }, [selectedCrypto]);

  return (
    <div className="shega-app">
      <div className="shega-search">
        <div className="flex items-center min-w-2">
          <div className="">
            <p className="min-w-1 text-6xl py-16">Shega Crypto Search</p>
            <form>
              <input
                className="pl-4 w-96 h-12 outline-none bg-white rounded-2xl border-2 border-solid border-orange-600 placeholder:text-slate-400"
                type="text"
                onChange={handleChange}
                placeholder="Example: Bitcoin"
              />
            </form>
          </div>
          <img src={img} className="pl-80 object-scale-down h-54" />
        </div>
      </div>
      {filterShegas.map((shega) => (
        <div key={shega.id} onClick={() => {
          setSelectedCrypto(shega);
          toggleChart();
        }}>
          
          <Shega
            name={shega.name}
            price={shega.current_price}
            symbol={shega.symbol}
            marketcap={shega.total_volume}
            volume={shega.market_cap}
            image={shega.image}
            priceChange={shega.price_change_percentage_24h}
            showChart={showChart}
            curOpen={curOpen}
            onOpen={setCurOpen}
            num={shega.id}
          />
          {selectedCrypto === shega && showChart && (
            <div>
              <canvas ref={chartRef}></canvas>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
