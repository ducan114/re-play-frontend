import React, { useState, useEffect } from 'react';
import { Statistic } from 'antd';
import { 
    EyeOutlined, 
    CommentOutlined, 
    LikeTwoTone, 
    DislikeTwoTone, 
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import TopStat from './TopStat';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GeneralReport = () => {
    const [filter, setFilter] = useState('yearly');
    const [data, setData] = useState({});

    useEffect(() => {
        const getData = async () => {
            let curDate = new Date();
            let url = ''
            if(filter === 'yearly') {
                url = `${API_BASE_URL}/dashboard/general-report?year=${curDate.getFullYear()}`
            } else if (filter === 'monthly') {
                url = `${API_BASE_URL}/dashboard/general-report?year=${curDate.getFullYear()}&month=${curDate.getMonth()}`
            } else if (filter === 'daily') {
                url = `${API_BASE_URL}/dashboard/general-report?year=${curDate.getFullYear()}&month=${curDate.getMonth()}&day=${curDate.getDate()}`
            }
            let response = await axios.get(url);
            console.log(response)
            setData(response.data);
        }

        getData();
    }, [filter])
    
    return (
        <div className='general-report'>
            <div className='report-header'>
                <h2>General Report</h2>
                <div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>
            <div className='report-container'>
                <div className='report-item-wrap'>
                    <div className='report-item'>
                        <div className='top'>
                            <EyeOutlined className='icon-left icon-eye'/>
                            <div className={`top-indicator index-${data?.view?.volatility?.type}`}>
                                <span>{`${data?.view?.volatility?.percent || 0.1}%`}</span>
                                {data?.view?.volatility?.type === 'down'
                                    ? <ArrowDownOutlined />
                                    : <ArrowUpOutlined />
                                }
                            </div>
                        </div>
                        <Statistic className="stat-index" title="" value={data?.view?.amount || 0}/>
                        <span className="stat-title">
                            {filter === 'daily' && "Today's views"}
                            {filter === 'monthly' && "Month's views"}
                            {filter === 'yearly' && "Year's views"}
                        </span>
                    </div>
                    <TopStat title={'Top most watched video'} data={data?.view?.top5}/>
                </div>
                <div className='report-item-wrap'>
                    <div className='report-item'>
                        <div className='top'>
                            <CommentOutlined className='icon-left icon-cmt'/>
                            <div className={`top-indicator index-${data?.comment?.volatility?.type}`}>
                                <span>{`${data?.comment?.volatility?.percent || 0.1}%`}</span>
                                {data?.comment?.volatility?.type === 'down'
                                    ? <ArrowDownOutlined />
                                    : <ArrowUpOutlined />
                                }
                            </div>
                        </div>
                        <Statistic className="stat-index" title="" value={data?.comment?.amount || 0}/>
                        <span className="stat-title">
                            {filter === 'daily' && "Today's comments"}
                            {filter === 'monthly' && "Month's comments"}
                            {filter === 'yearly' && "Year's comments"}
                        </span>
                    </div>
                    <TopStat title={'Top most commented video'} data={data?.comment?.top5}/>
                </div>
                <div className='report-item-wrap'>
                    <div className='report-item'>
                        <div className='top'>
                            <LikeTwoTone className='icon-left icon-like'/>
                            <div className={`top-indicator index-${data?.like?.volatility?.type}`}>
                                <span>{`${data?.like?.volatility?.percent || 0.1}%`}</span>
                                {data?.like?.volatility?.type === 'down'
                                    ? <ArrowDownOutlined />
                                    : <ArrowUpOutlined />
                                }
                            </div>
                        </div>
                        <Statistic className="stat-index" title="" value={data?.like?.amount || 0}/>
                        <span className="stat-title">
                            {filter === 'daily' && "Today's likes"}
                            {filter === 'monthly' && "Month's likes"}
                            {filter === 'yearly' && "Year's likes"}
                        </span>
                    </div>
                    <TopStat title={'Top most liked video'} data={data?.like?.top5}/>
                </div>
                <div className='report-item-wrap'>
                    <div className='report-item'>
                        <div className='top'>
                            <DislikeTwoTone className='icon-left icon-dislike'/>
                            <div className={`top-indicator index-${data?.dislike?.volatility?.type}`}>
                                <span>{`${data?.dislike?.volatility?.percent || 0.1}%`}</span>
                                {data?.dislike?.volatility?.type === 'down'
                                    ? <ArrowDownOutlined />
                                    : <ArrowUpOutlined />
                                }
                            </div>
                        </div>
                        <Statistic className="stat-index" title="" value={data?.dislike?.amount || 0}/>
                        <span className="stat-title">
                            {filter === 'daily' && "Today's dislike"}
                            {filter === 'monthly' && "Month's dislike"}
                            {filter === 'yearly' && "Year's dislike"}
                        </span>
                    </div>
                    <TopStat title={'Top most disliked video'} data={data?.dislike?.top5}/>
                </div>
            </div>
        </div>
    )
}

export default GeneralReport;