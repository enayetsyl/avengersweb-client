// import { Pie } from 'react-chartjs-2';
// import BarChart from '../components/dashboard/BarChart';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BarChart from "../../components/Dashboard/BarChart";
import Loader from "../../components/common/Loader";
import { Pie } from "react-chartjs-2";

const options = {
  responsive: true,
};

// const labels = [
//   'Saturday',
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thusday',
//   'Friday',
// ];



const MarketingDashboard = () => {
  const {data:sameDayLeadCount} = useQuery({
    queryKey:['sameDayLeadCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/sameDayLead')
      return res.data
    }
  })
  const {data:lastWeekLeadCount} = useQuery({
    queryKey:['lastWeekLeadCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/lastWeekLead')
      return res.data
    }
  })
  const {data:thisMonthLead} = useQuery({
    queryKey:['thisMonthLead'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/thisMonthLead')
      return res.data
    }
  })
  const {data:thisYearLead} = useQuery({
    queryKey:['thisYearLead'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/thisYearLead')
      return res.data
    }
  })
  const {data:last7DaysLeadCount, isLoading} = useQuery({
    queryKey:['last7DaysLeadCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/last7DaysLeadCount')
      return res.data
    }
  })
  const {data:weekWiseLeadCount} = useQuery({
    queryKey:['weekWiseLeadCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/weekWiseLeadCount')
      return res.data
    }
  })
  const {data:monthWiseLeadCount} = useQuery({
    queryKey:['monthWiseLeadCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/monthWiseLeadCount')
      return res.data
    }
  })

  if(isLoading){
    return <Loader/>
  }

  console.log(sameDayLeadCount, lastWeekLeadCount, thisMonthLead, thisYearLead, last7DaysLeadCount, weekWiseLeadCount, monthWiseLeadCount)
  
  const dayWiseCounts = last7DaysLeadCount?.map(item => item.dayWiseCount)

  const weekWiseCount = weekWiseLeadCount?.map(item => item.weekWiseCount)

  const monthWiseCount = monthWiseLeadCount?.map(item => item.monthWiseCount)
  
  const date = last7DaysLeadCount.map(item => item.date)

  // const weekStartDate = weekWiseLeadCount?.map((item, index) => `Week ${index + 1}`)

  const monthStartDate = monthWiseLeadCount?.map(item => item.monthStart)

  const data = {
    labels: date.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Lead Collection',
        data: dayWiseCounts.map(String),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'green',
          'blue',
          'yellow',
          'red',
          'purple',
        ],
      },
    ],
  };
  
  const weekWiseData = {
    labels: weekWiseLeadCount?.map((item, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: 'Lead Collection',
        data: weekWiseCount.map(String),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'green',
          'blue',
          'yellow',
          'red',
          'purple',
        ],
      },
    ],
  };

  const monthWiseData = {
    labels: monthStartDate?.map(date => new Date(date).toLocaleDateString(undefined, {month: 'long'})),
    datasets: [
      {
        label: 'Lead Collection',
        data: monthWiseCount.map(String),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'green',
          'blue',
          'yellow',
          'red',
          'purple',
        ],
      },
    ],
  };

 


  return (
    <div className="my-12 md:my-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center text-center items-center mb-32 gap-5 text-2xl">
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">Today's Lead Collection: {sameDayLeadCount?.todayLeadCount}</h4> 
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">This week Lead Collection: {lastWeekLeadCount?.lastWeekLeadCount}</h4>
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">This Month Lead Collection: {thisMonthLead?.thisMonthLeadCount}</h4>
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">This Year Lead Collection: {thisYearLead?.thisYearLeadCount}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Lead Collection</h4>
          <BarChart data={data} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Lead Collection</h4>
            <div className="h-80 flex justify-center"><Pie data={data} options={options} /></div>
          </div>
          {/* Week wise chart */}
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Week Wise Lead Collection</h4>
          <BarChart data={weekWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Lead Collection</h4>
            <div className="h-72 flex justify-center"><Pie data={weekWiseData} options={options} /></div>
          </div>
          {/* Month wise chart */}
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Week Wise Lead Collection</h4>
          <BarChart data={monthWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Lead Collection</h4>
            <div className="h-72 flex justify-center"><Pie data={monthWiseData} options={options} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;