import { createContext,useEffect } from "react";
import axios from "axios";

const allData = createContext();

function Provider(){

  
  useEffect(()=>{
    getDataFromServer();
  },[])
  // this function to get data form json-Server 
  const getDataFromServer = ()=>{
    axios.get("http://localhost:5001/networkProducts").
    then((response)=>{
      console.log(response.data);
    })
  } 


}
export {Provider}
export default allData;