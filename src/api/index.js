import axios from 'axios';


const url="https://covid19.mathdro.id/api";

export const fetchData= async (country)=>{
    let changeableUrl=url;
    if(country)
    {
        changeableUrl=`${url}/countries/${country}`;
    }
    try{
        const { data } =await axios.get(changeableUrl);
        const modifiedData={
            confirmed:data.confirmed,
            recovered:data.recovered,
            deaths:data.deaths,
            lastUpdate:data.lastUpdate,
        }
        return modifiedData;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async ()=>{
    try{
        console.log("Hii");
        const { data }=await axios.get(`${url}/daily`);
        
        console.log(data);
        const modifiedData= data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate,
        }));
        return modifiedData;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchCountries= async ()=>{
    try {
        console.log("hii");
        const {data:{countries}}= await axios.get(`${url}/countries`);
        
        console.log(countries);
        return countries.map((country)=>country.name);
    }
    catch (error) {
        console.log(error);
    }
}