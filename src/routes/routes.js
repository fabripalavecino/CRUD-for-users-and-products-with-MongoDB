const { countries, languages } = require("countries-list");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("Hello darkness");
  });

  app.get("/info", (req, res) => {
    info("Hola Info");
    res.send("info nodemon");
  });

  app.get("/country", (req, res) => {
    //console.log("req.query", req.query);
    res.send(JSON.stringify(countries[req.query.code]));
  });

  app.get("/languages/:lang", (req, res) => {
    //console.log("req.params", req.params);
    const lang = languages[req.params.lang];
    if (lang) {
      res.json({
        status: "OK",
        data: lang,
      });
    } else {
      res.status(404).json({
        status: "NOT FOUND",
        message: `Language ${req.params.lang} not found`,
      });
    }
  });

  app.get("*", (req, res) => {
    res.status(404).send("NOT FOUND");
  });
};

module.exports = routes;
