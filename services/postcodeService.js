// services/postcodeService.js
import axios from 'axios';

const url = process.env.API_URL;
const token = process.env.APP_TOKEN;

export const getConstituencyByPostcode = async (postcode) => {
  try {
    const response = await axios.get(`${url}?postcode_1=${postcode}`, {
      headers: {
        'X-App-Token': token,
      },
    });

    if (response.data.length > 0) {
      const constituency = response.data[0].parliamentary_constituency_name;
      return constituency;
    } else {
      throw new Error('Postcode not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch constituency');
  }
};