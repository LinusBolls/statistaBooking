import { IUser } from "../shared/interfaces";

const Event = {
  LOGIN: "login",
  BREAKPOINT_TRIGGER: "breakpointTrigger",
  USERINFO_UPDATE: "userinfoUpdate",
  BOOKING_VIEW: "bookingView",
};
interface loginEvent {
  token: string;
  isFirstLogin: boolean;
  userInfo: Partial<IUser>;
}
const fireLoginEvent = (user: any) => {
  window.dispatchEvent(
    new CustomEvent(Event.LOGIN, {
      detail: JSON.stringify(user),
    })
  );
};
const fireBookingViewEvent = (targetMoment: string | null) =>
  window.dispatchEvent(
    new CustomEvent(Event.BOOKING_VIEW, {
      detail: targetMoment,
    })
  );
const fireUserinfoUpdateEvent = (userInfo: any) => {
  window.dispatchEvent(
    new CustomEvent(Event.USERINFO_UPDATE, {
      detail: JSON.stringify(userInfo),
    })
  );
};
const logout = () => fireLoginEvent(null);

const getScreenType = (): number => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  switch (true) {
    case width > 1200:
      return 1200;
    case width > 1000:
      return 800;
    case width > 600:
      return 600;
    default:
      return 0;
  }
};
let screenType = getScreenType();

window.onresize = () => {
  const newScreenType = getScreenType();

  if (newScreenType === screenType) return;

  screenType = newScreenType;
  window.dispatchEvent(
    new CustomEvent(Event.BREAKPOINT_TRIGGER, { detail: newScreenType })
  );
};
const newBreakpointListener = (): [number, Function] => {
  return [
    screenType,
    (handler: Function) =>
      window.addEventListener(Event.BREAKPOINT_TRIGGER, ((e: CustomEvent) =>
        handler(e.detail)) as EventListener),
  ];
};
export {
  Event,
  loginEvent,
  fireLoginEvent,
  logout,
  newBreakpointListener,
  fireBookingViewEvent,
  fireUserinfoUpdateEvent,
};
