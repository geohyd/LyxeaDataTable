import { sum2 } from "../src/index";

function sum(b: number) {
  const res = sum2(2, 3);

  return res + b;
}

export default sum;
