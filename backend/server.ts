import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Sample data type
interface EmojiReaction {
  userId: string;
  emoji: string;
}

interface EmojiReactions {
  [timestamp: string]: EmojiReaction[];
}

// Sample data
let emojiReactions: EmojiReactions = {
  "2024-06-24T00:00:00Z": [
    { "userId": "user1", "emoji": "🚀" },
    { "userId": "user2", "emoji": "😎" }
  ],
  "2024-06-24T01:00:00Z": [
    { "userId": "user3", "emoji": "😡" },
    { "userId": "user4", "emoji": "😭" }
  ]
};

app.post('/addReaction', (req: Request, res: Response) => {
  const { timestamp, userId, emoji }: { timestamp: string; userId: string; emoji: string } = req.body;

  if (!emojiReactions[timestamp]) {
    emojiReactions[timestamp] = [];
  }

  emojiReactions[timestamp].push({ userId, emoji });
  res.status(200).send('Reaction added');
});

app.get('/getReactions', (req: Request, res: Response) => {
  res.json(emojiReactions);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
