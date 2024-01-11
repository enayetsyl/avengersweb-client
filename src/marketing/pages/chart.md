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
router.get('/sameDayLead', async(req, res)=> {
  try {
   
    const yesterday = new Date()
    yesterday.setHours(0,0,0,0)
    yesterday.setDate(yesterday.getDate() - 1)

    const leadCount = await Lead.countDocuments({entryDate: {$gte: yesterday}})

    const callerCount = await Caller.countDocuments({entryDate: {$gte: yesterday}})

    const developerCount = await Developer.countDocuments({entryDate: {$gte: yesterday}})

    const todayLeadCount = leadCount + callerCount + developerCount;
      
    res.status(200).json({todayLeadCount})
  } catch (error) {
    console.log('Error in same day count data', error)
    res.status(500).json({error: "Internal server Error"})
  }
})
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
router.get('/lastWeekLead', async(req, res)=> {
  try {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const leadCount = await Lead.countDocuments({entryDate: {$gte: lastWeek}})
    const callerCount = await Caller.countDocuments({entryDate: {$gte: lastWeek}})
    const developerCount = await Developer.countDocuments({entryDate: {$gte: lastWeek}})

    const lastWeekLeadCount = leadCount + callerCount + developerCount;

    res.status(200).json({lastWeekLeadCount})
  } catch (error) {
    console.log('Error in same day count data', error)
    res.status(500).json({error: "Internal server Error"})
  }
})
```

- const lastWeek = new Date(); creates todays date and put it inside lastWeek variable.

- lastWeek.setDate(lastWeek.getDate() - 7) in this line lastWeek.getDate() takes todays date and then deduct 7 days to get date that is 7 days ago. Then setDate put the 7 days ago date to the lastWeek variable. 

- In the leadCount, callerCount, developerCount variable, countDocuments is a method of MongoDB driver to count documents in the "Lead", "Caller", "Developer" collection. 

- The search filed is entryDate. In this field any day that is between today to last 7 days is searched and if matched the stored to the leadCount, callerCount, developerCount variable. 

- lastWeekLeadCount variable hold the sum of leadCount, callerCount, developerCount variables data. 

- Then data is send to the frontend. 

### This month's lead collection

```javascript
  router.get('/thisMonthLead', async(req, res)=> {
  try {
    const today = new Date()
    const thisMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1)
   
  
    const leadCount = await Lead.countDocuments({entryDate: {$gte: thisMonthStartDate}})

    const callerCount = await Caller.countDocuments({entryDate: {$gte: thisMonthStartDate}})
    
    const developerCount = await Developer.countDocuments({entryDate: {$gte: thisMonthStartDate}})

    const thisMonthLeadCount = leadCount + callerCount + developerCount;
  
    res.status(200).json({thisMonthLeadCount})
  } catch (error) {
    console.log('Error in same day count data', error)
    res.status(500).json({error: "Internal server Error"})
  }
})
```

- const today = new Date(); This line creates today's date and put it inside today object.
- const thisMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1) in this line today.getFullYear() retrieve the current year from date object. today.getMonth() retrieve the current month from date object. 1 represent the day of the month and is set to 1. new Date function create a date object which is the first day of current month and put it inside thisMonthStartDate variable. 

- In the leadCount, callerCount, developerCount variable, countDocuments is a method of MongoDB driver to count documents in the "Lead", "Caller", "Developer" collection. 

- The search filed is entryDate. In this field any day that is between today to start day of the current month is searched and if matched the stored to the leadCount, callerCount, developerCount variable. 

- thisMonthLeadCount variable hold the sum of leadCount, callerCount, developerCount variables data. 

- Then data is send to the frontend. 