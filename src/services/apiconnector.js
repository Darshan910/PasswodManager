// import axios from "axios";

// export const axiosInstance = axios.create({

// });

// export const apiConnector = (method,url,bodyData,headers,params) => {
//     return axiosInstance({
//         method:`${method}`,
//         url: `${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers : null,
//         params: params ? params : null,
//     });
// }


import axios from 'axios';

export const apiConnector = async (method, url, body) => {
    try {
        const config = {
            method: method.toLowerCase(),
            url: url,
            withCredentials: true, // Enable sending cookies with the request
            data: body
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('API request failed:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};





















// import axios from 'axios'

// export const axiosInstance = axios.create({

// });

// export const apiConnector = (method, url, bodyData, headers, params) => {
//     return axiosInstance({
//         method: method,
//         url: url,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers : null,
//         params: params ? params : null,
//     })
//         .then((response) => {
//             // Handle successful response
//             return response.data;
//         })
//         .catch((error) => {
//             // Handle error
//             console.error("API request failed:", error);
//             throw error; // rethrow the error to be handled by the caller
//         });
// };


// // import axios from 'axios';

// // export const apiConnector = async (method, url, body) => {
// //     try {
// //         const response = await axios[method.toLowerCase()](url, body);
// //         return response.data;
// //     } catch (error) {
// //         // Handle error
// //         console.error('API request failed:', error);
// //         throw error; // Rethrow the error to be handled by the caller
// //     }
// // };


// import axios from 'axios';

// export const apiConnector = async (method, url, body) => {
//     try {
//         const config = {
//             method: method.toLowerCase(),
//             url: url,
//             withCredentials: true, // Enable sending cookies with the request
//             data: body
//         };
//         const response = await axios(config);
//         return response.data;
//     } catch (error) {
//         // Handle error
//         console.error('API request failed:', error);
//         throw error; // Rethrow the error to be handled by the caller
//     }
// };
