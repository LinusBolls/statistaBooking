import React from "react";
import axios from "axios";
import moment from "moment";
import { dateFormat } from "../../shared/sharedProjectConfig";
import { fireUserinfoUpdateEvent, fireBookingViewEvent } from "../event";

export default function BookingPanel({
  targetMoment,
  user,
  weekData,
  rooms,
  displayResponse,
}: any) {
  const targetSlot = moment(targetMoment);
  const isBookedByMe = weekData
    ? weekData[targetSlot.format("ddd")][targetSlot.format("H:00")]
        .isBookedByUser
    : false;
  const isBookingLimitReached =
    user.bookingLimit === false ? false : user.booked >= user.bookingLimit;
  return (
    <div>
      <div className="header panel__midPageHeader">
        {targetSlot.format("DD/MM") +
          " " +
          targetSlot.format("H:00") +
          " - " +
          targetSlot.add(3, "hours").format("H:00")}
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
          isBookedByMe
            ? () =>
                unBook(
                  targetMoment,
                  displayResponse,
                  user.email + targetSlot.format("DD.MM.YYYYH:00")
                )
            : isBookingLimitReached
            ? () => {}
            : () => book(targetMoment, displayResponse)
        }
        {...(isBookingLimitReached && !isBookedByMe ? { disabled: true } : {})}
      >
        {isBookedByMe ? "Unbook" : "Book"}
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
  axios
    .post(
      "/api/book/schedule",
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
const unBook = (targetMoment, displayResponse, userDateSlot) => {
  axios
    .post(
      "/api/delete/schedule",
      {
        token: document.cookie.replace("token=", ""),
        data: {
          userDateSlot: userDateSlot,
        },
      },
      {}
    )
    .then((res: any) => fireBookingViewEvent(targetMoment))
    .catch(displayResponse);
};
