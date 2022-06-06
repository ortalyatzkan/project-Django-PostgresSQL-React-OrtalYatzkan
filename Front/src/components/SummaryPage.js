import {Fragment, useState,useContext,useEffect} from "react";
import {UserContext} from "./Menu";
import background from "./Corona.jpg";
import axios from "axios";











export default function SummaryPage(props)
{
    const user = useContext(UserContext);
    const [searchInput, setSearchInput] = useState('');
    const [SearchInputDateFrom, setSearchInputDateFrom] = useState('');
    const [SearchInputDateEnd, setSearchInputDateEnd] = useState('');
    const [SearchInputDate, setSearchInputDate] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [CityToServer, setCityToServer] = useState('');
    const [tableHtml, setTableHtml] = useState('');


    function handlerClickOnChooseDate()
    {
      setSearchCity('')
      setSearchInput('')
      setSearchDate(
        <Fragment>
        <span className ="mb-3">
          <label  className ="form-label" >Start:</label>
          <input type="date" style={{width:"200px",display: "inline-block", margin:"15px"}}  className ="form-control"  id="dateStart" onChange={(e) => searchDateFrom(e.target.value) }/>
        </span>
        <span className ="mb-3">
          <label  className ="form-label" >End:</label>
          <input type="date" style={{width:"200px",display: "inline-block", margin:"15px"}}  className ="form-control"  id="dateEnd"  onChange={(e) => searchDateEnd(e.target.value)}/>
        </span>
      </Fragment>
      )
    }

    

    function handlerClickOnChooseCity()
    {
      setSearchDate('')
      setSearchInputDateEnd('')
      setSearchInputDateFrom('')
      setSearchInputDate('')
      setSearchCity(
        <Fragment>
        <span className="mb-3">
        <label  className ="form-label" >city:</label>
          <input type="text" style={{width:"200px",display: "inline-block", margin:"15px"}} className="form-control" id="searchcityField" 
          onChange={(e) => searchItems(e.target.value)}  />
        </span>
      </Fragment>
      )
      setCityToServer({["ortal"]:searchInput})
    }



//-----------------------------------------------------


useEffect( () =>
    /**
     * A function that do fetch when the url update.
     */
{
   const fetchData = async () => {
      const result = await axios.post(
          "http://localhost:8000/search/",{
       
            method: "POST",
              cache: "no-cache",
              headers: {
                Accept: "application/json",
                
             
      },
      body:["city",searchInput,"date",SearchInputDateFrom,SearchInputDateEnd]
    })
      .then((res) => res.data)
      .then((result) =>user.setTableData(result))
      .catch((err) => console.log('error'))
  

    };
    fetchData();

   
    BuildLIst();

}, [searchInput]);

//-------------------------------------------------------

useEffect( () =>
{
  BuildLIst();
},[user.tableData]);
//--------------------------------------------------------
useEffect( () =>
{
  if(SearchInputDateEnd!=''&&SearchInputDateFrom!='')
    setSearchInputDate([SearchInputDateFrom,SearchInputDateEnd])
},[SearchInputDateEnd,SearchInputDateFrom]);
//-------------------------------------------------------
useEffect( () =>
    /**
     * A function that do fetch when the url update.
     */
{
   const fetchData = async () => {
      const result = await axios.post(
          "http://localhost:8000/search/",{
       
            method: "POST",
              cache: "no-cache",
              headers: {
                Accept: "application/json",
                
             
      },
      body:["city",searchInput,"date",SearchInputDateFrom,SearchInputDateEnd]
    })
      .then((res) => res.data)
      .then((result) =>user.setTableData(result))
      .catch((err) => console.log('error'))
  

    };
    fetchData();

   
    BuildLIst();

}, [SearchInputDate]);
//--------------------------------------------------------


const searchItems = (searchValue) => {
 
  setSearchInput(searchValue)
}
//---------------------------------------------------------------
const searchDateFrom = (searchValue) => {


  setSearchInputDateFrom(searchValue)

}

//---------------------------------------------------------------
const searchDateEnd = (searchValue) => {
 
  setSearchInputDateEnd(searchValue)
}
//----------------------------------------------------------------

    function BuildLIst()
    //A function that get a jeson and convert it to list
    {
     
      let list=Array();
      let fields=Array("First Name","Last Name","Date","Address","City","Country","Zip code","Land line","Cellular phone","Covid-19 infected",
     "Diabetes","Cardio-Vascular problems"
                ,"Tuberculosis","Bowel Disease","Depression","Other");
     
      let jsonFields=Array("First_name","Last_name","Date","Address","City","Country","Zip_code","Land_line","Cellular_phone","Infected_COVID_19",
      "Bowel_Disease","Cardio_Vascular_Problems","Depression","Diabetes",
       "tuberculosis","other")
     
      for(let i=0; i<user.tableData.length ; i++)
      {
        list.push(user.tableData[i]);
      }
     setTableHtml( (<Fragment >
     

      <table className="table mt-3"  >
          <thead>
          <tr>
            <th scope="col" >#</th>
            {fields.map(item=>(<th scope="col">{item}</th>))}
            </tr>
          </thead>
          <tbody>
          
              {list.map((item,i) => (

                      <tr>
                      <th scope="row" >{i+1}</th>
                      {jsonFields.map((elem)=>(<td  scope={"col"}>{item["fields"][elem]}</td>))}
                      </tr>
          
                
              ))}
            
              
         
          
      
      </tbody>
    </table>

    </Fragment>))
    
    }

    return (
        <div className="row" >
           
              <div className="col-12">
              <div>
        <div className="row-4" ></div>
    <div className="row-4" >
       <form action="http://localhost:8000/export_excel" style={{display: "inline-block",margin:"15px"}}>
    <button type="submit" className="btn btn-success mt-3" style={{display: "inline-block", margin:"15px"}} >export to excel</button>
    </form>
      < button type="button" className="btn btn-secondary mt-3"  onClick={handlerClickOnChooseCity} id="SearchByCity" style={{display: "inline-block",margin:"15px"}}>
            Search By City
        </button>
      < button type="button" className="btn btn-secondary mt-3"  onClick={handlerClickOnChooseDate} id="SearchByDate" style={{display: "inline-block",margin:"15px"}}>
            Search By Date
        </button> 
        {searchCity}
        {searchDate}
        {tableHtml}
    </div>
<div className="row-4"></div>  
</div>
               
              </div>
           
        </div>)
}