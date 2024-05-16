module.exports = function (wss) {
  const express = require("express");
  const Status = require("../model/status.model");

  const app = express();

  app.post("/set_status", async (req, res) => {
    const { user_Id, status, } = req.body;

    if (!user_Id || !status ) {
      return res.status(400).json({ error: "Invalid Body" });
    }

    try {
      const setStatus = await Status.create({
        user_Id: user_Id,
        status: status,
        date_and_time: new Date(),
      });

      if (setStatus) {
        wss.clients.forEach(client =>{
            if(client.readyState === client.OPEN){
                client.send(JSON.stringify(setStatus));
            }
        });
      }

      const { createdAt, updatedAt, ...data } = await setStatus.toJSON();

      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred." });
    }
  });

  app.get("/latest_status/", async(req, res)=>{
    
  })

  return app;
};
