import {
  DiscountRule,
  OrderItems,
  CalculationOptions,
  MENU_PRICES,
} from "./types";
import { activeDiscountRules } from "./discount";

export class FoodCalculator {
  private discountRules: DiscountRule[];

  constructor(rules: DiscountRule[] = activeDiscountRules) {
    this.discountRules = rules;
  }

  public calculate(items: OrderItems, options: CalculationOptions = {}) {
    this.validateItems(items);

    const subtotal = this.calculateSubtotal(items);

    let itemDiscounts = 0;
    for (const rule of this.discountRules) {
      itemDiscounts += rule.calculate(items);
    }

    const priceAfterItemDiscounts = subtotal - itemDiscounts;
    let memberDiscount = 0;
    if (options.hasMembership && priceAfterItemDiscounts > 0) {
      memberDiscount = priceAfterItemDiscounts * 0.1;
    }

    const totalDiscount = itemDiscounts + memberDiscount;
    const netTotal = subtotal - totalDiscount;

    return {
      subtotal: this.round(subtotal),
      itemDiscounts: this.round(itemDiscounts),
      memberDiscount: this.round(memberDiscount),
      totalDiscount: this.round(totalDiscount),
      netTotal: this.round(netTotal),
    };
  }

  private validateItems(items: OrderItems): void {
    for (const [itemName, quantity] of Object.entries(items)) {
      if (quantity < 0) {
        throw new Error(`Invalid quantity for ${itemName}`);
      }
    }
  }

  private calculateSubtotal(items: OrderItems): number {
    let sum = 0;
    for (const [itemName, quantity] of Object.entries(items)) {
      if (quantity > 0) {
        sum += (MENU_PRICES[itemName] ?? 0) * quantity;
      }
    }
    return sum;
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
