import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BarChart from "../../components/Dashboard/BarChart";
import Loader from "../../components/common/Loader";
import { Pie } from "react-chartjs-2";


const options = {
  responsive: true,
};


const CallerDashboard = () => {

  const {data:todayCallCount, isLoading} = useQuery({
    queryKey:['todayCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/todayCallCount')
      return res.data
    }
  })

  const {data:lastWeekCallCount} = useQuery({
    queryKey:['lastWeekCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/lastWeekCallCount')
      return res.data
    }
  })

  const {data:thisMonthCallCount} = useQuery({
    queryKey:['thisMonthCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/thisMonthCallCount')
      return res.data
    }
  })
 
  const {data:thisYearCallCount} = useQuery({
    queryKey:['thisYearCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/thisYearCallCount')
      return res.data
    }
  })
  const {data:weeklyDayWiseCallCount} = useQuery({
    queryKey:['weeklyDayWiseCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/weeklyDayWiseCallCount')
      return res.data
    }
  })
  const {data:weekWiseCallCount} = useQuery({
    queryKey:['weekWiseCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/weekWiseCallCount')
      return res.data
    }
  })
  const {data:monthWiseCallCount} = useQuery({
    queryKey:['monthWiseCallCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/monthWiseCallCount')
      return res.data
    }
  })

console.log(todayCallCount, lastWeekCallCount,thisMonthCallCount, thisYearCallCount, weeklyDayWiseCallCount, weekWiseCallCount, monthWiseCallCount)

  const dayWiseCounts = weeklyDayWiseCallCount?.map(item => item.weeklyDayWiseCallCount)

  const weekWiseCount = weekWiseCallCount?.map(item => item.weekWiseCallCount)

  const monthWiseCount = monthWiseCallCount?.map(item => item.monthWiseCallCount)
  
  const dayDate = weeklyDayWiseCallCount?.map(item => item.date)

  const monthStartDate = monthWiseCallCount?.map(item => item.monthStart)

  console.log(dayWiseCounts, weekWiseCount, monthWiseCount, dayDate, monthStartDate)

  const dayWiseData = {
    labels: dayDate.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Call Made',
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
    labels: weekWiseCount?.map((item, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: 'Call Made',
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
        label: 'Call Made',
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

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="my-12 md:my-20">
      <div className="container mx-auto px-4">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center text-center items-center mb-32 gap-5 text-2xl">
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">Today's Lead Collection: {sameDayLeadCount?.todayLeadCount}</h4> 
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">This week Lead Collection: {lastWeekLeadCount?.lastWeekLeadCount}</h4>
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">This Month Lead Collection: {thisMonthLead?.thisMonthLeadCount}</h4>
          <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">This Year Lead Collection: {thisYearLead?.thisYearLeadCount}</h4>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Call Made</h4>
          <BarChart data={dayWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Call Made</h4>
            <div className="h-80 flex justify-center"><Pie data={dayWiseData} options={options} /></div>
          </div>
          {/* Week wise chart */}
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Week Wise Call Made</h4>
          <BarChart data={weekWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Weekly Day Call Made</h4>
            <div className="h-72 flex justify-center"><Pie data={weekWiseData} options={options} /></div>
          </div>
          {/* Month wise chart */}
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Month Wise Call Made</h4>
          <BarChart data={monthWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Month Wise Call Made</h4>
            <div className="h-72 flex justify-center"><Pie data={monthWiseData} options={options} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallerDashboard;