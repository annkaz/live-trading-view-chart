import React from "react";

const EmojiSidebar = ({
  onDragStart,
}: {
  onDragStart: (e: React.DragEvent, emoji: string) => void;
}) => {
  const emojis = ["🚀", "😢", "😡", "😲", "👍", "👎"];

  return (
    <div className="inline-flex bg-resinBlack text-center py-2 px-4 gap-4 rounded-full w-fit">
      {emojis.map((emoji) => (
        <div
          key={emoji}
          draggable
          onDragStart={(e) => onDragStart(e, emoji)}
          className="cursor-grab text-2xl"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default EmojiSidebar;
