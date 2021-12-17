import React, {useEffect} from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";


const Spreadsheet = () => {

    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const SHEET_ID = process.env.REACT_APP_SHEET_ID;
    const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
    // const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\n/g, '\n');
    const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    (async function loadSheets() {
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
        });

        await doc.loadInfo();
        console.log(doc.title)

        const sheet = doc.sheetsById[SHEET_ID];
        console.log(sheet.title);
        console.log(sheet);
    }());

    return (
        
        <h1>Spreadsheet</h1>
    )
}

export default Spreadsheet