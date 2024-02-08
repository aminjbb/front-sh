import axios from 'axios';
const BASE_URL = 'https://api.shvz.ir/api/v1';

export default {
  /**
   * check error status code
   * @param {number} errorStatus
   */
  async checkAuthorization(errorStatus) {
    if (errorStatus.status === 401 || errorStatus.status === 403) window.location = '/login'
  },
  /**
   * Send OTP
   * @param {string | number} phoneNumber 
   * @returns 
   */
  async sendOTP(phoneNumber) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/user/send/otp`, {
        phone_number: phoneNumber
      });

      return response;
    } catch (error) {

      if (error.response.status == 404) {
        //Go to register form
      }
      console.error('Send OTP error:', error);
      throw error;
    }
  },

  /**
   * Get OTP for login
   * @param {string | number} phoneNumber 
   * @param {string | number} otp 
   * @returns 
   */
  async verifyOTP(phoneNumber, otp) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/user/login-register/otp`, {
        phone_number: phoneNumber,
        code: otp
      });
      return response;
    } catch (error) {
      if (error.response.status === 400) {

        useNuxtApp().$toast.error(error.response.data.message, {
          rtl: true,
          position: 'top-center',
          theme: 'dark'
        });
      }
      console.error('Verify OTP error:', error);
      throw error;
    }
  },

  /**
   * Register
   * @param {array} user 
   * @returns 
   */
  async register(user) {
    try {
      const response = await axios.post(`${BASE_URL}auth/admin/verify-otp`, {
        phone_number: user.mobile,
        last_name: user.last_name,
        fist_name: user.first_name
      });
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  /**
   * Get user profile
   * @param {*} token
   */
  async getUserProfile(token) {
    const router = useRouter()

    try {
      // Send a GET request to the profile endpoint with the token in the headers
      const response = await axios.post(`${BASE_URL}/auth/user/profile`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Return the response data
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Get user has password
   * @param {*} token
   */
  async getUserHasPassword(token) {
    try {

      const response = await axios.get(`${BASE_URL}/user/profile/password/has`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Return the response data
      return response.data
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching user profile:', error)
      throw error
    }
  }
};