import { DiscountRule,  OrderItems, MENU_PRICES } from './types';

export const bundleDiscountRule: DiscountRule = {
   name: 'bundle 5% discount',
   calculate: (items: OrderItems): number => { 
      let discount = 0;
      const eligibleItems = ['Orange', 'Pink', 'Green'];

      for (const itemName in eligibleItems) {
         const quantity = items[itemName] ?? 0;
         const price = MENU_PRICES[itemName];

         if (quantity >= 2) {
            const pairs = Math.floor(quantity / 2);
            const pairedPrice = pairs * 2 * price; // 2 items * price
            discount += pairedPrice * 0.05; // 5% discount
          }

      }

      return discount;
   }
}

// multiple discount rules
export const activeDiscountRules: DiscountRule[] = [
   bundleDiscountRule,
]
