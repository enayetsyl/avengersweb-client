
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Pie } from "react-chartjs-2";
import BarChart from "../components/Dashboard/BarChart";
import Loader from "../components/common/Loader";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const options = {
  responsive: true,
};


const DeveloperDashboard = () => {
  
  const {data:sameDayDev} = useQuery({
    queryKey:['sameDayDev'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/sameDayDev')
      return res.data
    }
  })

  const {data:lastWeekDevCount} = useQuery({
    queryKey:['lastWeekDevCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/lastWeekDev')
      return res.data
    }
  })

  const {data:thisMonthDev} = useQuery({
    queryKey:['thisMonthDev'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/thisMonthDev')
      return res.data
    }
  })

  const {data:thisYearDev} = useQuery({
    queryKey:['thisYearDev'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/thisYearDev')
      return res.data
    }
  })
  
  const {data:last7DaysDevCount, isLoading} = useQuery({
    queryKey:['last7DaysDevCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/last7DaysDevCount')
      return res.data
    }
  })

  const {data:weekWiseDevCount} = useQuery({
    queryKey:['weekWiseDevCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/weekWiseDevCount')
      return res.data
    }
  })

  const {data:monthWiseDevCount} = useQuery({
    queryKey:['monthWiseDevCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/monthWiseDevCount')
      return res.data
    }
  })

  if(isLoading){
    return <Loader/>
  }

  
  const dayWiseCounts = last7DaysDevCount?.map(item => item.dayWiseCount)

  const weekWiseCount = weekWiseDevCount?.map(item => item.weekWiseCount)

  const monthWiseCount = monthWiseDevCount?.map(item => item.monthWiseCount)
  
  const date = last7DaysDevCount?.map(item => item.date)

  const monthStartDate = monthWiseDevCount?.map(item => item.monthStart)

  const data = {
    labels: date.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Website Developed',
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
    labels: weekWiseDevCount?.map((item, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: 'Website Developed',
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
        label: 'Website Developed',
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
        <Stat  variant='outline'
          border='2px'
          borderColor='pink'
          borderRadius='10px'
          py='25px'
          >
            <StatLabel>Today's Website Developed</StatLabel>
            <StatNumber>{sameDayDev?.todayDeveloperCount}</StatNumber>
          </Stat>
          <Stat  variant='outline'
          border='2px'
          borderColor='pink'
          borderRadius='10px'
          py='25px'
          >
            <StatLabel>This Week Website Developed</StatLabel>
            <StatNumber>{lastWeekDevCount?.lastWeekDevCount}</StatNumber>
          </Stat>
          <Stat  variant='outline'
          border='2px'
          borderColor='pink'
          borderRadius='10px'
          py='25px'
          >
            <StatLabel>This Month Website Developed</StatLabel>
            <StatNumber>{thisMonthDev?.thisMonthDevCount}</StatNumber>
          </Stat>
          <Stat  variant='outline'
          border='2px'
          borderColor='pink'
          borderRadius='10px'
          py='25px'
          >
            <StatLabel>This Year Website Developed</StatLabel>
            <StatNumber>{thisYearDev?.thisYearDevCount}</StatNumber>
          </Stat>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Weekly Day Wise Website Developed:</h4>
          <BarChart data={data} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Week Day Wise Website Developed:</h4>
            <div className="h-80 flex justify-center"><Pie data={data} options={options} /></div>
          </div>
          {/* Week wise chart */}
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Week Wise Website Developed:</h4>
          <BarChart data={weekWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Week Wise Website Developed</h4>
            <div className="h-72 flex justify-center"><Pie data={weekWiseData} options={options} /></div>
          </div>
          {/* Month wise chart */}
          <div className="flex flex-col items-center gap-5">
          <h4 className="text-center font-bold text-2xl">Month Website Developed</h4>
          <BarChart data={monthWiseData} options={options} />
          </div>
          <div className="flex flex-col gap-5 h-96">
          <h4 className="text-center font-bold text-2xl">Month Wise Website Developed</h4>
            <div className="h-72 flex justify-center"><Pie data={monthWiseData} options={options} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;