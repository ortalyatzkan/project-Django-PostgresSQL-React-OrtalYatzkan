import logo from './logo.svg';
import './App.css';
import FormPage from "./components/FormPage";
import Menu from "./components/Menu";
import NoPage from "./components/NoPage";
import SummaryPage from "./components/SummaryPage";
import React, { Component }  from 'react';


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App()
/**
 * The function of the main component.
 * @returns {JSX.Element}: Html of the program.
 * @constructor
 */
{
    return (
        <div className="container"  style={{backgroundColor: '#F8FDC9'}} >
            <div className="row">
                <BrowserRouter >
                                <Routes>
                                <Route path="/" element={<Menu/>}>
                                    <Route path="SummaryPage" element={<SummaryPage/>}/>
                                        <Route path="/" element={<FormPage />}  />
                                        <Route path="FormPage" element={<FormPage />}  />

                                    </Route>
                                    <Route path="*" element={<NoPage />} />
                                </Routes>
                            </BrowserRouter>
                    <div className="row align-items-center mt-8">
                        <div className="col ">
                    </div>
                    </div>
                </div>
            </div>

    );
}
export default App;
