const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.send('Test API running..')
})

app.use(require("./GetAllPostFromUserID"));
app.use(require("./GetPostFromPostID"));
app.use(require("./GetAdoptFromAdoptID"));
app.use(require("./GetAdopterFromPostID"));
app.use(require("./GetAnswer"));
app.use(require("./EditPostStatus"));
app.use(require("./EditAdoptStatus"));
app.use(require("./AddNewPost"));
app.use(require("./GetQuestionFromPostID"));
app.use(require("./SubmitAnswer"));
app.use(require("./Search"));
app.use(require("./GetPost"));
app.use(require("./LogIn"));
app.use(require("./Register"));
app.use(require("./CheckEmail"));
app.use(require("./GetUser"));
app.use(require("./GetAdopterContact"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});