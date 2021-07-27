import express from "express";

const app = express();

app.use((_,res) => {
    res.status(200).send("Hello World!");
});
app.listen(3000, () => {
    console.log(`Server Started at: http://localhost:${3000}`);
});