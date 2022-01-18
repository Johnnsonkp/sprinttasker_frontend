import { LargeCalendar } from "../components/Calendar";
import { useAppState } from "../AppState";
import { DisplayBox } from "../components/DisplayBox";

export default function CalendarPage() {
  const { state } = useAppState();

  async function showCal() {
    const auth = await JSON.parse(window.localStorage.getItem("auth"));
    var iframe = document.getElementById("calendarEmbed");
    var email = auth.email;
    var blocker = document.getElementById("calendarEmbedBlocker");
    if (email && /.+\@.+/.test(email)) {
      iframe.src =
        "https://calendar.google.com/calendar/embed?src=" + encodeURI(email);
      blocker.style.display = "none";
    } else {
      alert("That doesn't look like a valid email...");
      blocker.style.display = "block";
    }
  }

  return (
    <div
      id="calendarPage"
      style={{
        paddingLeft: "100px",
        paddingRight: "0px",
        maxWidth: "1500px",
        width: "100%",
        margin: "auto",
        transition: "all 5s easeInOut",
      }}
    >
      <div className="trackList">
        <div className="dummy-side-panel"></div>
        <DisplayBox
          component={<LargeCalendar customFunction={showCal()} />}
          title={"Calendar"}
          link={"/calendar"}
        />
      </div>
    </div>
  );
}
