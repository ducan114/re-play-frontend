import React, { useState, useEffect } from 'react';
import { Statistic } from 'antd';
import { Line } from '@ant-design/plots';

const MonthViewChart = ({ title, lineChartHeight }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // asyncFetch();
        setData(monthlyViewData);
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
    };

    const config = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'view',
        autoFit: true,
        height: lineChartHeight,
        xAxis: {
        // type: 'timeCat',
        tickCount: 5,
        },
        smooth: true,
    };

    return (
        <div className='monthly-line-chart'>
            <div className='monthly-line-chart-header'>
                <h2 className='title-item'>{title}</h2>
                <TotalSpan />
            </div>
            
            <div className='monthly-line-chart-container'>
                <Line {...config} />
            </div>
        </div>
        
    )
}



const TotalSpan = () => {
  return (
    <div className='total-span'>
        <span>Total: </span>
        <Statistic className="total-index" title="" value={112893}/>
    </div>
  )
}

export default MonthViewChart;


const monthlyViewData = [
    {
      "Date": "2010-01",
      "view": 1998
    },
    {
      "Date": "2010-02",
      "view": 1850
    },
    {
      "Date": "2010-03",
      "view": 1720
    },
    {
      "Date": "2010-04",
      "view": 1818
    },
    {
      "Date": "2010-05",
      "view": 1920
    },
    {
      "Date": "2010-06",
      "view": 1802
    },
    {
      "Date": "2010-07",
      "view": 1945
    },
    {
      "Date": "2010-08",
      "view": 1856
    },
    {
      "Date": "2010-09",
      "view": 2107
    },
    {
      "Date": "2010-10",
      "view": 2140
    },
    {
      "Date": "2010-11",
      "view": 2311
    },
    {
      "Date": "2010-12",
      "view": 1972
    },
    {
      "Date": "2011-01",
      "view": 1760
    },
    {
      "Date": "2011-02",
      "view": 1824
    },
    {
      "Date": "2011-03",
      "view": 1801
    },
    {
      "Date": "2011-04",
      "view": 2001
    },
    {
      "Date": "2011-05",
      "view": 1640
    },
    {
      "Date": "2011-06",
      "view": 1502
    },
    {
      "Date": "2011-07",
      "view": 1621
    },
    {
      "Date": "2011-08",
      "view": 1480
    },
    {
      "Date": "2011-09",
      "view": 1549
    },
    {
      "Date": "2011-10",
      "view": 1390
    },
    {
      "Date": "2011-11",
      "view": 1325
    },
    {
      "Date": "2011-12",
      "view": 1250
    },
    {
      "Date": "2012-01",
      "view": 1394
    },
    {
      "Date": "2012-02",
      "view": 1406
    },
    {
      "Date": "2012-03",
      "view": 1578
    },
    {
      "Date": "2012-04",
      "view": 1465
    },
    {
      "Date": "2012-05",
      "view": 1689
    },
    {
      "Date": "2012-06",
      "view": 1755
    },
    {
      "Date": "2012-07",
      "view": 1495
    },
    {
      "Date": "2012-08",
      "view": 1508
    },
    {
      "Date": "2012-09",
      "view": 1433
    },
    {
      "Date": "2012-10",
      "view": 1344
    },
    {
      "Date": "2012-11",
      "view": 1201
    },
    {
      "Date": "2012-12",
      "view": 1065
    },
    {
      "Date": "2013-01",
      "view": 1255
    },
    {
      "Date": "2013-02",
      "view": 1429
    },
    {
      "Date": "2013-03",
      "view": 1398
    },
    {
      "Date": "2013-04",
      "view": 1678
    },
    {
      "Date": "2013-05",
      "view": 1524
    },
    {
      "Date": "2013-06",
      "view": 1688
    },
    {
      "Date": "2013-07",
      "view": 1500
    },
    {
      "Date": "2013-08",
      "view": 1670
    },
    {
      "Date": "2013-09",
      "view": 1734
    },
    {
      "Date": "2013-10",
      "view": 1699
    },
    {
      "Date": "2013-11",
      "view": 1508
    },
    {
      "Date": "2013-12",
      "view": 1680
    },
    {
      "Date": "2014-01",
      "view": 1750
    },
    {
      "Date": "2014-02",
      "view": 1602
    },
    {
      "Date": "2014-03",
      "view": 1834
    },
    {
      "Date": "2014-04",
      "view": 1722
    },
    {
      "Date": "2014-05",
      "view": 1430
    },
    {
      "Date": "2014-06",
      "view": 1280
    },
    {
      "Date": "2014-07",
      "view": 1367
    },
    {
      "Date": "2014-08",
      "view": 1155
    },
    {
      "Date": "2014-09",
      "view": 1289
    },
    {
      "Date": "2014-10",
      "view": 1104
    },
    {
      "Date": "2014-11",
      "view": 1246
    },
    {
      "Date": "2014-12",
      "view": 1098
    },
    {
      "Date": "2015-01",
      "view": 1189
    },
    {
      "Date": "2015-02",
      "view": 1276
    },
    {
      "Date": "2015-03",
      "view": 1033
    },
    {
      "Date": "2015-04",
      "view": 956
    },
    {
      "Date": "2015-05",
      "view": 845
    },
    {
      "Date": "2015-06",
      "view": 1089
    },
    {
      "Date": "2015-07",
      "view": 944
    },
    {
      "Date": "2015-08",
      "view": 1043
    },
    {
      "Date": "2015-09",
      "view": 893
    },
    {
      "Date": "2015-10",
      "view": 840
    },
    {
      "Date": "2015-11",
      "view": 934
    },
    {
      "Date": "2015-12",
      "view": 810
    },
    {
      "Date": "2016-01",
      "view": 782
    },
    {
      "Date": "2016-02",
      "view": 1089
    },
    {
      "Date": "2016-03",
      "view": 745
    },
    {
      "Date": "2016-04",
      "view": 680
    },
    {
      "Date": "2016-05",
      "view": 802
    },
    {
      "Date": "2016-06",
      "view": 697
    },
    {
      "Date": "2016-07",
      "view": 583
    },
    {
      "Date": "2016-08",
      "view": 456
    },
    {
      "Date": "2016-09",
      "view": 524
    },
    {
      "Date": "2016-10",
      "view": 398
    },
    {
      "Date": "2016-11",
      "view": 278
    },
    {
      "Date": "2016-12",
      "view": 195
    },
    {
      "Date": "2017-01",
      "view": 145
    },
    {
      "Date": "2017-02",
      "view": 207
    }
  ]