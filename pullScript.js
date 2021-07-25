const { exec } = require("child_process");

const machen = (
  cmd,
  successStr = false,
  failStr = false,
  exitReturnValue = false
) =>
  new Promise((resolve, _) => {
    const proc = exec(cmd, (err, stdout, stderr) => {
      if (err) throw err;
      if (stderr) console.error(stderr);
      if (successStr && stdout.includes(successStr)) resolve(proc);
      else if (failStr && stdout.includes(failStr)) resolve(false);
    });
    proc.on("exit", _ => resolve(exitReturnValue));
  });
async function main(dieSache) {
  const isUpdateable = await machen("git status -uno --porcelain", " ");
  if (!isUpdateable) return setTimeout(main, 60000, dieSache);
  console.log("Update detected, killing app");
  const startTime = Date.now();
  dieSache.kill("SIGINT");
  await machen("git pull");
  console.log("Building app...");
  dieSache = await machen("npm run-script buildProd", "[Server][Express]");
  console.log(`App online again after ${(Date.now() - startTime) / 1000}s`);
  setTimeout(main, 60000, dieSache);
}
/*
const ding = exec("npm run-script buildProd", (err, stdout, stderr) => {
  console.log("moin");
  if (err) throw err;
  if (stderr) console.error(stderr);
  console.log(stdout);
  if (stdout.includes("[Server][Express]")) main(ding);
});
*/
const machen = (
  cmd,
  successStr = false,
  failStr = false,
  exitReturnValue = false
) =>
  new Promise((resolve, _) => {
    const args = cmd.split(" ");
    const proc = spawn(args.shift(), args);
    proc.stdout.on("data", data => {
      console.log("stdout: " + data.toString());
      if (successStr && stdout.includes(successStr)) resolve(proc);
      else if (failStr && stdout.includes(failStr)) resolve(false);
    });
    proc.stderr.on("data", data => {
      console.log("stderr: " + data.toString());
    });
    proc.on("exit", _ => resolve(exitReturnValue));
  });
