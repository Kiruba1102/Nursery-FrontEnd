import axios from "axios";


const add = "http://localhost:8080/api/customers/add";
const addd = "http://localhost:8080/api/customers/add";
const getuser = "http://localhost:8080/api/customers/get";
const AdminService = {


    Addregis(res) {
      return axios.post(add, res);
    },
    Addregiss(res) {
      return axios.post(addd, res);
    },
    GetUser(cname) {
      return axios.get(getuser + cname);
    }
};

export default AdminService;
