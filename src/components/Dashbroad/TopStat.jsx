import React from 'react';
import { Statistic } from 'antd';
import { Link } from 'react-router-dom';

const TopStat = ({ title }) => {
  return (
    <div className='top-stat'>
        <h2 className='title-item'>{title}</h2>
        <div className='top-stat-list'>
            <TopItem />
            <TopItem />
            <TopItem />
            <TopItem />
        </div>
    </div>
  )
}

const TopItem = () => {
    return (
        <Link className='top-stat-item' to="/">
            <img src="https://drive.google.com/uc?id=12gz6NNSGUQyXm5IZ7kgnymiQXe1NGMfF&export=download" alt="poster"/>
            <div className='top-stat-info'>
                <span className='name'>Video namesadajsbdajsdajbdsjabsdbajdsbjabdsbajbdsjabdb</span>
                <span className='publish'>publish at</span>
            </div>
            <Statistic className="top-stat-index" title="" value={112893}/>
            
        </Link>
    )
}

export default TopStat;