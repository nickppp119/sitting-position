import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuthContext } from '../context/AuthContext';
import eventAPI from '../api/event';


const Home = () => {
  const { userState } = useAuthContext();

  const [date, setDate] = useState(dayjs());
  const [eventList, setEventList] = useState([]);

  const selectDate = (newDate) => {
    setDate(newDate);
    eventAPI.search(dayjs(newDate).format('YYYY-MM-DD'), userState.value.token, setEventList);
  }

  return (
    <Box width="100%">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={selectDate}
        />
      </LocalizationProvider>
      <Grid container spacing={2} width="100%" mt={2}>
        {eventList.map((item, index) => (
          <Grid item key={`event-${index}`} xs={10} sm={6} md={4} sx={{
            border: '2px solid #FFFFFF',
            borderRadius: '4px',
            m: 2
          }}>
            事件編號:{item.id}<br />
            標題: {item.title}<br />
            內容:{item.content}<br />
            時間:{item.date}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


export default Home;