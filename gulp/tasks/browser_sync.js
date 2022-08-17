// const bs = require("browser-sync").create();

// module.exports = function browserSync() {
//   // bs.init({
//   //   server: {
//   //     baseDir: "build/",
//   //     host: "192.168.0.104",
//   //   },
//   //   callbacks: {
//   //     ready: function (err, bs) {
//   //       bs.addMiddleware("*", function (req, res) {
//   //         res.writeHead(302, {
//   //           location: "404.html",
//   //         });
//   //         res.end("Redirecting!");
//   //       });
//   //     },
//   //   },
//   //   browser: "chrome",
//   //   logPrefix: "BS-HTML:",
//   //   logLevel: "info",
//   //   logConnections: true,
//   //   logFileChanges: true,
//   //   open: true,
//   // });
//   return new Promise(async (resolve) => {
//     await bs.init({
//       server: {
//         baseDir: "dist/",
//       },
//     });
//     resolve();
//   });
// };
