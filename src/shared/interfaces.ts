import { Schema, Document } from "mongoose";

const isStrLen = (str: string, min: number, max: number): Boolean =>
  str.length >= min && str.length <= max;

enum jobType {
  Developer,
  Management,
  Designer,
}
enum timeslot {
  "6:00",
  "9:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
}
enum seniority {
  Junior,
  Senior,
}
interface IServerResponse {
  success: boolean;
  reason?: string;
  data?: object | string;
}
interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password?: String;
  hash?: String;
  isAdmin: Boolean;
  personalInfo?: String;
  confirmationLink?: String;
  isConfirmed: Boolean;
  jobType: String;
  seniority: String;
  isSelfCreated: Boolean;
  bookingLimit: Number | Boolean;
  booked: Number;
}
const userSchema = new Schema({
  isSelfCreated: Boolean,
  firstName: {
    type: String,
    required: true,
    validate: (s: string) => isStrLen(s, 1, 99),
  },
  lastName: {
    type: String,
    required: true,
    validate: (s: string) => isStrLen(s, 1, 99),
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
    validate: (s: string) => isStrLen(s, 1, 99) && s.includes("@"),
  },
  password: { type: String, required: false },
  hash: { type: String, required: false },
  isAdmin: Boolean,
  isConfirmed: Boolean,
  personalInfo: {
    type: String,
    required: false,
    default: "Hi, I'm using Statista Booking!",
    validate: (s: string) => isStrLen(s, 0, 999),
  },
  jobType: { type: String, enum: jobType, required: false },
  seniority: { type: String, enum: seniority, required: false },
  bookingLimit: { type: Schema.Types.Mixed, required: true },
  booked: { type: Number, required: true, default: 0 },
});
interface IRoom extends Document {
  floor: number;
  title: string;
  description: string;
  workstations: number;
}
const roomSchema = new Schema({
  floor: { type: Number, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  workstations: { type: Number, required: true },
});
interface ISchedule extends Document {
  date: string;
  slot: string;
  user: string;
  room: string;
  userDateSlot: string;
}
const scheduleSchema = new Schema({
  date: { type: String, required: true },
  slot: { type: String, required: true },
  user: { type: String, required: false },
  room: { type: String, required: true },
  userDateSlot: { type: String, required: true, unique: true },
});
export {
  IServerResponse,
  IUser,
  userSchema,
  IRoom,
  roomSchema,
  ISchedule,
  scheduleSchema,
  seniority,
  jobType,
  timeslot,
};
