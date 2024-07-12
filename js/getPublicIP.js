const axios = require('axios');

const getPublicIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const publicIP = response.data.ip;
    console.log(`Public IP: ${publicIP}`);
    return publicIP;
  } catch (error) {
    console.error('Error fetching public IP:', error);
  }
};

module.exports = getPublicIP;
