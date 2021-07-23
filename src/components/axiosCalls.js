import axios from 'axios';

const host = `http://192.168.1.118:3000`;

const calls = {
    getCustomImageType : async(sensor, type) => {
        try {
            const response = await axios.get(`${host}/images/type/Type-${sensor}-Model`, { responseType: 'arraybuffer' });
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' });
                console.log(response.data);
                return response.data
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getCustomImageMech : async(sensor, housing) => {
        try {
            const response = await axios.get(`${host}/images/mech/${sensor}-Mech-Model`, { responseType: 'arraybuffer' });
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' });
                console.log(response.data);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        }
    
    }
}
export default calls;


// const getCustomImageType = async(sensor, type) => {
//     try {
//         const response = await axios.get(`${host}/images/type/Type-${sensor}-Model`, { responseType: 'arraybuffer' });
//         console.log(response.data);
//         return response.data;
//     }
//     catch (error) {
//         try {
//             const response = await axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' });
//             console.log(response.data);
//             return response.data
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }

// }
// //export function getCustomImageType
// const getCustomImageMech = async(sensor, housing) => {
//     try {
//         axios.get(`${host}/images/mech/${sensor}-Mech-Model`, { responseType: 'arraybuffer' }),
//         console.log(response.data);
//         return response.data;
//     }
//     catch (error) {
//         try {
//             axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' }),
//             console.log(response.data);
//             return response.data
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }

// }
//export default getCustomImageMech;

// module.exports = {
//     getCustomImageMech,
//     getCustomImageType,
// }