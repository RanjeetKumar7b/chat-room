const express=require("express");
const cors=require("cors"); 
const StreamChat = require('stream-chat').StreamChat;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
const dbConfig= require( "./db.js");

app.use(cors(
  {
    origin: ["https://chat-room-bubt.vercel.app"],
    methods: ["POST","GET"],
    credentials:true
  }
));

app.use(express.json());
mongoose.connect('mongodb+srv://rk2505152:user123@cluster0.xvscmpg.mongodb.net/taskdb');
app.get("/",(req,res) =>{
  res.json("hello");
})
const TodoItemRoute = require('./routes/todoItems');

app.use('/', TodoItemRoute);
const api_key = "y8acfkfyrdat";
const api_secret = 
  "cz92md8kp9r7enez99ycfrcbzubscgkqnrmmacv2cpaypzc7ed5jv75asdyp9nnk";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
