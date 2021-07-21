import React from "react";
import axios from "axios";
import moment from "moment";
import { dateFormat, domain } from "../../shared/sharedProjectConfig";
import { fireUserinfoUpdateEvent } from "../event";

export default function BookingPanel({
  targetMoment,
  user,
  rooms,
  displayResponse,
}: any) {
  const isBookingLimitReached =
    user.bookingLimit === false ? false : user.booked >= user.bookingLimit;
  return (
    <div>
      <div className="header panel__midPageHeader">
        {moment(targetMoment).format("DD/MM") +
          " " +
          moment(targetMoment).format("H:00") +
          " - " +
          moment(targetMoment).add(3, "hours").format("H:00")}
      </div>
      <BookingLimitDisplay user={user} />
      <select id="Room" className="customSelect" name="Room">
        {rooms.map(({ title, floor, workstations, description }: any) => (
          <option value={title}>{`${title} - Floor ${floor}`}</option>
        ))}
      </select>
      <button
        className="button long cta0"
        onClick={
          isBookingLimitReached
            ? () => {}
            : () => book(targetMoment, displayResponse)
        }
        {...(isBookingLimitReached ? { disabled: true } : {})}
      >
        Book
      </button>
    </div>
  );
}
const BookingLimitDisplay = (user: any) => {
  return (
    <div className="noselect">
      {`Your Bookings: ${user.user.booked} / `}
      {user.user.bookingLimit === false ? (
        <i className="fas fa-infinity"></i>
      ) : (
        user.user.bookingLimit
      )}
    </div>
  );
};
const book = (targetMoment, displayResponse) => {
  const Room = document.getElementById("Room") as any;
  const output = document.getElementById("output") as any;
  axios
    .post(
      domain + "/api/book/schedule",
      {
        token: document.cookie.replace("token=", ""),
        data: {
          room: Room.value,
          date: moment(targetMoment).format(dateFormat),
          slot: moment(targetMoment).format("H:00"),
        },
      },
      {}
    )
    .then((res: any) =>
      res.data.success
        ? fireUserinfoUpdateEvent({
            bookingLimit: res.data.data.newBookingLimit,
            booked: res.data.data.booked,
          })
        : displayResponse(res.data.reason)
    )
    .catch(displayResponse);
};
