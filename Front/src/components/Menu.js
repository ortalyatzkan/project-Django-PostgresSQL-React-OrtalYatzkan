import * as React from 'react'
import {Link} from 'react-router-dom';
import {Outlet} from "react-router";
import { useState} from "react";


export const UserContext = React.createContext();


export default function Menu(props)
{

    const   [tableData, setTableData] = useState({});

    function getData(e)
    {
     

    fetch("http://localhost:8000/SummaryPage", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        let result = response.json()
        let status_code = response.status;
        if(status_code != 200) {
            console.log('Error in getting brand info!')
            return false;
        }
        
        return result
    })
    .then(result => {
       setTableData(result)

       
        // Do something with the result

    })
    .catch(error => {
        console.log(error.message)
    })
    

}
    


    return (
        <div  >
        <UserContext.Provider value={{tableData,setTableData,getData}}>

        <div>
                    <Link to="/FormPage">
                        <button type="button" className="btn">
                        Registration
                        </button>
                    </Link>{' '} | {' '}
                    <Link to="/SummaryPage">
                        <button type="button" className="btn" onClick={getData}>
                            Summary Page
                        </button>
                    </Link>
                        
                    <Outlet />
                </div>
                </UserContext.Provider>
        </div>
);
}
