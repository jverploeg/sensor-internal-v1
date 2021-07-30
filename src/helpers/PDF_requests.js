import axios from 'axios';

const host = `http://192.168.1.118:3000`;

const calls = {
    getCustomImageType : async(sensor, type) => {
        try {
            const response = await axios.get(`${host}/images/type/Type-${sensor}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getCustomImageMech : async(sensor, housing) => {
        try {
            const response = await axios.get(`${host}/images/mech/${sensor}-Mech-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getCustomImageHousing : async(sensor, housing) => {
        try {
            const response = await axios.get(`${host}/images/housing/${sensor}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/housing/${housing}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getCustomImageOption : async(sensor, option) => {
        try {
            const response = await axios.get(`${host}/images/option/${sensor}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/option/${option}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getCustomImageConnect : async(sensor, connect) => {
        try {
            const response = await axios.get(`${host}/images/connect/${sensor}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/connect/${connect}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getCustomImageConnChart : async(sensor, connect, char) => {
        try {
            const response = await axios.get(`${host}/images/conn_charts/${sensor}-${sensor}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/conn_charts/${connect}-${char}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                console.log(error);
                //TODO... image file shows combos for 3 more posibilities
                //...add a sensor-char, sensor-connect, sensor-option... but those might be for xproto...
            }
        }
    },
    getCustomImageSpec : async(sensor, char, option) => {
        try {
            const response = await axios.get(`${host}/images/spec_charts/${sensor}-${option}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/spec_charts/${sensor}-${sensor}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                try {
                    const response = await axios.get(`${host}/images/spec_charts/${char}-${sensor}-Model`, { responseType: 'arraybuffer' });
                    return response;
                }
                catch (error) {
                    try {
                        const response = await axios.get(`${host}/images/spec_charts/${char}-${option}-Model`, { responseType: 'arraybuffer' });
                        return response;
                    }
                    catch (error) {
                        console.log(error);
                        //TODO... figure out if all these are needed or if we need more....
                    }
                }        
            }
        }
    },
    getCustomImagePicture : async(sensor, housing, char, type) => {
        try {
            const response = await axios.get(`${host}/images/pictures/${housing}-${sensor}-Model`, { responseType: 'arraybuffer' });
            return response;
        }
        catch (error) {
            try {
                const response = await axios.get(`${host}/images/pictures/${sensor}-${char}-Model`, { responseType: 'arraybuffer' });
                return response;
            }
            catch (error) {
                try {
                    const response = await axios.get(`${host}/images/pictures/${sensor}-${sensor}-Model`, { responseType: 'arraybuffer' });
                    return response;
                }
                catch (error) {
                    try {
                        const response = await axios.get(`${host}/images/pictures/${sensor}-${type}-Model`, { responseType: 'arraybuffer' });
                        return response;
                    }
                    catch (error) {
                        try {
                            const response = await axios.get(`${host}/images/pictures/${housing}-${char}-Model`, { responseType: 'arraybuffer' });
                            return response;
                        }
                        catch (error) {
                            console.log(error);
                            //TODO... figure out if all these are needed or if we need more....
                        }
                    }
                }        
            }
        }
    },
    //custom html calls
    checkBullets : async(file1, file2) => {
        try {
            const found1 = await require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file1}.html`).default;
            return found1;
        } catch(error) {
            try {
                const found2 = await require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file2}.html`).default;
                return found2;
            } catch(error) {
                console.log(error)
            }
        }
    },
    checkDescription : async(file1, file2) => {
        try {
            const found1 = await require(`D:/DATA/Sensor/webApp/images/descriptions/${file1}.html`).default;
            return found1;
        } catch(error) {
            try {
                const found2 = await require(`D:/DATA/Sensor/webApp/images/descriptions/${file2}.html`).default;
                return found2;
            } catch(error) {
                console.log(error)
            }
        }
    },

}

export default calls;