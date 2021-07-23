import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

import { Event, loginEvent, logout, fireLoginEvent } from "../event";
import Header from "../components/AppHeader";

import LoginPage from "./Login";
import AccountPage from "./Account";
import RegisterPage from "./Register";
import TimeTable from "./TimeTable";
import RoomView from "./RoomView";
import ScheduleView from "./ScheduleView";

export default function App() {
  const initialUser = document.cookie
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    window.addEventListener(Event.USERINFO_UPDATE, (e: any) => {
      const newUser = {
        ...JSON.parse(localStorage.getItem("userInfo")),
        ...JSON.parse(e.detail),
      };
      setUser(newUser);
      localStorage.setItem("userInfo", JSON.stringify(newUser));
    });
    window.addEventListener(Event.LOGIN, (e: any) => {
      const data: loginEvent | null = JSON.parse(e.detail);
      const userInfo = data ? data.userInfo : null;
      data
        ? localStorage.setItem("userInfo", JSON.stringify(userInfo))
        : localStorage.removeItem("userInfo");
      document.cookie = data
        ? `token=${data.token};path=/;`
        : "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      setUser(userInfo);
    });
  }, []);
  return (
    <div id="app" className="App">
      <Router>
        <Header user={user} />
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/timetable" /> : <LoginPage />}
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/confirm/:token">
            <MailConfirmPseudopage />
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
          <Route exact path="/logout">
            <LogoutPseudopage />
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
const LogoutPseudopage = () => {
  logout();
  return <div>Logging out...</div>;
};
const MailConfirmPseudopage = () => {
  const { token } = useParams() as any;
  const data = token.split("||");
  setTimeout(
    () =>
      fireLoginEvent({
        token: data[0],
        isFirstLogin: true,
        userInfo: JSON.parse(decodeURIComponent(data[1])),
      }),
    0
  );
  return <div>Confirming...</div>;
};
