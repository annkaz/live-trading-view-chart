import confetti from "canvas-confetti";
import { useRef } from "react";

const buySound = new Audio("Ping.mp3");

type TradeActionButtonProps = {
  isLong: boolean;
};

const TradeActionButton: React.FC<TradeActionButtonProps> = ({ isLong }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triangle = confetti.shapeFromPath({ path: "M0 10 L5 0 L10 10z" });

  const handleBuyClick = () => {
    buySound.currentTime = 0;
    buySound.play();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      confetti({
        particleCount: 400,
        spread: 100,
        colors: ["#4BC2A3"],
        shapes: [triangle],
        scalar: 2.5,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`w-full ${
        isLong ? "bg-teal" : "bg-red"
      } text-black py-2 rounded-sm`}
      onClick={handleBuyClick}
    >
      {isLong ? "BUY / LONG" : "SELL / SHORT"}
    </button>
  );
};

export default TradeActionButton;
