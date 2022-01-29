/*  GET Homepage    */

const index = (req, res) => {
  //index was spelled indes
  res.render("index", { title: "Travlr Getaways" });
};

module.exports = {
  index, //There was a semicolon instead of a comma here
};
