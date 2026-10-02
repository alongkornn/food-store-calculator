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
```

---

## Step-by-Step Guide: How to Install & Run

### 1. การติดตั้งโปรเจกต์ (Installation)

เปิด Terminal ใน Directory ของโปรเจกต์ แล้วรันคำสั่งติดตั้ง Dependencies ทั้งหมด:

npm install

---

### 2. วิธีการสั่งรันโปรแกรม Demo (Run Application)

หากต้องการทดลองรันระบบและดูผลลัพธ์การคำนวณราคาใน Terminal (ไฟล์ `src/index.ts`) ให้ใช้คำสั่ง:

npm start

**ผลลัพธ์ที่จะแสดงบนหน้าจอ (Sample Output):**

--- Food Store Calculator Demo ---
=== MENU PRICES ===
{
  Red: 50,
  Green: 40,
  Blue: 30,
  Yellow: 50,
  Pink: 80,
  Purple: 90,
  Orange: 120
}

Order 1 (Orange 5 ชิ้น):
=== รายการที่เลือก ===
{ Orange: 5 }
{
  subtotal: 600,
  itemDiscounts: 24,
  memberDiscount: 0,
  totalDiscount: 24,
  netTotal: 576
}

Order 2 (มีบัตรสมาชิก):
=== รายการที่เลือก ===
{ Red: 1, Green: 2, Pink: 2 }
{
  subtotal: 290,
  itemDiscounts: 12,
  memberDiscount: 27.8,
  totalDiscount: 39.8,
  netTotal: 250.2
}

---

## How to Run Tests

โปรเจกต์นี้เขียน Unit Tests ด้วย **Jest** ครอบคลุมการทดสอบทั้งหมด 5 Test Cases:
- **Case 1:** คำนวณราคาปกติแบบไม่มีส่วนลด
- **Case 2:** คำนวณส่วนลดบัตรสมาชิก 10%
- **Case 3:** คำนวณส่วนลด Bundle 5% เฉพาะคู่ (เช่น Orange 5 ชิ้น คิดลดเฉพาะ 4 ชิ้น = 24 บาท)
- **Case 4:** คำนวณส่วนลด Bundle และบัตรสมาชิกพร้อมกัน
- **Case 5:** การสั่งซื้อ 0 ชิ้น (Edge Case)

### คำสั่งสำหรับรัน Test แต่ละแบบ:

1. **รัน Test ทั้งหมดแบบปกติ:**  
   npm test

2. **รัน Test แบบแสดงรายละเอียดชื่อข้อทั้งหมด (Verbose Mode):**  
   npx jest --verbose

3. **รัน Test พร้อมแสดงรายงานความครอบคลุมของโค้ด (Test Coverage):**  
   npx jest --coverage

---
