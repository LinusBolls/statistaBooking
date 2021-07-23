import React, { useEffect, useState } from "react";
import axios from "axios";
import { floors } from "../../shared/sharedProjectConfig";
import { IRoom } from "../../shared/interfaces";
import Input from "../components/Input";
import { Link } from "../components/CustomLinks";

export default function RoomView({ user }: any) {
  if (!user)
    return (
      <div>
        <Link to="/login" className="button long invis text">
          Log in
        </Link>
        to view available rooms
      </div>
    );
  const [rooms, setRooms] = useState<[] | null>(null);
  useEffect(() => {
    axios
      .post(
        "/api/view/room",
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
    <p>
      Floor:{" "}
      <select id="Floor" className="customSelect">
        {floors.map(floor => (
          <option value={floor}>{floor}</option>
        ))}
      </select>
    </p>
    <Input label="Title" />
    <Input label="Description" />
    <Input label="Workstations" type="number" />
    <button className="button long cta0 text" onClick={createRoom}>
      Create
    </button>
  </>
);
const createRoom = () => {
  const title = document.getElementById("Title") as any;
  const floor = document.getElementById("Floor") as any;
  const description = document.getElementById("Description") as any;
  const workstations = document.getElementById("Workstations") as any;
  axios
    .post(
      "/api/create/room",
      {
        token: document.cookie.replace("token=", ""),
        data: {
          floor: parseInt(floor.value),
          workstations: parseInt(workstations.value),
          description: description.value,
          title: title.value,
        },
      },
      {}
    )
    .then((res: any) => alert(JSON.stringify(res)))
    .catch(e => alert(e));
};
