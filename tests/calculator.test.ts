import { FoodCalculator } from "../src/calculator";

describe("FoodCalculator", () => {
  let calculator: FoodCalculator;

  beforeEach(() => {
    calculator = new FoodCalculator();
  });

  it("1. calculate without discount", () => {
    const items = { Red: 1, Blue: 1 }; // 50 + 30 = 80
    const result = calculator.calculate(items);

    expect(result.subtotal).toBe(80);
    expect(result.totalDiscount).toBe(0);
    expect(result.netTotal).toBe(80);
  });

  it("2. calculate membership discount", () => {
    const items = { Red: 2 }; // 50 * 2 = 100 -> ลด 10 บาท
    const result = calculator.calculate(items, { hasMembership: true });

    expect(result.subtotal).toBe(100);
    expect(result.memberDiscount).toBe(10);
    expect(result.netTotal).toBe(90);
  });

  it("3. calculate discount for pairs", () => {
    // Orange = 120. 5 ชิ้น = 600

    // คิดส่วนลดเฉพาะ 2 คู่ (4 ชิ้น = 480) -> ลด 5% = 24
    const items = { Orange: 5 };
    const result = calculator.calculate(items);

    expect(result.subtotal).toBe(600);
    expect(result.itemDiscounts).toBe(24);
    expect(result.netTotal).toBe(576);
  });

  it("4. คำนวณทั้งส่วนลด Bundle และบัตรสมาชิกพร้อมกัน", () => {
    const items = { Green: 2, Red: 1 };
    const result = calculator.calculate(items, { hasMembership: true });

    expect(result.subtotal).toBe(130);
    expect(result.itemDiscounts).toBe(4);
    expect(result.memberDiscount).toBe(12.6);
    expect(result.netTotal).toBe(113.4);
  });

  it("5. สั่งซื้อ 0 ชิ้น", () => {
    const result = calculator.calculate({});
    expect(result.netTotal).toBe(0);
  });
});
