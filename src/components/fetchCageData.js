// fetchCageData.js
import axios from 'axios';

const cookie = 'LOC=AG';
const cageUrl = 'https://www-cage-ssb-ua.betcagesports.com/version.json';

const fetchCageData = async () => {
  try {
    const instance = axios.create({
      headers: {
        'Cookie': cookie
      }
    });

    const response = await instance.get(cageUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching the Cage URL:', error);
    throw error;
  }
};

export default fetchCageData;
