import { useState } from "react";

export const useRating = () => {
  const [rating, setRating] = useState(0);
  const [hasIncreased, setHasIncreased] = useState(false);
  const [hasDecreased, setHasDecreased] = useState(false);

  const increaseRating = () => {
    if (!hasIncreased) {
      setRating((prev) => prev + 1);
      setHasIncreased(true);
    }
  };

  const decreaseRating = () => {
    if (!hasDecreased) {
      setRating((prev) => Math.max(prev - 1, 0)); // Ensure rating doesn't go below 0
      setHasDecreased(true);
    }
  };

  // Reset the flags when the component unmounts or when you want to allow changes again
  const resetFlags = () => {
    setHasIncreased(false);
    setHasDecreased(false);
  };

  return { increaseRating, decreaseRating, rating, resetFlags };
};
