import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Sample data type
interface EmojiReaction {
  userId: string;
  emoji: string;
  price: string;
}

interface EmojiReactions {
  [timestamp: string]: EmojiReaction[];
}

let emojiReactions: EmojiReactions = {
  "2024-06-24T00:00:00Z": [
    { userId: "user1", emoji: "🚀", price: "3840.00" },
    { userId: "user2", emoji: "😎", price: "3846.00" },
  ],
  "2024-06-24T01:00:00Z": [
    { userId: "user3", emoji: "😡", price: "3850.40" },
    { userId: "user4", emoji: "😭", price: "3849.35" },
  ],
};

app.post("/addReaction", (req: Request, res: Response) => {
  const {
    timestamp,
    userId,
    emoji,
    price,
  }: { timestamp: string; userId: string; emoji: string; price: string } =
    req.body;

  if (!emojiReactions[timestamp]) {
    emojiReactions[timestamp] = [];
  }

  emojiReactions[timestamp].push({ userId, emoji, price });
  res.status(200).send("Reaction added");
});

app.get("/getReactions", (req: Request, res: Response) => {
  res.json(emojiReactions);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
