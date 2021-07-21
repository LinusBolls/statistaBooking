import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./header";
import { Event, loginEvent } from "../event";

import LoginPage from "../pages/Login";
import AccountPage from "../pages/Account";
import RegisterPage from "../pages/Register";
import MailConfirmPage from "../pages/MailConfirm";
import TimeTable from "../pages/TimeTable";
import RoomView from "../pages/RoomView";
import ScheduleView from "../pages/ScheduleView";

function App() {
  const initialUser = document.cookie
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    window.addEventListener(Event.USERINFO_UPDATE, (e: any) => {
      setUser({ ...user, ...JSON.parse(e.detail) });
    });
    window.addEventListener(
      Event.LOGIN,
      (e: any) => {
        const data: loginEvent | null = e.detail;
        const token = data ? data.token : "";
        const userInfo = data ? data.userInfo : "";
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        document.cookie =
          data == null
            ? "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
            : `token=${token};path=/;`;
        setUser(userInfo);
      },
      false
    );
  }, []);
  return (
    <Router>
      <div id="app" className="App">
        <Header user={user} />
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/timetable" /> : <LoginPage />}
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/confirm/:token">
            <MailConfirmPage />
          </Route>
          <Route exact path="/account">
            <AccountPage user={user} />
          </Route>
          <Route exact path="/schedules">
            <ScheduleView user={user} />
          </Route>
          <Route exact path="/timetable/:date">
            <TimeTable user={user} />
          </Route>
          <Route exact path="/timetable">
            <TimeTable user={user} />
          </Route>
          <Route exact path="/rooms">
            <RoomView user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
