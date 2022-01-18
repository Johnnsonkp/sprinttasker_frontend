import React, {useEffect, useState} from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Table from "./Table";
import {Spreadsheet, createEmptyMatrix} from "react-spreadsheet";
import {Link, useNavigate} from "react-router-dom";
// import Spreadsheet from "react-spreadsheet";


const SpreadsheetContainer = () => {
    const [docTitle, setDocTitle] = useState("Spreadsheet")
    const [newHeader, setHeaderValues] = useState([])
    const [columnValues, setColumnValues] = useState([])
    const [allData, setAllData] = useState([])
    const [columnCount, setColumnCount] = useState()

    const [data, setData] = useState([
        [{ value: "Vanilla" }, { value: "Chocolate" }],
        [{ value: "Strawberry" }, { value: "Cookies" }],
    ]);

    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const SHEET_ID = process.env.REACT_APP_SHEET_ID;
    const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    async function loadSheets() {
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
        });
        await doc.loadInfo();
        setDocTitle(doc.title)
        const sheet = doc.sheetsById[SHEET_ID];
        return sheet
    }

    function range(rows) {
        var ans = [];
        for (let i = 0; i <= 99; i++) {
            ans.push(rows[i]._rawData);
        }
        return ans;
    }

    const refresh = async () => {
        const sheet = await loadSheets()
        const rows = await sheet.getRows()
        const headerValues = rows[0]._sheet.headerValues
        // const headerValues = await sheet.headerValues
        // const colomnValues = rows[0]._rawData
        console.log("sheet", sheet)
        console.log("GoogleSpreadsheetWorksheet.headervalues:", sheet._rawProperties.gridProperties.columnCount)
        const colomnValues = range(rows)
        console.log("colomnValues all", colomnValues)
        console.log("colomnValues[5", colomnValues[sheet._rawProperties.gridProperties.columnCount])
        colomnValues.forEach((values) => {
            console.log(values)
        })
        console.log(rows[0]._sheet.headerValues)
        console.log("colomnValues:", colomnValues[0][1])
        colomnValues.forEach((data) => console.log("for each:", data))
        setHeaderValues([headerValues])
        setColumnValues(colomnValues)
        setData(colomnValues)
        setColumnCount(sheet._rawProperties.gridProperties.columnCount)
    };
    

    useEffect(() => {
        refresh()
    }, [])

    const TestBody = (props) =>  {
        let arr = []
        for(let i = 0; i < data.length - 1; i++){
            console.log(`data[${i}]`, data[i])
            data[i].forEach((singleData) => {
                arr.push({value: singleData})
            })
        }
        console.log('arr', arr)
        return <Spreadsheet data={[arr]} />
    };

    

    return (
        <div style={{width: '100%', margin: 'auto', padding: '20px 30px'}}>
            <Link to="/main">Return</Link>
            {/* <Table header={header} body={columnValues} data={allData}/> */}
            {/* <Spreadsheet data={columnValues}/>; */}
            <TestBody />
        </div>
    )
}

export default SpreadsheetContainer