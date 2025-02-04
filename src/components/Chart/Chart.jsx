import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart=({data,country})=>{
    const [dailyData,setDailyData]=useState([]);

    useEffect(()=>{
        const fetchApi= async ()=>{
            setDailyData(await fetchDailyData());
        }
        fetchApi();
    },[]);

    const LineChart=(
        dailyData.length?
            (<Line
            data={{
                labels:dailyData.map(({date})=>date),
                datasets:[
                    {
                        data:dailyData.map(({confirmed})=>confirmed),
                        label:'Infected',
                        borderColor:'#3333ff',
                        fill:true,
                    },
                    {
                        data:dailyData.map(({deaths})=>deaths),
                        label:'Deaths',
                        borderColor:'red',
                        fill:true,
                    }],
            }}
            />):null
    );

    const BarChart=(
        data.confirmed?
            (<Bar
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[
                    {
                        label:'People',
                        backgroundColor:[
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        data:[data.confirmed.value,data.recovered.value,data.deaths.value],
                    }],
            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`Current status of ${country}`}
            }}
            />):null
    );


    return(
        <div className={styles.container}>
            {country? BarChart :LineChart}
        </div>
    )
}

export default Chart;