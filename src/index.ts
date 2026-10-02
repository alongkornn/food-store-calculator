import { FoodCalculator } from "./calculator";
import { MENU_PRICES } from "./types";
const calculator = new FoodCalculator();

console.log('--- Food Store Calculator Demo ---');
console.log("=== MENU PRICES ===")
console.log(MENU_PRICES);

const order1 = { Orange: 5 };
const result1 = calculator.calculate(order1);
console.log('\nOrder 1 (Orange 5 ชิ้น):');
console.log("=== รายการที่เลือก ===")
console.log(order1);
console.log(result1);

const order2 = {
  Red: 1,     // 50
  Green: 2,   // 80  (คู่ ลด 5% = 4)
  Pink: 2,    // 160 (คู่ ลด 5% = 8)
};
const result2 = calculator.calculate(order2, { hasMembership: true });
console.log('\nOrder 2 (มีบัตรสมาชิก):');
console.log("=== รายการที่เลือก ===")
console.log(order2);
console.log(result2);
