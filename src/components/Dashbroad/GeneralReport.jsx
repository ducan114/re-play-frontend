import React from 'react';
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

const GeneralReport = () => {
  return (
    <div className='general-report'>
        <div className='report-header'>
            <h2>General Report</h2>
            <div>
                <select defaultValue="daily">
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
                        <div className='top-indicator index-up'>
                            <span>20%</span>
                            <ArrowUpOutlined />
                        </div>
                    </div>
                    <Statistic className="stat-index" title="" value={112893}/>
                    <span className="stat-title">Today's views</span>
                </div>
                <TopStat title={'Top 5 most watched video'}/>
            </div>
            <div className='report-item-wrap'>
                <div className='report-item'>
                    <div className='top'>
                        <CommentOutlined className='icon-left icon-cmt'/>
                        <div className='top-indicator index-down'>
                            <span>20%</span>
                            <ArrowDownOutlined />
                        </div>
                    </div>
                    <Statistic className="stat-index" title="" value={112893}/>
                    <span className="stat-title">Today's comment</span>
                </div>
                <TopStat title={'Top 5 most commented video'}/>
            </div>
            <div className='report-item-wrap'>
                <div className='report-item'>
                    <div className='top'>
                        <LikeTwoTone className='icon-left icon-like'/>
                        <div className='top-indicator index-down'>
                            <span>20%</span>
                            <ArrowDownOutlined />
                        </div>
                    </div>
                    <Statistic className="stat-index" title="" value={112893}/>
                    <span className="stat-title">Today's like</span>
                </div>
                <TopStat title={'Top 5 most liked video'}/>
            </div>
            <div className='report-item-wrap'>
                <div className='report-item'>
                    <div className='top'>
                        <DislikeTwoTone className='icon-left icon-dislike'/>
                        <div className='top-indicator index-down'>
                            <span>20%</span>
                            <ArrowDownOutlined />
                        </div>
                    </div>
                    <Statistic className="stat-index" title="" value={112893}/>
                    <span className="stat-title">Today's dislike</span>
                </div>
                <TopStat title={'Top 5 most disliked video'}/>
            </div>
        </div>
    </div>
  )
}

export default GeneralReport;