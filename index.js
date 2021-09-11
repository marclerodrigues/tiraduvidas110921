const filesystem = require("fs");
const axios = require("axios");

axios
  .get("https://api.github.com/users/marclerodrigues/gists")
  .then((response) => {
    const { data } = response;
    let urls = `owner,url,files`;

    data.forEach((gist) => {
      const { url, owner: { login }, files } = gist;
      const fileNames = Object.keys(files).join(" ");

      const line = `${login},${url},${fileNames}`;

      urls = `${urls}\n${line}`
    });

    filesystem.writeFileSync("urls.csv", urls);
  });

// filesystem.writeFile("usuarios.csv", content, (err) => {
//   if (err) {
//     console.log(err.message);
//   }
// });

// try {
//   const data = filesystem.writeFileSync("usuarios.csv", content);
//   console.log(data);
// } catch (e) {
//   console.log(e.message)
// }

// filesystem
//   .createReadStream("test.txt", "utf-8")
//   .on("data", (data) => {
//     console.log(data);
//   })
//   .on("close", () => {
//     console.log("terminei de ler o arquivo")
//   });

// filesystem.readFile("test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err.message)
//   } else {
//     console.log(data);
//   }
// });

// try {
//   const data = filesystem.readFileSync("test.txt", "utf-8");
//   console.log(data);
// } catch (e) {
//   console.log(e.message)
// }
