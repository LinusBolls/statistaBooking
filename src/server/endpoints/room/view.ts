import * as validate from "../../../shared/validate";
import * as index from "../../index";
const { input } = validate;

let authToken;
index.authToken.then(res => (authToken = res));

const viewQuery = {
  token: [...input.user.token, "required"],
};
const viewRooms = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);

  if (tokenData === false) {
    res.type("json").send({
      success: false,
      reason: "Error: Missing authorization for that action",
    });
    return;
  }
  const rooms = await index.Room.find({});
  res.type("json").send({ success: true, data: rooms });
};
export { viewQuery as query, viewRooms as handler };
