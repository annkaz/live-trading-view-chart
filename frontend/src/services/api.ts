const API_URL = "http://localhost:3001";

export type EmojiReaction = {
  userId: string;
  emoji: string;
  price: number;
};

export type EmojiReactions = {
  [timestamp: string]: EmojiReaction[];
};

export const fetchReactions = async (): Promise<EmojiReactions> => {
  try {
    const response = await fetch(`${API_URL}/getReactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch emoji reactions");
    }

    const data: EmojiReactions = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const addReaction = async ({
  timestamp,
  userId,
  emoji,
  price,
}: {
  timestamp: string;
  userId: string;
  emoji: string;
  price: number;
}): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/addReaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp, userId, emoji, price }),
    });

    if (!response.ok) {
      throw new Error("Failed to add emoji reaction");
    }
  } catch (error) {
    throw error;
  }
};
