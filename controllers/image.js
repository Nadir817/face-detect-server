const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "950ef6c42b944331b7d3864bb099a47c"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("unable to cnnect to api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("Unable to reach entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
