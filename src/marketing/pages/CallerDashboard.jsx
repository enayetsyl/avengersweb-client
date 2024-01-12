import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BarChart from "../../components/Dashboard/BarChart";
import Loader from "../../components/common/Loader";
import { Pie } from "react-chartjs-2";


const options = {
  responsive: true,
};


const CallerDashboard = () => {

  const {data:sameDayLeadCount, isLoading} = useQuery({
    queryKey:['sameDayLeadCount'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/v1/sameDayLead')
      return res.data
    }
  })

  // const dayWiseCounts = last7DaysLeadCount?.map(item => item.dayWiseCount)

  // const weekWiseCount = weekWiseLeadCount?.map(item => item.weekWiseCount)

  // const monthWiseCount = monthWiseLeadCount?.map(item => item.monthWiseCount)
  
  // const date = last7DaysLeadCount?.map(item => item.date)

  // const monthStartDate = monthWiseLeadCount?.map(item => item.monthStart)

  // const data = {
  //   labels: date.map(date => new Date(date).toLocaleDateString()),
  //   datasets: [
  //     {
  //       label: 'Lead Collection',
  //       data: dayWiseCounts.map(String),
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.5)',
  //         'green',
  //         'blue',
  //         'yellow',
  //         'red',
  //         'purple',
  //       ],
  //     },
  //   ],
  // };
  
  // const weekWiseData = {
  //   labels: weekWiseLeadCount?.map((item, index) => `Week ${index + 1}`),
  //   datasets: [
  //     {
  //       label: 'Lead Collection',
  //       data: weekWiseCount.map(String),
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.5)',
  //         'green',
  //         'blue',
  //         'yellow',
  //         'red',
  //         'purple',
  //       ],
  //     },
  //   ],
  // };

  // const monthWiseData = {
  //   labels: monthStartDate?.map(date => new Date(date).toLocaleDateString(undefined, {month: 'long'})),
  //   datasets: [
  //     {
  //       label: 'Lead Collection',
  //       data: monthWiseCount.map(String),
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.5)',
  //         'green',
  //         'blue',
  //         'yellow',
  //         'red',
  //         'purple',
  //       ],
  //     },
  //   ],
  // };

  if(isLoading){
    return <Loader/>
  }

  return (
    <div>
      
    </div>
  );
};

export default CallerDashboard;