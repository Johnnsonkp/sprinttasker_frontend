import React, {useEffect, useState} from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Table from "./Table";
import Spreadsheet from "react-spreadsheet";
import {Link, useNavigate} from "react-router-dom";
// import Spreadsheet from "react-spreadsheet";


const SpreadsheetContainer = () => {
    const [docTitle, setDocTitle] = useState("Spreadsheet")
    const [header, setHeaderValues] = useState([])
    const [columnValues, setColumnValues] = useState([])
    const [allData, setAllData] = useState([])

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
        // const colomnValues = rows[0]._rawData
        console.log("sheet", sheet)
        const colomnValues = range(rows)
        console.log("colomnValues", colomnValues)
        setHeaderValues(headerValues)
        setColumnValues(colomnValues)
        setAllData(sheet)

        console.log("setHeader:", header)
        console.log("colomnValues:", colomnValues)
    };

    useEffect(() => {
        refresh()
    }, [])

    return (
        <div style={{width: '100%', margin: 'auto', padding: '20px 30px'}}>
            <Link to="/main">Return</Link>
            <Table header={header} body={columnValues}/>
        </div>
    )
}

export default SpreadsheetContainer