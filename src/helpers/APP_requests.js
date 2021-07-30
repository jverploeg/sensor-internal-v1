import axios from 'axios';

const host = `http://192.168.1.118:3000`;

const calls = {
    getData: async(page) => {
        //determine route -> db table based on pageSelection
        let route = page;
        try {
            const { data } = await axios.get(`${host}/${route}`); //response.data
            //setData(response.data);
            return data;
        }
        catch (error) {
            console.log(error)
        }
    },
    submit:  (page, inputs) => {
        let route = page;
        axios.post(`${host}/${route}`, inputs)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEditCellChangeCommitted: (page, {id, field, props}) => {//id, field, props) => {
        let route = page;
        axios.put(`${host}/${route}`, {id, field, props})
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },


}
export default calls;