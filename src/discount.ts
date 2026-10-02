import { DiscountRule, MENU_PRICES, OrderItems } from "./types";

export const bundleDiscountRule: DiscountRule = {
  name: "Bundle 5% Discount for pairs",
  calculate: (items: OrderItems): number => {
    const eligibleItems = ["Orange", "Pink", "Green"];
    let discount = 0;

    for (const itemName of eligibleItems) {
      const quantity = items[itemName] ?? 0;
      const price = MENU_PRICES[itemName];

      if (quantity >= 2) {
        const pairs = Math.floor(quantity / 2);
        const pairedPrice = pairs * 2 * price; // 2 items * price
        discount += pairedPrice * 0.05; // 5% discount
      }
    }
    return discount;
  },
};

export const activeDiscountRules: DiscountRule[] = [
   bundleDiscountRule,
]
