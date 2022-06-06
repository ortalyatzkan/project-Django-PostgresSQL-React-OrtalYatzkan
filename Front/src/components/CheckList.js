export default function checklist()
   
{
    const listOfCheckBox=["Diabetes","Cardio-Vascular problems"
    ,"Tuberculosis","Bowel Disease","Depression"].sort();
    
    {
        let list=listOfCheckBox.map((item,i) => (
            <div className="form-check " style={{display: "inline-block" ,   padding:"20"       }}>
                <label className="checkbox-inline">
                    <input value={item} key={i} className="form-check-input" type="checkbox" id={item}/>
                    {item}
                </label>
            </div>
))
      

    return (
        <div>
            <div className="list-container mt-3">
                <p>please choose your previous conditions:</p>
                {list}
            </div>
        </div>
    );
}
}
    
