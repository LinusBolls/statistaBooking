"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var CustomLinks_1 = require("../components/CustomLinks");
function MailConfirmPage() {
    var token = react_router_dom_1.useParams().token;
    var data = token.split("||");
    var ding = {
        token: data[0],
        isFirstLogin: true,
        userInfo: JSON.parse(decodeURIComponent(data[1]))
    };
    //fireLoginEvent("Moin");
    /*
    useEffect(() => {
      const { token } = useParams() as any;
      const data = token.split("||");
      fireLoginEvent({
        token: data[0],
        isFirstLogin: true,
        userInfo: JSON.parse(decodeURIComponent(data[1])),
      });
    }, []);
    */
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Success!"),
        react_1["default"].createElement("p", null, "Your account has been activated."),
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", component: CustomLinks_1.LinkButtonText }, "Log in")));
}
exports["default"] = MailConfirmPage;
