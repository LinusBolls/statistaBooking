import React, { useEffect, useState } from "react";
import axios from "axios";
import { domain, dateFormat } from "../../shared/sharedProjectConfig";
import moment from "moment";
import { IRoom } from "../../shared/interfaces";
import Input from "../components/input";
import { Link } from "react-router-dom";
import { LinkButtonText } from "../components/CustomLinks";

export default function RoomView({ user }: any) {
  if (!user)
    return (
      <div>
        <Link to="/login" component={LinkButtonText}>
          Log in
        </Link>
        to view available rooms
      </div>
    );
  const [rooms, setRooms] = useState<[] | null>(null);
  useEffect(() => {
    axios
      .post(
        domain + "/api/view/room",
        {
          token: document.cookie.replace("token=", ""),
        },
        {}
      )
      .then((res: any) => setRooms(res.data.data))
      .catch(e => alert(e));
  }, []);
  return (
    <div className="panel">
      {" "}
      <div className="header panel__header">Rooms</div>
      {rooms ? rooms.map(mapRoom) : "Fetching..."}
      {user.isAdmin ? <CreateRoomPanel /> : ""}
    </div>
  );
}
const mapRoom = ({ title, floor, workstations, description }: IRoom) => {
  return (
    <div>
      <h3>{`${title} - Floor ${floor}`}</h3>
      {description ? <p>{description}</p> : ""}
      <p>{`${workstations} desks`}</p>
    </div>
  );
};
const CreateRoomPanel = () => (
  <>
    <Input label="Title" />
    <Input label="Floor" />
    <Input label="Description" />
    <Input label="Workstations" />
    <button className="button long cta0 text" onClick={createRoom}>
      Create
    </button>
  </>
);
const createRoom = () => {
  const title = document.getElementById("Title");
  const floor = document.getElementById("Floor");
  const description = document.getElementById("Description");
  const workstations = document.getElementById("Workstations");
  axios
    .post(
      domain + "/api/create/room",
      {
        token: document.cookie.replace("token=", ""),
        data: {
          floor: floor,
          workstations: workstations,
          description: description,
          title: title,
        },
      },
      {}
    )
    .then((res: any) => alert(JSON.stringify(res)))
    .catch(e => alert(e));
};
