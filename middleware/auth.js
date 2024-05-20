import axios from 'axios';
const BASE_URL = 'https://api.shvz.ir/api/v1';
export default {

  runtimeConfig(){
    return useRuntimeConfig();
  },

  /**
   * check error status code
   * @param {number} errorStatus
   */
  async checkAuthorization(errorStatus) {
    if (errorStatus?.status === 401 || errorStatus?.status === 403) window.location = '/login'
  },
  /**
   * Send OTP
   * @param {string | number} phoneNumber 
   * @returns 
   */
  async sendOTP(phoneNumber) {
    try {
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}/auth/user/send/otp`, {
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
   * Send OTP For Forgot Password
   * @param {string | number} phoneNumber
   * @returns
   */
  async sendForgotPasswordOTP(phoneNumber) {
    try {
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}/auth/user/forgot-password`, {
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
    const tatoken = useCookie('tatoken');
    
    try {
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}/auth/user/login-register/otp`, {
        phone_number: phoneNumber,
        code: otp,
        is_takhfifan: tatoken !== null && tatoken !== '' ? true : false
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
   * Get OTP for login
   * @param {string | number} phoneNumber 
   * @param {*} password 
   * @returns 
   */
  async verifyPassword(phoneNumber, password) {
    try {
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}/auth/user/login-register/password`, {
        phone_number: phoneNumber,
        password: password
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
      console.error('Verify password error:', error);
      throw error;
    }
  },


  /**
   * Reset Password With OtpCode Forgot Password
   * @param {string | number} phoneNumber
   * @param {string | number} otpCode
   * @param {*} newPassword
   * @param {*} passwordConfirmation
   * @returns
   */
  async resetPassword(phoneNumber, newPassword, passwordConfirmation, otpCode) {
    try {
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}/auth/user/reset-password`, {
        phone_number: phoneNumber,
        password: newPassword,
        password_confirmation: passwordConfirmation,
        code: otpCode,
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
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}auth/admin/verify-otp`, {
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
      const response = await axios.post(`${this.runtimeConfig().public.apiBase}/auth/user/profile`, {}, {
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

      const response = await axios.get(`${this.runtimeConfig().public.apiBase}/user/profile/password/has`, {
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