## Creating Chart and fetching data for chart.

- Chart is an important feature for showing data in the dashboard. In this post we will learn implementing chart. First we will see how to fetch data from the server and then we will see how to show data in charts.

- Our example company is a web development company that collect lead, then develop sample website for prospective customer and at last call customer to sell the website.

- We will see how to show <br>

1. Number of lead collected today.
2. Number of lead collected last 7 days.
3. Number of lead collected this month.
4. Number of lead collected in year.
5. Day wise lead collection in last 7 days.
6. Week wise lead collection in this year.
7. Month wise lead collection in this year.

- We used Mongodb in the database. An example of document is as follows

```javascript
{
  _id: new ObjectId('659a9f0fb379bab9fad529fa'),
  businessName: 'Safroon',
  facebookAddress: 'www.fb.com/safron',
  mobileNumber: '01680309999',
  facebookPageName: 'Safron Resturant',
  businessType: 'Restaurant',
  websiteAvailable: false,
  email: 'safron@a.com',
  firstCallDate: 2023-12-31T18:00:00.000Z,
  firstMeetingDate: null,
  converted: false,
  reasonForNonConversion: '',
  ourCreatedWebsiteLink: 'www.safron-restaurant.netlify.com',
  messageSentAtFirstApproach: '',
  marketingMessageSent: false,
  existingWebsiteLink: '',
  entryBy: 'l1@a.com',
  callerName: 'Caller 1',
  callerEmail: 'c1@a.com',
  leadPostDate: 2024-01-07T13:07:45.892Z,
  developerName: 'Developer 2',
  developerEmail: 'd2@a.com',
  developerAssignedOn: 2024-01-07T14:12:44.996Z,
  entryDate: 2024-01-06T12:54:37.460Z,
  developerPostDate: 2024-01-07T15:14:23.373Z,
  __v: 0
}
```

- Now we will see the backend code for each of above 7 cases.

### Today's lead collection

```javascript
router.get("/sameDayLead", async (req, res) => {
  try {
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    const leadCount = await Lead.countDocuments({
      entryDate: { $gte: yesterday },
    });

    const callerCount = await Caller.countDocuments({
      entryDate: { $gte: yesterday },
    });

    const developerCount = await Developer.countDocuments({
      entryDate: { $gte: yesterday },
    });

    const todayLeadCount = leadCount + callerCount + developerCount;

    res.status(200).json({ todayLeadCount });
  } catch (error) {
    console.log("Error in same day count data", error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
```

- yesterday variable creates a new Date object, that represent current date and time.
- yesterday.setHours(0,0,0,0) set time to midnight(00:00:00:000). So that time is removed and only focus on the date.
- yesterday.setDate(yesterday.getDate() - 1) in this code yesterday.getDate() create todays date and -1 makes it previous day. setDate makes the yesterday variable date to previous day.
- In the leadCount, callerCount, developerCount variable, countDocuments is a method of MongoDB driver to count documents in the "Lead", "Caller", "Developer" collection.
- {entryDate:{$gte: yesterday}} is the query object based on which documents is search in the collections. In each document it will search entryDate field. In this field it will check whether the value is greater than or equal to yesterday. In other way whether the value is today.
- todayLeadCount variable hold the sum of leadCount, callerCount, developerCount variables data.
- Then data is send to the frontend.

### Last 7 days lead collection

```javascript
router.get("/lastWeekLead", async (req, res) => {
  try {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const leadCount = await Lead.countDocuments({
      entryDate: { $gte: lastWeek },
    });
    const callerCount = await Caller.countDocuments({
      entryDate: { $gte: lastWeek },
    });
    const developerCount = await Developer.countDocuments({
      entryDate: { $gte: lastWeek },
    });

    const lastWeekLeadCount = leadCount + callerCount + developerCount;

    res.status(200).json({ lastWeekLeadCount });
  } catch (error) {
    console.log("Error in same day count data", error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
```

- const lastWeek = new Date(); creates todays date and put it inside lastWeek variable.

- lastWeek.setDate(lastWeek.getDate() - 7) in this line lastWeek.getDate() takes todays date and then deduct 7 days to get date that is 7 days ago. Then setDate put the 7 days ago date to the lastWeek variable.

- In the leadCount, callerCount, developerCount variable, countDocuments is a method of MongoDB driver to count documents in the "Lead", "Caller", "Developer" collection.

- The search filed is entryDate. In this field any day that is between today to last 7 days is searched and if matched the stored to the leadCount, callerCount, developerCount variable.

- lastWeekLeadCount variable hold the sum of leadCount, callerCount, developerCount variables data.

- Then data is send to the frontend.

### This month's lead collection

```javascript
router.get("/thisMonthLead", async (req, res) => {
  try {
    const today = new Date();
    const thisMonthStartDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const leadCount = await Lead.countDocuments({
      entryDate: { $gte: thisMonthStartDate },
    });

    const callerCount = await Caller.countDocuments({
      entryDate: { $gte: thisMonthStartDate },
    });

    const developerCount = await Developer.countDocuments({
      entryDate: { $gte: thisMonthStartDate },
    });

    const thisMonthLeadCount = leadCount + callerCount + developerCount;

    res.status(200).json({ thisMonthLeadCount });
  } catch (error) {
    console.log("Error in same day count data", error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
```

- const today = new Date(); This line creates today's date and put it inside today object.
- const thisMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1) in this line today.getFullYear() retrieve the current year from date object. today.getMonth() retrieve the current month from date object. 1 represent the day of the month and is set to 1. new Date function create a date object which is the first day of current month and put it inside thisMonthStartDate variable.

- In the leadCount, callerCount, developerCount variable, countDocuments is a method of MongoDB driver to count documents in the "Lead", "Caller", "Developer" collection.

- The search filed is entryDate. In this field any day that is between today to start day of the current month is searched and if matched the stored to the leadCount, callerCount, developerCount variable.

- thisMonthLeadCount variable hold the sum of leadCount, callerCount, developerCount variables data.

- Then data is send to the frontend.

### This year lead collection

```javascript
router.get("/thisYearLead", async (req, res) => {
  try {
    const today = new Date();
    const thisYearStartDate = new Date(today.getFullYear(), 0, 1);

    const leadCount = await Lead.countDocuments({
      entryDate: { $gte: thisYearStartDate },
    });
    const callerCount = await Caller.countDocuments({
      entryDate: { $gte: thisYearStartDate },
    });
    const developerCount = await Developer.countDocuments({
      entryDate: { $gte: thisYearStartDate },
    });

    const thisYearLeadCount = leadCount + callerCount + developerCount;

    res.status(200).json({ thisYearLeadCount });
  } catch (error) {
    console.log("Error in same day count data", error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
```

- const today = new Date(); today is a variable that hold today's function.

- const thisYearStartDate = new Date(today.getFullYear(), 0, 1) today.getFullYear() retrieve the current year from the today object. 0 represent month January and 1 represent 1st day of January. new Date create a date object. thisYearStartDate hold a date object that point to the beginning of the current year.

- In the leadCount, callerCount, developerCount variable, countDocuments is a method of MongoDB driver to count documents in the "Lead", "Caller", "Developer" collection.

- The search filed is entryDate. In this field any day that is between today to start day of the current year is searched and if matched the stored to the leadCount, callerCount, developerCount variable.

- thisYearLeadCount variable hold the sum of leadCount, callerCount, developerCount variables data.

- Then data is send to the frontend.

### Day wise lead collection in last 7 days

```javascript
router.get("/last7DaysLeadCount", async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const counts = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);

      const leadCount = await Lead.countDocuments({
        entryDate: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      });
      const callerCount = await Caller.countDocuments({
        entryDate: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      });
      const developerCount = await Developer.countDocuments({
        entryDate: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      });

      const dayWiseCount = leadCount + callerCount + developerCount;

      counts.unshift({
        date: currentDate.toISOString().split("T")[0],
        dayWiseCount,
      });
    }
    res.status(200).json(counts);
  } catch (error) {
    console.log("Last 7 days lead count", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

- const today = new Date() create a new date object that contains current date and time in the local time zone and put it inside today.

- today.setUTCHours(0,0,0,0) set the date object inside today to Coordinated Universal Time(UTC) at midnight. The four 0 represents hours, minutes, seconds and milliseconds all set to 0. By setting to 0 it ensures that the time is set to midnight.

- The for loop iterate over the last 7 days and for each day it queries the MongoDB database to count documents in the "Lead", "Caller" and "Developer" collections. The process is explained below:

- const currentDate = new Date(today) this line create a date object that hold current date.

- currentDate.setDate(today.getDate() - i) in the line of code today.getDate() return today's date. i is the loop variable that is the number of the days deducted from current date. currentDate is the new date object where setDate method put the result of today.getDate() - i. If today is 10 January and i is 1 then current date will be 9 January i is 7 then current date will be 3 January. So when the loop run current date is changed for each of 7 days.

- const leadCount = await Lead.countDocuments({
  entryDate: {
  $gte: currentDate,
  $lt: new Date(currentDate.getTime() + 24 _ 60 _ 60 * 1000)
  }
  }); this line of code search Lead collection and countDocuments if certain criteria is met. In each document it search the entryDate field and if the date is between current date and next day then it is kept in leadCount variable. gte and lt parameters gives the range within which the search operation will run. Each time the loop will run the currentDate will changed. Inside the $lt a new date is created by taking the current date and adding (24*60*60*1000 = 1 day) 1 day with it to get next date.

- dayWiseCount accumulates the value of leadCount, callerCount and developerCount.

- counts.unshift push each new document count to the counts array. unshift is used instead of push to get an array ascending date order.

- currentDate.toISOString().split('T')[0] toISOString() is a method of the Date object in JavaScript that converts the date to a string in the ISO 8601 format (e.g., "2022-01-20T15:45:00.000Z").
  It represents the date and time in Coordinated Universal Time (UTC). The string is split at T character to separate date and time. [0] is used to get the first part that means the date portion after split and it is put inside date property.

### Week wise lead collection

```javascript
router.get("/weekWiseLeadCount", async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const counts = [];

    const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

    const weeksFromStart = Math.floor(
      (today - startOfYear) / (7 * 24 * 60 * 60 * 1000)
    );

    for (let i = weeksFromStart; i >= 0; i--) {
      const currentWeekStart = new Date(startOfYear);

      currentWeekStart.setDate(currentWeekStart.getDate() + i * 7);

      const leadCount = await Lead.countDocuments({
        entryDate: {
          $gte: currentWeekStart,
          $lt: new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      const callerCount = await Caller.countDocuments({
        entryDate: {
          $gte: currentWeekStart,
          $lt: new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      const developerCount = await Developer.countDocuments({
        entryDate: {
          $gte: currentWeekStart,
          $lt: new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      const weekWiseCount = leadCount + callerCount + developerCount;

      counts.unshift({
        weekStart: currentWeekStart.toLocaleDateString("en-US"),
        weekWiseCount,
      });
    }
    console.log("last 7", counts);
    res.status(200).json(counts);
  } catch (error) {
    console.log("Last 7 days lead count", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

- const today = new Date() create a new date object that contains current date and time in the local time zone and put it inside today.

- today.setUTCHours(0,0,0,0) set the date object inside today to Coordinated Universal Time(UTC) at midnight. The four 0 represents hours, minutes, seconds and milliseconds all set to 0. By setting to 0 it ensures that the time is set to midnight.

- const counts = [] this is an empty array that will be used to store searched result.

- today.getFullYear() function get current year from the today object.

- 0,1,0,0,0,0 set the date of object to the start of the current year(1 January 00:00:00:000)

- startOfYear is a variable that holds current year starting date.

- const weeksFromStart = Math.floor(((today - startOfYear) / (7 * 24 * 60 * 60 * 1000))); (today - startOfYear) calculate the time difference in milliseconds between today and start of the year. (7 * 24 * 60 * 60 * 1000) represents number of milliseconds in a week. When we divide the time difference by the number of milliseconds in a week we get number of weeks since the start of the year. Math.floor rounds down the result to the nearest integer to get whole week. We can use Math.celi to round up the result. weekFromStart hold the value of number of weeks passed since the start of the year.

- for(let i = weeksFromStart; i >= 0; i--) in this loop condition i = number of weeks from the start of the year. i >=0 gives the condition that the loop will run until the value of i is greater than or equal to 0. i-- is decrementing the value of i so the loop will start from current week and iterate backs to the first week of the year.

- const currentWeekStart = new Date(startOfYear); it create a date object and initialize it with the starting date of the year.

- currentWeekStart.setDate(currentWeekStart.getDate() + i \* 7); in this line currentWeekStart.getDate() get the date from currentWeekStart variable and add weeks with it. Each time value of i changes it is multiplied by 7 to get the days passed since the start of the year. Then currentWeekStart.setDate(...) then sets the day of the month for currentWeekStart to the calculated target date.

- entryDate: { $gte: currentWeekStart, $lt: ... }: This part specifies a query on the entryDate field of the documents in the Lead collection.

- $gte stands for "greater than or equal to," and it checks if the entryDate is greater than or equal to currentWeekStart.

- $lt stands for "less than," and it checks if the entryDate is less than a date obtained by adding 7 days to currentWeekStart

- new Date(currentWeekStart.getTime() + 7 _ 24 _ 60 _ 60 _ 1000): Calculates the end date of the week by adding 7 days (a week's worth of milliseconds) to the currentWeekStart date.
  currentWeekStart.getTime() gets the time value in milliseconds for currentWeekStart

- weekWiseCount accumulates the value of leadCount, callerCount and developerCount

- counts.unshift(...): counts is an array, and unshift is an array method that adds one or more elements to the beginning of the array.
  In this case, it adds a new object to the beginning of the counts array.

- currentWeekStart.toLocaleDateString('en-US') formats the currentWeekStart date as a string using the local date format in the United States. The exact format depends on the implementation but is generally in the form 'MM/DD/YYYY'.

### Month wise lead collection

```javascript
router.get("/monthWiseLeadCount", async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const counts = [];

    const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

    const monthsFromStart =
      (today.getFullYear() - startOfYear.getFullYear()) * 12 +
      today.getMonth() -
      startOfYear.getMonth() +
      1;

    for (let i = monthsFromStart - 1; i >= 0; i--) {
      const currentMonthStart = new Date(
        startOfYear.getFullYear(),
        startOfYear.getMonth() + i,
        1,
        0,
        0,
        0,
        0
      );

      const leadCount = await Lead.countDocuments({
        entryDate: {
          $gte: currentMonthStart,
          $lt: new Date(
            currentMonthStart.getFullYear(),
            currentMonthStart.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          ),
        },
      });

      const callerCount = await Caller.countDocuments({
        entryDate: {
          $gte: currentMonthStart,
          $lt: new Date(
            currentMonthStart.getFullYear(),
            currentMonthStart.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          ),
        },
      });

      const developerCount = await Developer.countDocuments({
        entryDate: {
          $gte: currentMonthStart,
          $lt: new Date(
            currentMonthStart.getFullYear(),
            currentMonthStart.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          ),
        },
      });

      const monthWiseCount = leadCount + callerCount + developerCount;

      counts.unshift({
        monthStart: currentMonthStart.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        monthWiseCount,
      });
    }
    // console.log('month wise', counts)
    res.status(200).json(counts);
  } catch (error) {
    console.log("Last 7 days lead count", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

- const monthsFromStart =
  (today.getFullYear() - startOfYear.getFullYear()) \* 12 + today.getMonth() - startOfYear.getMonth()
  +1; This formula measure number of months between two dates. This is explained below.
- (today.getFullYear() - startOfYear.getFullYear()) \* 12:

today.getFullYear(): today is a Date object representing the current date and time.
getFullYear() is a method of the Date object in JavaScript that returns the year.
today.getFullYear() returns the current four-digit year.

startOfYear.getFullYear(): startOfYear is another Date object representing the start of the year. getFullYear() is used to obtain the year of the startOfYear date.

(today.getFullYear() - startOfYear.getFullYear()): This subtraction calculates the difference in years between the current year and the starting year.

For example, if the current year is 2023 and startOfYear is set to the beginning of 2021, the result would be 2023 - 2021 = 2

The result is the difference in years multiplied by 12 to convert years to months.

- today.getMonth() - startOfYear.getMonth():

today.getMonth() gets the current month (0-indexed), and startOfYear.getMonth() gets the starting month of the year (also 0-indexed).

The difference represents the additional months within the current year.

- 1:

Adds 1 to account for the current month.

The final result, monthsFromStart, represents the total number of months that have passed from the start of the year up to and including the current month.

- for (let i = monthsFromStart - 1; i >= 0; i--): This is a for loop that starts with i initialized to monthsFromStart - 1 (the index of the last month in the range) and decrements i by 1 in each iteration until i becomes 0.
  The loop iterates over each month in reverse order, from the most recent month to the starting month.

- const currentMonthStart = new Date(startOfYear.getFullYear(), startOfYear.getMonth() + i, 1, 0, 0, 0, 0); This loop generates a series of Date objects (currentMonthStart) representing the first day of each month in reverse order, starting from the most recent month and going back to the starting month of the year (startOfYear). The loop is based on the calculated monthsFromStart, which determines the total number of months that have passed.

- For each iteration of the loop, a new Date object named currentMonthStart is created.
  startOfYear.getFullYear() gets the starting year of the year.
  startOfYear.getMonth() + i calculates the month for the current iteration, where i represents the number of months to subtract from the starting month.
  The day of the month is set to 1, and the time is set to midnight (0 hours, 0 minutes, 0 seconds, 0 milliseconds).

- const leadCount = await Lead.countDocuments({ entryDate: { $gte: currentMonthStart, $lt: new Date(currentMonthStart.getFullYear(),
  currentMonthStart.getMonth() + 1,0,23,59,59,999)
  } }); This query aims to count documents in the "Lead" collection where the "entryDate" is within the current month. The $gte and $lt operators ensure that the range includes all entries from the 1st day of the month to the last millisecond of the last day of the month.

- entryDate: { $gte: currentMonthStart, $lt: ... }: This part specifies the query conditions for the "entryDate" field.

- $gte: Stands for "greater than or equal to." It ensures that the "entryDate" is greater than or equal to currentMonthStart, meaning it should be on or after the 1st day of the current month.

- $lt: Stands for "less than." It ensures that the "entryDate" is less than the specified date, which is the end of the current month (new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0, 23, 59, 59, 999)).

- new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0, 23, 59, 59, 999): This creates a Date object representing the end of the current month.

- currentMonthStart.getFullYear(): Gets the year of currentMonthStart.

- currentMonthStart.getMonth() + 1: Gets the month of currentMonthStart and adds 1 to it (since months are zero-indexed in JavaScript, adding 1 gives the correct next month).

- 0: Represents the 0th day of the next month, effectively the last day of the current month.
  23, 59, 59, 999: Sets the time to 23:59:59.999, the last millisecond of the day.

## Now we will at the frontend code.

```javascript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BarChart from "../../components/Dashboard/BarChart";
import Loader from "../../components/common/Loader";
import { Pie } from "react-chartjs-2";
```

- Above are the necessary imports. useQuery from tanstack to fetch data, axios also use to fetch data, BarChart is a component to show the fetched data, Pie is imported from react-chartjs-2 to show data in pie chart.

```javascript
const options = {
  responsive: true,
};
```

- The option object will pass to the bar/pie chart to make it responsive.

```javascript
const { data: sameDayLeadCount } = useQuery({
  queryKey: ["sameDayLeadCount"],
  queryFn: async () => {
    const res = await axios.get("http://localhost:5000/api/v1/sameDayLead");
    return res.data;
  },
});
```

- tanstack useQuery and axios is used to fetch sameDayLeadCount from server. Same process is applied to fetched data from remaining 6 apis.

```javascript
if (isLoading) {
  return <Loader />;
}
```

- When data is in loading state above if condition will show a loader.

```javascript
const dayWiseCounts = last7DaysLeadCount?.map((item) => item.dayWiseCount);
```

- last7DaysLeadCount is an array containing objects. Each object has two property date and dayWiseCont.

- The map function iterates the array and from each object takes out value of dayWiseCount and put them inside dayWiseCounts array.

- Same map function applied to weekWiseLeadCount & monthWiseLeadCount to get the counts in each case.

```javascript
const date = last7DaysLeadCount?.map((item) => item.date);
```

- Here last7DaysLeadCount array is iterates to get the date of each object that will be used in the bar chart as a label to show the counts.

- Same map function applied to monthWiseLeadCount to date each month.

```javascript
const data = {
  labels: date.map((date) => new Date(date).toLocaleDateString()),
  datasets: [
    {
      label: "Lead Collection",
      data: dayWiseCounts.map(String),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "green",
        "blue",
        "yellow",
        "red",
        "purple",
      ],
    },
  ],
};
```

- data is an object that will pass all the values to the chart. labels property will be used to put the label in the chart. it takes date array that we created earlier and map it to get localized string representation of each date value.
- Inside the datesets array there is only one object. It has a label property that will show the chart label. In the data property the dayWiseCounts is mapped to get numerical value of each day lead counts. map(String) makes the numerical value to a string.
- backgroundColor array set the background color for each data point in the dataset. Each color corresponds to a different day or data point.

- Similar object is created for week wise and month wise data presentation. The code is given below

```javascript
const weekWiseData = {
  labels: weekWiseLeadCount?.map((item, index) => `Week ${index + 1}`),
  datasets: [
    {
      label: "Lead Collection",
      data: weekWiseCount.map(String),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "green",
        "blue",
        "yellow",
        "red",
        "purple",
      ],
    },
  ],
};

const monthWiseData = {
  labels: monthStartDate?.map((date) =>
    new Date(date).toLocaleDateString(undefined, { month: "long" })
  ),
  datasets: [
    {
      label: "Lead Collection",
      data: monthWiseCount.map(String),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "green",
        "blue",
        "yellow",
        "red",
        "purple",
      ],
    },
  ],
};
```

### jsx code

```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center text-center items-center mb-32 gap-5 text-2xl">
  <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">
    Today's Lead Collection: {sameDayLeadCount?.todayLeadCount}
  </h4>
  <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">
    This week Lead Collection: {lastWeekLeadCount?.lastWeekLeadCount}
  </h4>
  <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">
    This Month Lead Collection: {thisMonthLead?.thisMonthLeadCount}
  </h4>
  <h4 className=" font-semibold bg-slate-400 px-8 py-14 rounded-lg">
    This Year Lead Collection: {thisYearLead?.thisYearLeadCount}
  </h4>
</div>
```

- Each h4 tag show the daily, weekly, monthly and yearly total lead collection.

```javascript
<div className="flex flex-col items-center gap-5">
  <h4 className="text-center font-bold text-2xl">Weekly Day Wise Lead Collection</h4>
          <BarChart data={data} options={options} />
</div>
<div className="flex flex-col gap-5 h-96">
  <h4 className="text-center font-bold text-2xl">Weekly Day Wise Lead Collection</h4>
<div className="h-80 flex justify-center"><Pie data={data} options={options} /></div>
</div>
```
- Above jsx code represent the dayWiseLeadCollection in both bar and pie chart. The props passed is the data object that we saw earlier. options props passed to make the chart responsive. 

- Same process is followed to show weekWise and monthWise lead collection.