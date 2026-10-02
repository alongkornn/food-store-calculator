# Food Store Calculator Solution

ระบบคำนวณราคาร้านอาหาร (Food Store Calculator) พัฒนาด้วย **TypeScript** และทดสอบด้วย **Jest** ออกแบบโครงสร้างตามหลัก **Clean Code**, **SOLID Principles** (Open/Closed Principle) และ **Extensibility** เพื่อให้รองรับการเพิ่มเงื่อนไขส่วนลดใหม่ๆ ในอนาคตได้ง่ายโดยไม่ต้องแก้ไข Logic หลัก

---

## Tech Stack & Tools

- **Language:** TypeScript
- **Testing Framework:** Jest
- **Runtime Environment:** Node.js

---

## Architecture & Logic Design

โครงสร้างของระบบถูกออกแบบโดยแยกความรับผิดชอบ (Separated Responsibilities) ชัดเจน:

1. **`FoodCalculator` (Core Engine):**
   - คำนวณยอดรวม (`subtotal`), รวมส่วนลดรายการสินค้า (`itemDiscounts`), ส่วนลดสมาชิก (`memberDiscount`), รวมส่วนลดทั้งหมด (`totalDiscount`) และยอดสุทธิ (`netTotal`)
   - รองรับ **Dependency Injection (DI)** ในการเพิ่มส่วนลด ช่วยให้ปรับเปลี่ยนเงื่อนไขหรือทำ Unit Test ได้ง่ายและยืดหยุ่น

2. **Discount Rules Engine:**
   - **Bundle Discount (5%):** คำนวณส่วนลด 5% เฉพาะสินค้าประเภท `Orange`, `Pink`, และ `Green` เมื่อสั่งซื้อเป็นคู่ (คำนวณเฉพาะจำนวนที่เป็นคู่ เช่น 2, 4, 6, ... ชิ้น)
   - **Membership Discount (10%):** คำนวณส่วนลดสมาชิก 10% จาก **ยอดที่หักส่วนลด Bundle แล้ว** (`subtotal` - `itemDiscounts`)

---

## Directory Structure

```text
.
├── src/
│   ├── calculator.ts     # Core Calculator Class & Price Calculation Logic
│   ├── discounts.ts      # Discount Rules Logic (Bundle & Membership Rules)
│   ├── index.ts          # Entry point สำหรับรัน Demo Output
│   └── types.ts          # Type Definitions & Menu Price Data
├── tests/
│   └── calculator.test.ts # Unit Test Suites ครอบคลุมทุก Edge Cases
├── package.json          # Dependencies & Scripts
├── tsconfig.json         # TypeScript Configuration
└── README.md             # Documentation
