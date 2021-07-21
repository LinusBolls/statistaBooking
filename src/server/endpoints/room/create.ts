import * as validate from "../../../shared/validate";
import * as index from "../../index";
const { input } = validate;

let authToken;
index.authToken.then(res => (authToken = res));

const createQuery = {
  token: [...input.user.token, "required"],
  data: {
    floor: input.room.floor,
    title: [...input.room.title, "required"],
    description: input.room.description,
    workstations: [...input.room.workstations, "required"],
  },
};
const createRoom = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);
  const newRoom: any = new index.Room(req.body.data);

  if (tokenData === false || tokenData.isAdmin === false) {
    res.type("json").send({
      success: false,
      reason: "Error: Missing authorization for that action",
    });
    return;
  }
  try {
    await newRoom.save();
  } catch (e) {
    res
      .type("json")
      .send({ success: false, reason: "Error saving room: " + e });
    return;
  }
  return res.type("json").send({ success: true });
};
export { createQuery as query, createRoom as handler };
