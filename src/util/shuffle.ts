import { FixedLengthArray } from "../types";

export default <T, A extends number>(array: T[], amount: A): FixedLengthArray<T, A> => {
  if (amount > array.length) {
    throw new RangeError("Amount cannot be larger than array length");
  }

  const remaining = array.slice();
  const result: T[] = [];

  for (let i = 0; i < amount; i++) {
    // Safe index - Math.random() is *never* 1
    const randomIndex = Math.floor(Math.random() * remaining.length);
    result.push(remaining[randomIndex]);
    remaining.splice(randomIndex, 1);
  }

  return result as FixedLengthArray<T, A>;
};
