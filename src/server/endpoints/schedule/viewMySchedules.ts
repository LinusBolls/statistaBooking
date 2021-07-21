import * as validate from "../../../shared/validate";
import * as index from "../../index";
const { input } = validate;

let authToken;
index.authToken.then(res => (authToken = res));

const requestQuery = {
  token: [...input.user.token, "required"],
};
const viewMySchedules = async (req: any, res: any) => {
  const tokenData = authToken.auth(req.body.token);

  if (tokenData === false) {
    res.type("json").send({
      success: false,
      reason: "Error: Missing authorization for that action",
    });
    return;
  }
  const schedules = await index.Schedule.find({ user: tokenData.email });
  res.type("json").send({ success: true, data: schedules });
};
export { requestQuery as query, viewMySchedules as handler };
