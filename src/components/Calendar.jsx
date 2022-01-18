import React, {useState} from "react";
import { useAppState } from '../AppState';
import './Calendar.css'

export async function showCal () {
    const auth = await JSON.parse(window.localStorage.getItem("auth"));
    var iframe = document.getElementById('calendarEmbed');
    var email = auth.email
    var blocker = document.getElementById('calendarEmbedBlocker');
    if (email && /.+\@.+/.test(email)){
        iframe.src = 'https://calendar.google.com/calendar/embed?src=' + encodeURI(email);
        blocker.style.display = 'none';
    }
    else {
        alert("That doesn't look like a valid email...");
        blocker.style.display = 'block';
    }
}

export const LargeCalendar = () => {
    const { state, dispatch } = useAppState();
    return (
        <div id="calendarEmbedWrapper">
            <iframe id="calendarEmbed"></iframe>
            <div id="calendarEmbedBlocker">
                <p>Please enter email and click load</p>
            </div>
        </div>
    )
}