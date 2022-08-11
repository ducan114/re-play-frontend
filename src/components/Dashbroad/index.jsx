import React, { useState, useEffect } from 'react';
import MonthlyLineChart from './MonthlyLineChart';
import './dashbroad.scss';
import GeneralReport from './GeneralReport';
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashbroad = () => {
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const fetchMonthlyData = async () => {
      let response = await axios.get(`${API_BASE_URL}/dashboard/monthly-data?year=2022`);

      console.log("[fetchMonthlyData]: ", response);

      setMonthlyData(response.data);
    };

    fetchMonthlyData();
  }, [])

  return (
    <div className='dash-container'>
        <GeneralReport />
        <MonthlyLineChart title={'View'} data={monthlyData?.view?.content}/>
        <MonthlyLineChart title={'Comment'} data={monthlyData?.comment?.content}/>
        <div className='emotion-container'>
          <div className='emotion-item'>
            <MonthlyLineChart title={'Like'} lineChartHeight={300} data={monthlyData?.like?.content}/>
          </div>
          <div className='emotion-item'>
            <MonthlyLineChart title={'Dislike'} lineChartHeight={300} data={monthlyData?.dislike?.content}/>
          </div>
        </div>
        
    </div>
  )
}

export default Dashbroad;

