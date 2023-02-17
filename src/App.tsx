import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import StockMarketDetails from './Components/StockMarketDetails';
import StockMarketScan from './Components/StockMarketScan';
import StockMarketVariablePage from './Components/StockMarketVariablePage';


function App() {
  const [stocksData, setStocksData] = useState<any[]>([])
  useEffect(() => {
    fetch("https://jsonware.com/api/v1/json/402b9d6d-9862-4c19-b336-c456999258d6")
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log(data.data)
        setStocksData(data.data)
      })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<StockMarketScan stocksData={stocksData} />} />
      <Route path='/details/:id' element={<StockMarketDetails stockData={stocksData} />} />
      <Route path='/variable/:value/:id' element={<StockMarketVariablePage />} />
    </Routes>

  );
}

export default App;
