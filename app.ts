import express from "express";

import { notAstar } from "./scripts/notastar";
import { Position } from "./scripts/types";
import { map } from "./scripts/map";

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.static("public"));

for (const i in [...Array(100)]) {
  const temp: boolean[] = [];
  for (const j in [...Array(100)]) temp.push(false);
  map.push(temp);
}

app.post(
  "/api/notNotAstar",
  async function (req: express.Request, res: express.Response) {
    console.log(req.body);
    const type = req.body.type;
    const data: Position[] = req.body.data;

    const resData: { type: string; data: Position[][] } = {
      type: "takatomo",
      data: [],
    };

    const len = data.length - 1;
    if (len) {
      for (let i = 0; i < len; i++) {
        const t: Position[] = [];
        let p = data[i];
        while (p.lat !== data[i + 1].lat || p.lng !== data[i + 1].lng) {
          p = await notAstar(p, data[i + 1]);
          t.push(p);
        }
        resData.data.push(t);
      }
    }
    res.json(resData);
  }
);

app.post("/api/test", function (req: express.Request, res: express.Response) {
  console.log(req.body);
  res.json({ hoge: "hoge" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
