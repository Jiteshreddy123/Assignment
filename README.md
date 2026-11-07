# IRD Sri Lanka - Citizen Tax Portal 2.0 (UX Redesign)

> **Submission for the IT/Tech Internship UX Assessment:** Redesigning the Sri Lanka Inland Revenue Department (IRD) e-Services portal to simplify the Personal Income Tax (PIT) payment and management process.

---

## 🎯 The Usability Challenge

When paying personal income tax in Sri Lanka, taxpayers encounter significant digital friction:
1. **Exposing backend database schemas to citizens:** The legacy RAMIS portal requires citizens to know internal codes like Tax Type `05`, obscure period numbers (`24030`), and payment types (`01`).
2. **Disconnected Payment Voucher (DIN) generation:** Generating a Document Identification Number (DIN) is separated from actual payment, forcing citizens to leave the site and manually handle external bank portals.
3. **No in-line tax calculation:** Taxpayers must compute progressive tax brackets (6% to 36%), relief thresholds (LKR 1,200,000), and employer APIT credits on their own.
4. **Delayed feedback:** Payments take days to reflect in RAMIS ledgers, with no immediate downloadable proof or digital verification.

---

## 💡 The Solution: Citizen Portal 2.0

This prototype provides an intuitive, accessible experience designed with a soft pastel palette, clean typography, and a human-centered workflow:

* **3-Step Personal Income Tax Flow:**
  * **Step 1 (Tax Period):** Choose your quarter in plain language (*"Q3: Oct – Dec 2024"*). Period and tax codes are mapped automatically in the background.
  * **Step 2 (Built-in Tax Estimator):** Automatically deducts the statutory LKR 1.2M tax-free allowance, computes tax slabs in real time, and subtracts employer APIT already paid.
  * **Step 3 (DIN Generation & Checkout):** Automatically generates the DIN voucher and supports instant card checkout via LankaPay, mobile banking scan via LankaQR, or a clean printable bank slip for BOC and People's Bank branches.
* **Citizen Overview Dashboard:**
  * Clean status cards for tax compliance, upcoming deadlines, and credited APIT.
  * Audit trail of past payments with 1-click verifiable receipts.
* **Trilingual & Accessible:**
  * Toggle between English, Sinhala (සිංහල), and Tamil (தமிழ்).
  * Styled with clear Plus Jakarta Sans typography and gentle pastel accents.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📝 Comment Draft for Assessment Submission

```markdown
Hi everyone, here is my solution for the IRD e-Services usability assessment:

When navigating personal income tax in Sri Lanka, the core issue isn't that tax calculation itself is impossible—it's that the portal forces citizens to understand the department's internal database structure. Having to figure out that Personal Income Tax is 'Tax Type 05', that a specific quarter is 'Period 24030', or how to manually generate an isolated DIN code creates unnecessary friction for everyday people.

Here is how I approached the redesign:

1. Plain-Language 3-Step Payment Flow
Instead of asking citizens for technical tax codes and period numbers, the interface lets users pick their quarter in simple terms (e.g., 'Oct – Dec 2024'). All backend RAMIS codes are mapped automatically.

2. In-Flow Tax Estimator
Rather than expecting taxpayers to compute their liability on separate spreadsheets, the portal includes a built-in estimator. It automatically factors in the statutory LKR 1,200,000 tax-free relief, calculates the progressive tax brackets (6% to 36%), and subtracts employer APIT deductions already paid.

3. Seamless DIN & Checkout Handshake
The Document Identification Number (DIN) is generated automatically within the flow. Users can pay directly via LankaPay, scan via LankaQR from their banking app (Commercial Bank Flash, Sampath WePay, BOC SmartPay), or generate a clean, printable official bank deposit slip for branch visits.

4. Verifiable Digital Receipts & Overview
Provides an immediate electronic payment certificate with a digital verification QR code, giving citizens instant peace of mind and an ongoing compliance record.

5. Accessibility & Multilingual Design
Clean, responsive layout with support for English, Sinhala, and Tamil, designed with high contrast and readable typography.

I've put together an interactive working prototype demonstrating this complete flow. Looking forward to your thoughts!
```
