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
(async function main(dieSache) {
  const isUpToDate = await machen("git status -uno --porcelain", " ");
  if (isUpToDate) return setTimeout(main, 60000, dieSache);
  console.log("Update detected, killing app");
  const startTime = Date.now();
  dieSache.kill("SIGINT");
  await machen("git pull");
  dieSache = await machen("npm run-script buildProd", "[Server][Express]");
  console.log(`App online again after ${(Date.now() - startTime) / 1000}s`);
  setTimeout(main, 60000, dieSache);
})(exec("npm run-script buildProd"));
