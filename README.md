# 📱 Stamp & Coupon Accumulation System

A simple customer self-service stamp & coupon accumulation system based on phone numbers. Built with **Next.js**, **Prisma**, and **PostgreSQL**.

---

## ✅ Features

- 📲 Customers input their phone number to accumulate stamps
- ✅ 1 stamp per submission
- 🔁 When stamps reach N (configurable), 1 coupon is issued and stamps reset
- ⏳ Coupons have expiration dates
- 📋 Customers can check their stamp and coupon status
- 🛠️ Stamp threshold and coupon expiration period are configurable via environment variables

---

## 🧱 Tech Stack

- **Frontend**: Next.js
- **Backend**: API Routes (Next.js)
- **ORM**: Prisma
- **Database**: PostgreSQL

---

## 📂 Folder Structure

```
├── pages
│   ├── index.tsx              # Stamp accumulation UI
│   ├── details.tsx            # Customer details UI
│   └── api
│       ├── customer
│           ├── accumulate.ts  # API: Accumulate stamp
│           └── details.ts     # API: Customer detail
├── prisma
│   └── schema.prisma          # Prisma DB schema
├── lib
│   └── prisma.ts              # Prisma client instance
├── .env                       # Environment variables
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
MAX_STAMPS=10
COUPON_EXPIRY_DAYS=30
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
yarn install

# 2. Set up Prisma
npx prisma generate
npx prisma migrate dev --name init

# 3. Run development server
yarn dev

# 4. Open in browser
http://localhost:3000
```

---

## 🧪 Test Scenarios

### ✅ Accumulate Stamp

1. Enter a valid phone number (e.g. 010-1234-5678)
2. Submit -> stamp count increases by 1
3. After N stamps -> stamps reset, coupon is added

### 🔍 View Customer Details

1. Visit `/customer`
2. Enter phone number
3. See:
   - Current stamp count
   - First accumulation date
   - List of coupons with expiration dates   

---

## 📌 Notes

- No admin or store interface is provided
- Customer entries are auto-created if not existing during accumulation