import React from 'react';
import MonthlyLineChart from './MonthlyLineChart';
import './dashbroad.scss';
import GeneralReport from './GeneralReport';

const Dashbroad = () => {
  return (
    <div className='dash-container'>
        <GeneralReport />
        <MonthlyLineChart title={'View'}/>
        <MonthlyLineChart title={'Comment'}/>
        <div className='emotion-container'>
          <div className='emotion-item'>
            <MonthlyLineChart title={'Like'} lineChartHeight={300}/>
          </div>
          <div className='emotion-item'>
            <MonthlyLineChart title={'Dislike'} lineChartHeight={300}/>
          </div>
        </div>
        
    </div>
  )
}

export default Dashbroad;

