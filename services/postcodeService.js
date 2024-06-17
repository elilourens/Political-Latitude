// services/postcodeService.js
import axios from 'axios';

const API_URL = 'https://opendata.camden.gov.uk/resource/tr8t-gqz7.json';
const APP_TOKEN = 'VBLe8A55rfjbnjXDyFNP0GQYX';

export const getConstituencyByPostcode = async (postcode) => {
  try {
    const response = await axios.get(`${API_URL}?postcode_1=${postcode}`, {
      headers: {
        'X-App-Token': APP_TOKEN,
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