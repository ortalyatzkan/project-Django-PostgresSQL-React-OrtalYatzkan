import CheckList from "./CheckList";
import background from "./Corona.jpg";
import SummaryPage from "./SummaryPage";
import {useContext,useState} from "react";
import {UserContext} from "./Menu";
import CitySelect from "./CitySelect"









export default function FormPage(props)
{
    const user = useContext(UserContext);

    const   [errorFieldName, setErrorFieldName] = useState("");
    const   [errorLastName, setErrorLastName] = useState("");
    const   [errorAddress, setErrorAddress] = useState("");
    const   [errorCity, setErrorCity] = useState("");
    const   [erroLandLine, setErrorLandLine] = useState("");
    const   [messageSuccess,setMessageSuccess]=useState("");
    const   [formData,setFormData]=useState({});
    const   [addOtherDiseases,setOtherDiseases]=useState("");
    const   [errorZipCode,setErrorZipCode]=useState("");
    const   [errorCellularPhone,setErrorCellularPhone]=useState("");
    const   [selectOther,setSelectOther]=useState(false);

    

  
    




    function  saveOnDataBase(name,value)
    {
        setFormData(values => ({...values, [name]: value}))

    }
    function addOther()
    {
        setSelectOther(true);
        setOtherDiseases(<div className="mt-3">
        <input type="text" className="form-control"   id="other" aria-describedby="basic-addon1"/>
        </div>)

    }
    function isValidZipCode(str)
    {
        return str.match(/^[0-9,'-']+$/) != null || str==''

    }



    function isValidName(str)
    {
       return /^[a-zA-Z]+$/.test(str);
    }

    function isValidAdress(str)
    {
        return  /^[a-zA-Z0-9\s,'-'\s]*$/.test(str);
    }
    function isValidCity(str)
    {
        return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(str)
    }
    function isValidLandLine(str)
    {
      for(let i=0; i<str.length; i++)
        if((str[i] >= '0' && str[i] <= '9')||str[i]=='-')
            return true;
        return false;
     

    }
    function checkValidation()
    {
        let validFields = true;
        let firstName=document.getElementById("first_name").value;
        let lastName=document.getElementById("last_name").value;
        let address=document.getElementById("address").value;
        let city=document.getElementById("city").value;
        let date=document.getElementById("date").value;
        let zipCode=document.getElementById("zipCode").value;
        let land_line=document.getElementById("landLine").value;
        let cellular_phone=document.getElementById("cellularPhone").value;
        let Country=document.getElementById("Country").options[document.getElementById("Country").selectedIndex].text;

        let infected_COVID_19=document.getElementById("infectedCovid19").checked;
        let other;
            
        if(selectOther){
            other=document.getElementById("other").value;
        }
        else
         other='';
     

        if(!isValidName(firstName))
        {
            validFields=false;
            setErrorFieldName("Use only letters in English for first name");
        }
        else 
            setErrorFieldName(" ");
      
        if(!isValidName(lastName)){
            validFields=false;
            setErrorLastName("Use only letters in English for last name ");
        }
        else 
            setErrorLastName(" ");
        

        if(!isValidAdress(address)){
            validFields=false;
            setErrorAddress("Please enter correct address without sign as ? , ");
        }
        else 
        setErrorAddress(" ");

        if(!isValidCity(city)){
            setErrorCity("Please enter correct city without sign as ? , ");
            validFields=false;}
        else 
        setErrorCity(" ");
        
        if(!isValidZipCode(zipCode)){
            setErrorZipCode("Type the correct zip code, which contains only numbers");
            validFields=false;}
        else 
            setErrorZipCode(" ");

        if(!isValidLandLine(land_line)){
            setErrorLandLine("Type the correct land code, which contains only numbers");
            validFields=false;}
        else 
            setErrorLandLine(" ");
        if(!isValidLandLine(cellular_phone)){
            setErrorCellularPhone("Type the correct cellular_phone, which contains only numbers");
            validFields=false;}
        else 
            setErrorCellularPhone(" ");
        
        
        if(validFields)
        {
            saveOnDataBase("first_name",firstName);
            saveOnDataBase("last_name",lastName);
            saveOnDataBase("address",address);
            saveOnDataBase("Country",Country)
            saveOnDataBase("city",city);
            saveOnDataBase("date",date);
            saveOnDataBase("zip_code",zipCode)
            saveOnDataBase("land_line",land_line)
            saveOnDataBase("cellular_phone",cellular_phone)
            saveOnDataBase("other",other)


            if(infected_COVID_19==true)
                saveOnDataBase("infected_Covid_19","v");
            else
                saveOnDataBase("infected_Covid_19","-");
                const listOfCheckBox=["Diabetes","Cardio-Vascular problems"
                ,"Tuberculosis","Bowel Disease","Depression"].sort();            
                for(let i=0;i<listOfCheckBox.length;i++)
            {
                if(document.getElementById(listOfCheckBox[i]).checked==true)
                    saveOnDataBase(listOfCheckBox[i],'v');
                else
                    saveOnDataBase(listOfCheckBox[i],'-');
            }

        }

    return validFields;
        
    }

    function handleSubmit (event)
    {
        event.preventDefault();
        if(checkValidation())
        {
            fetch("http://localhost:8000/SummaryPage/",
            {
              method: "POST",
              cache: "no-cache",
              headers: {
                Accept: "application/json",
                
              },
              body: JSON.stringify(formData),
        })
            .then((response) => {
                return response.json();

              })
              .then((response) => {
                event.target.reset();
                user.setTableData(response);
                setMessageSuccess(<div className="alert alert-success" role="alert">
                Registration was successful! The data has been added to the list!
            </div>);
              })
              .catch((error) => {
                console.error(error);
              });
            
        
        }

     
      }
    

    
    return (
        <div className="row" style={{ backgroundImage: `url(${background})` }}>
            {messageSuccess}
            <div className="col-4" ></div>
            <div className="col-4" style={{backgroundColor:'#ffffcc'}}>
                <div className="row-5"></div>

                <div className="row-2">

                <form onSubmit={handleSubmit}>
                    <div className ="mb-3">
                        <legend>Registration:</legend>
                        <p>please enter your information in a form: </p>
                        
                        <div className ="mb-3">
                            <label  className ="form-label" >First name:</label>
                            <span style={{color:"red"}} className="required">*</span>
                            <input type="text"  id="first_name"  className ="form-control"  title="error" required/>
                            <p style={{color:'red'}} >{errorFieldName}</p>

                        </div>
                        <div className ="mb-3">
                            <label  className ="form-label" >Last name:</label>
                            <span style={{color:"red"}} className="required">*</span>
                            <input type="text"  className ="form-control" id="last_name" required/>
                            <p style={{color:'red'}} >{errorLastName}</p>
                        </div>
                        <div className ="mb-3">
                            <label  className ="form-label" >Date of birth:</label>
                            <span style={{color:"red"}} className="required">*</span>
                            <input type="date"  className ="form-control" onChange={(input) => { saveOnDataBase("date",input)}} id="date" required/>
                        </div>
                        <div className ="mb-3">
                                <label  className ="form-label" >Address:</label>
                                <span style={{color:"red"}} className="required">*</span>
                                <input type="text"   className ="form-control" id="address" required/>
                                <p style={{color:'red'}} >{errorAddress}</p>

                        </div>
                        <div className ="mb-3">
                            <label  className ="form-label" >City:</label>
                            <span style={{color:"red"}} className="required">*</span>
                            <input type="text"  className ="form-control" id="city" required/>
                            <p style={{color:'red'}} >{errorCity}</p>
                        </div>
                        <div className="mb-3">
                        <CitySelect/></div>                        
                        <div className ="mb-3">
                            <label  className ="form-label" >Zip code:</label>
                            <input type="text" className ="form-control" id="zipCode" />
                            <p style={{color:'red'}} >{errorZipCode}</p>

                        </div>
                        <div className ="mb-3">
                            <label  className="form-label" >Land line:</label>
                            <span style={{color:"red"}} className="required">*</span>
                            <input  type="text" className="form-control" id="landLine" required/>
                            <p style={{color:'red'}} >{erroLandLine}</p>

                        </div>
                        <div className ="mb-3">
                            <label  className="form-label" >Cellular phone:</label>
                            <span style={{color:"red"}} className="required">*</span>
                            <input type="text"  className="form-control" id="cellularPhone" required/>
                            <p style={{color:'red'}} >{errorCellularPhone}</p>
                        </div>
                       
                        <div className ="form-check">
                            <input className ="form-check-input"  type="checkbox" id="infectedCovid19"/>
                            <label className="form-check-label" >
                            I have been infected with COVID-19 in the past
                            </label>
                        </div>
                        <div className="mb-3">
                        <CheckList/></div>
                        <div className="mb-3">

                        <button type="button" className="btn btn-outline-dark" onClick={addOther} >other</button>
                            {addOtherDiseases}
                            </div>
                        <div className="mb-3">
                            <button type="submit"  method="post"  action="/SummaryPage"  className="btn btn-primary" >Submit</button>
                        </div>
                    </div>
                </form>                
                </div>
                

                <div className="row-5"></div>
                </div>
                <div className="col-4" ></div>

            </div>
    )
}
