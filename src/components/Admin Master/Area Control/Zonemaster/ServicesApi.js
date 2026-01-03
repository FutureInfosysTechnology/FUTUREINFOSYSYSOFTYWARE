// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// // const apiClient = axios.create({
// //   baseURL: 'https://sunraise.in/JdCourierlablePrinting',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// const apiClient = axios.create({
//   baseURL: 'https://sunraise.in/FutureinfosysApi',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// export const getApi = async (url, config = {}) => {
//   try {
//     const response = await apiClient.get(url, config);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     throw error;
//   }
// };



// export const postApi = async (url, data, config = {}) => {
//   try {
//     const response = await apiClient.post(url, data, config);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     throw error;
//   }
// };


// export const putApi = async (url, data, config = {}) => {
//   try {
//     const response = await apiClient.put(url, data, config);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     throw error;
//   }
// };


// export const deleteApi = async (url, config = {}) => {
//   try {
//     const response = await apiClient.delete(url, config);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     throw error;
//   }
// };


// const handleApiError = (error) => {
//   if (error.response) {
//     console.error('API Error:', error.response.data.message || 'An error occurred');
//     toast.error(`Error: ${error.response.data.message}`);
//   } else if (error.request) {
//     console.error('No response received:', error.request);
//     toast.error('No response from the server. Please try again.');
//   } else {
//     console.error('API Request error:', error.message);
//     toast.error('An unexpected error occurred. Please try again.');
//   }
// };


import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiClient = axios.create({
  baseURL: 'https://speedlogisticsindia.com/Tracking',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // ✅ IMPORTANT for production
});

/* =========================
   API METHODS
========================= */

export const getApi = async (url, config = {}) => {
  try {
    const { data } = await apiClient.get(url, config);
    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const postApi = async (url, data, config = {}) => {
  try {
    const { data: resData } = await apiClient.post(url, data, config);
    return resData;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const putApi = async (url, data, config = {}) => {
  try {
    const { data: resData } = await apiClient.put(url, data, config);
    return resData;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteApi = async (url, config = {}) => {
  try {
    const { data } = await apiClient.delete(url, config);
    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

/* =========================
   ERROR HANDLER
========================= */
const handleApiError = (error) => {
  if (error.response) {
    toast.error(error.response.data?.message || 'Server error');
  } else if (error.request) {
    toast.error('Server not responding (CORS / Network)');
  } else {
    toast.error(error.message || 'Unexpected error');
  }
};
