import React, { useState, useEffect } from 'react';
import { Statistic } from 'antd';
import { Line } from '@ant-design/plots';

const fakeData = [
  {
    "Date": "2010-01",
    "amount": 1230
  },
  {
    "Date": "2010-02",
    "amount": 1451
  },
  {
    "Date": "2010-03",
    "amount": 1356
  },
  {
    "Date": "2010-04",
    "amount": 1818
  },
  {
    "Date": "2010-05",
    "amount": 1920
  },
  {
    "Date": "2010-06",
    "amount": 1802
  },
  {
    "Date": "2010-07",
    "amount": 1945
  },
  {
    "Date": "2010-08",
    "amount": 1856
  },
  {
    "Date": "2010-09",
    "amount": 2107
  },
  {
    "Date": "2010-10",
    "amount": 2140
  },
  {
    "Date": "2010-11",
    "amount": 2311
  },
  {
    "Date": "2010-12",
    "amount": 2536
  },
  {
    "Date": "2011-01",
    "amount": 1256
  },
  {
    "Date": "2011-02",
    "amount": 2536
  },
  {
    "Date": "2011-03",
    "amount": 3698
  },
  {
    "Date": "2011-04",
    "amount": 2001
  },
  {
    "Date": "2011-05",
    "amount": 1640
  },
  {
    "Date": "2011-06",
    "amount": 1502
  },
  {
    "Date": "2011-07",
    "amount": 1621
  },
  {
    "Date": "2011-08",
    "amount": 1480
  },
  {
    "Date": "2011-09",
    "amount": 1549
  },
  {
    "Date": "2011-10",
    "amount": 1390
  },
  {
    "Date": "2011-11",
    "amount": 1325
  },
  {
    "Date": "2011-12",
    "amount": 1250
  },
  {
    "Date": "2012-01",
    "amount": 1394
  },
  {
    "Date": "2012-02",
    "amount": 1406
  },
  {
    "Date": "2012-03",
    "amount": 1578
  },
  {
    "Date": "2012-04",
    "amount": 1465
  },
  {
    "Date": "2012-05",
    "amount": 1689
  },
  {
    "Date": "2012-06",
    "amount": 1755
  },
  {
    "Date": "2012-07",
    "amount": 1495
  },
  {
    "Date": "2012-08",
    "amount": 1508
  },
  {
    "Date": "2012-09",
    "amount": 1433
  },
  {
    "Date": "2012-10",
    "amount": 1344
  },
  {
    "Date": "2012-11",
    "amount": 1201
  },
  {
    "Date": "2012-12",
    "amount": 1065
  },
  {
    "Date": "2013-01",
    "amount": 1255
  },
  {
    "Date": "2013-02",
    "amount": 1429
  },
  {
    "Date": "2013-03",
    "amount": 1398
  },
  {
    "Date": "2013-04",
    "amount": 1678
  },
  {
    "Date": "2013-05",
    "amount": 1524
  },
  {
    "Date": "2013-06",
    "amount": 1688
  },
  {
    "Date": "2013-07",
    "amount": 1500
  },
  {
    "Date": "2013-08",
    "amount": 1670
  },
  {
    "Date": "2013-09",
    "amount": 1734
  },
  {
    "Date": "2013-10",
    "amount": 1699
  },
  {
    "Date": "2013-11",
    "amount": 1508
  },
  {
    "Date": "2013-12",
    "amount": 1680
  },
  {
    "Date": "2014-01",
    "amount": 1750
  },
  {
    "Date": "2014-02",
    "amount": 1602
  },
  {
    "Date": "2014-03",
    "amount": 1834
  },
  {
    "Date": "2014-04",
    "amount": 1722
  },
  {
    "Date": "2014-05",
    "amount": 1430
  },
  {
    "Date": "2014-06",
    "amount": 1280
  },
  {
    "Date": "2014-07",
    "amount": 1367
  },
  {
    "Date": "2014-08",
    "amount": 1155
  },
  {
    "Date": "2014-09",
    "amount": 1289
  },
  {
    "Date": "2014-10",
    "amount": 1104
  },
  {
    "Date": "2014-11",
    "amount": 1246
  },
  {
    "Date": "2014-12",
    "amount": 1098
  },
  {
    "Date": "2015-01",
    "amount": 1189
  },
  {
    "Date": "2015-02",
    "amount": 1276
  },
  {
    "Date": "2015-03",
    "amount": 1033
  },
  {
    "Date": "2015-04",
    "amount": 956
  },
  {
    "Date": "2015-05",
    "amount": 845
  },
  {
    "Date": "2015-06",
    "amount": 1089
  },
  {
    "Date": "2015-07",
    "amount": 944
  },
  {
    "Date": "2015-08",
    "amount": 1043
  },
  {
    "Date": "2015-09",
    "amount": 893
  },
  {
    "Date": "2015-10",
    "amount": 840
  },
  {
    "Date": "2015-11",
    "amount": 934
  },
  {
    "Date": "2015-12",
    "amount": 810
  },
  {
    "Date": "2016-01",
    "amount": 782
  },
  {
    "Date": "2016-02",
    "amount": 1089
  },
  {
    "Date": "2016-03",
    "amount": 745
  },
  {
    "Date": "2016-04",
    "amount": 680
  },
  {
    "Date": "2016-05",
    "amount": 802
  },
  {
    "Date": "2016-06",
    "amount": 697
  },
  {
    "Date": "2016-07",
    "amount": 583
  },
  {
    "Date": "2016-08",
    "amount": 456
  },
  {
    "Date": "2016-09",
    "amount": 524
  },
  {
    "Date": "2016-10",
    "amount": 398
  },
  {
    "Date": "2016-11",
    "amount": 278
  },
  {
    "Date": "2016-12",
    "amount": 195
  },
  {
    "Date": "2017-01",
    "amount": 145
  },
  {
    "Date": "2017-02",
    "amount": 207
  }
]

const MonthViewChart = ({ title, lineChartHeight, data = []}) => {
    // const [monthlyData, setMonthLyData] = useState([]);
    // const [config, setConfig] = useState({
    //     data: fakeData,
    //     padding: 'auto',
    //     xField: 'Date',
    //     yField: 'amount',
    //     autoFit: true,
    //     height: lineChartHeight,
    //     xAxis: {
    //     // type: 'timeCat',
    //     tickCount: 5,
    //     },
    //     smooth: true,
    // })

    // useEffect(() => {
    //   console.log("data input: ", data.length)
    //   setConfig({
    //     data: data?.length > 0 ? data : fakeData,
    //     padding: 'auto',
    //     xField: 'Date',
    //     yField: 'amount',
    //     autoFit: true,
    //     height: lineChartHeight,
    //     xAxis: {
    //     // type: 'timeCat',
    //     tickCount: 5,
    //     },
    //     smooth: true,
    //   })
    // }, [data])

    const config = {
        data: data?.length > 10 ? data : fakeData,
        padding: 'auto',
        xField: 'Date',
        yField: 'amount',
        autoFit: true,
        height: lineChartHeight,
        xAxis: {
        // type: 'timeCat',
        tickCount: 5,
        },
        smooth: true,
    };

    console.log("config: ", config)

    // let total = data?.reduce((a, b) => a + b.amount, 0);

    return (
        <div className='monthly-line-chart'>
            <div className='monthly-line-chart-header'>
                <h2 className='title-item'>{title}</h2>
                <TotalSpan total={data?.reduce((a, b) => a + b.amount, 0)}/>
            </div>
            
            <div className='monthly-line-chart-container'>
                <Line {...config} />
            </div>
        </div>
        
    )
}



const TotalSpan = ({ total }) => {
  return (
    <div className='total-span'>
        <span>Total: </span>
        <Statistic className="total-index" title="" value={ total }/>
    </div>
  )
}

export default MonthViewChart;


