export const MENU_PRICES: Record < string, number> = {
   Red: 50,
   Green: 40,
   Blue: 30,
   Yellow: 50,
   Pink: 80,
   Purple: 90,
   Orange: 120,
}

export type OrderItems = Record<string, number>;

export interface CalculationOptions { 
   hasMembership?: boolean;
};

export interface DiscountRule {
   name: string;
   calculate: (items: OrderItems) => number;
}
