# Sri Lanka Inland Revenue Department (IRD) — Citizen Portal 2.0

A modern, human-centered redesign of the Sri Lanka IRD Personal Income Tax (PIT) payment experience.

---

## The Core Problem Solved

Paying personal income tax in Sri Lanka has historically been a confusing, frustrating experience for everyday citizens. 

The existing government portal exposes internal database terminology directly to the public: taxpayers are required to know obscure codes like **Tax Type `05`**, five-digit period numbers like **`24030`**, and manually generate an isolated **Document Identification Number (DIN)** before heading to an external bank portal. Furthermore, there is zero in-portal calculation support, forcing citizens to calculate progressive tax slabs (6% to 36%), relief allowances, and employer APIT deductions on separate spreadsheets.

This redesign transforms that fragmented process into a simple, guided 3-minute workflow.

---

## Before vs. After

| Step / Feature | Before (Legacy RAMIS Portal) | After (Citizen Portal 2.0) |
| :--- | :--- | :--- |
| **Tax Period Selection** | Requires memorizing 5-digit codes (e.g. `24030`) and tax type `05`. | Plain-English selection (*"Q3: Oct – Dec 2024"*); codes are mapped automatically in the background. |
| **Tax Liability** | Zero in-flow computation; citizens must calculate brackets and allowances offline. | Real-time estimator that auto-deducts the LKR 1.2M tax-free relief, applies 6%–36% slabs, and credits employer APIT. |
| **Payment Voucher (DIN)** | Disconnected manual form; users had to copy codes and leave the website. | DIN is generated automatically with 1-click copy, scannable barcode, and direct checkout integration. |
| **Payment Channels** | No direct payment; users had to leave the site and navigate banking apps manually. | Multi-channel checkout: direct card payment via **LankaPay**, mobile scan via **LankaQR**, or a clean printable bank slip for BOC / People's Bank. |
| **Payment Proof** | No immediate confirmation; payments take days to reflect on ledgers. | Instant verifiable digital certificate with a scannable QR verification seal and download/print action. |
| **Interface & Legibility** | Dense 2008 table layouts, tiny fonts, and non-responsive English legalese. | Clean, mobile-friendly interface built with soft pastels, clear typography, and generous spacing. |

---

## What It Added

1. **3-Step Express Payment Flow:**
   - **Step 1:** Select quarter and year in simple words.
   - **Step 2:** Estimate tax liability or enter a custom amount.
   - **Step 3:** Choose your preferred payment method (LankaPay, LankaQR, or Bank Deposit Slip).

2. **In-Flow Sri Lanka Tax Engine:**
   - Incorporates statutory tax brackets (6% to 36%) under the Inland Revenue Act No. 24 of 2017.
   - Automatically factors in the standard **LKR 1,200,000 annual tax-free relief threshold**.
   - Lets salaried and freelance taxpayers deduct **APIT (Advance Personal Income Tax)** already withheld at source.

3. **Multi-Channel Checkout Handshake:**
   - **LankaPay Gateway:** Instant credit/debit card checkout.
   - **LankaQR Scan:** Scannable via any Sri Lankan mobile banking app (Commercial Bank Flash, Sampath WePay, BOC SmartPay, FriMi, Genie).
   - **Official Printable Bank Slip:** Formatted for Bank of Ceylon and People's Bank counter deposits with authentic barcodes and customer copies.
   - **Internet Banking Guide:** 1-click copy buttons for Payee Name, TIN, DIN, and Period Code.

4. **Citizen Dashboard & Compliance Record:**
   - Real-time tax compliance status badge.
   - Countdown to upcoming quarterly deadlines.
   - Complete audit trail of past payments with 1-click verifiable receipt reprints.

5. **Standalone DIN Generator:**
   - Quick tool for citizens or accountants who only need an official DIN reference for physical branch deposits.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

```bash
# Production build
npm run build
npm run preview
```
