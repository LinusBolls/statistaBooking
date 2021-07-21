import * as nodemailer from "nodemailer";
import * as AppOptions from "../../privateProjectConfig";

const transporter: any = nodemailer.createTransport(AppOptions.mailAuth);

async function sendMail(
  receiver: string | [string],
  subject: string,
  text: string,
  html: string
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"Statista Roombooking"`,
      to: receiver,
      subject: subject,
      text: text,
      html: html,
      headers: { "x-myheader": "test header" },
    });
    console.log(`[Server][Nodemailer] Confirmation mail sent to ${receiver}`);
    return Array.isArray(receiver)
      ? info.accepted.sort() === receiver.sort()
      : info.accepted.includes(receiver);
  } catch (e) {
    return false;
  }
}
export { sendMail };
