"use client"
import axios from 'axios';
import { useState, useEffect,useMemo, } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

const override= {
  display: "flex",
  margin: "0 auto",
  borderColor: "white",
};

export default function Home() {
  const [value, setValue] = useState('');
  const [columnDefs, setColumnDefs] = useState([
    {field: 'ResourceGroup',filter:true },
    {field: 'ConsumedQuantity',},
    {field: 'Cost'},
    {field: 'Location'},
    {field: 'ServiceName'},
    {field: 'UnitOfMeasure'},
    {field: 'MeterCategory'},
    {field: 'Date'}
  ]);

  useEffect(() => {
    const getResourceDetail = async () => {
      try {
        const response = await axios.get('https://engineering-task.elancoapps.com/api//applications/Macao');
        const data=response.data;
        setValue(data);
      } catch (error) {
        console.error(error);
      }
    };
    getResourceDetail();

  }, []);

  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    filter:true,
  }));

  return (
    <div>
        {!value ?  <ClipLoader
        cssOverride={override}
        size={100}   
        aria-label="Loading Spinner"
        data-testid="loader"
      /> :
      <div className="ag-theme-alpine" style={{height: '100vh', width: '100%',}}>
      <AgGridReact
          rowData={value}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true} 
          enableSorting={true} 
          domLayout='autoWidth'>
      </AgGridReact>
  </div>
      }
    </div>
  );
}
