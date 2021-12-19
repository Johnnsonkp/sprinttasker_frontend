import React, {useState} from 'react'
import Spreadsheet from "react-spreadsheet";

const Table = (props) => {
    const tableHeaders = props.header
    const tableBody = props.body

    function range(rows) {
        var ans = [];
        for (let i = 0; i <= 99; i++) {
            ans.push(rows[i]._rawData);
        }
        return ans;
    }

    const TestTable = (props) =>  {
        let header = []
        let tableData = []
        props.title.forEach((name) => {
            header.push({ value: name })
        }) 
        props.body.forEach((name) => {

            name.forEach((arr) => {
                tableData.push({ value: arr },)
            }) 
            // tableData.push({ value: name })
        }) 

        
        // for (let i = 0; i <= 99; i++) {
        //     let ans  
        //     ans.push(rows[i]._rawData);

        // }

        return <Spreadsheet row={5} data={[header], [tableData]}/>;
    };

    const styles = {
        outerTable: {
            border: '1px solid red',
            width: '100%',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            color: '#111'
        }, 
        tableHeader: {
            display: 'flex',
            justifyContent: 'space-around',
        },
        width: '600px',
        border: '1px solid red'
    }

    return (
        <>
            <h1>Table</h1>
            <TestTable style={styles.width} title={tableHeaders} body={tableBody}/>
        </>
    )
}

export default Table