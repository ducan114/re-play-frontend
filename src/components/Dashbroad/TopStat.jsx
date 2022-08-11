import React from 'react';
import { Statistic } from 'antd';
import { Link } from 'react-router-dom';

const TopStat = ({ title, data }) => {
  return (
    <div className='top-stat'>
        <h2 className='title-item'>{title}</h2>
        <div className='top-stat-list'>
            {data?.map((i, index) => <TopItem key={index} data={i}/>)}
        </div>
    </div>
  )
}

const TopItem = ({ data }) => {
    return (
        <Link className='top-stat-item' to={data?.url.substring(21)}>
            <img src={data?.posterUrl} alt="poster"/>
            <div className='top-stat-info'>
                <span className='name'>{data?.name}</span>
                <span className='publish'>{data?.publishedAt?.substring(0,10)}</span>
            </div>
            <Statistic className="top-stat-index" title="" value={data?.amount}/>
            
        </Link>
    )
}

export default TopStat;