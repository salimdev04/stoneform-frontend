STONEFORM User Flow
Objective of the Flow
To clearly map how users move through the platform, from first visit → KYC → deposit →
investment → portfolio tracking → withdrawal.
This flow will help your design, frontend, and backend teams align perfectly.
Main User Roles
1. Investor (end-user)
2. Admin (internal team)
Investor User Flow
A. Landing Page: similar to World Liberty Financial
Purpose: Convert visitors into registered investors.
Actions:
View project overview, features, returns, and FAQs
Click “Get Started” or “Invest Now”
Goes to: Signup / Onboarding
B. Onboarding (Signup + KYC)
Flow:
1. Sign Up – Email, password, referral (optional)
2. Verify Email
3. KYC Process
Upload document
Add proof of address
Wait for admin approval (status: pending/verified/rejected)
4. Wallet Connection
Connect via MetaMask or WalletConnect
5. Profile Setup Complete
Goes to: Dashboard (Investor Home)
C. Dashboard (Investor Home)
Main components:
Investment summary (balance, ROI, portfolio chart, transactions)
“Invest Now” button
Notifications (KYC updates, payouts, messages)
Transactions history
Goes to: Investment Module
D. Investment Module
Options:
Choose property / project / token plan
Enter amount
Select payment method:
Crypto (via MetaMask/WalletConnect)
Fiat (via Transak)
Confirm investment → Smart contract / backend transaction executed
After success:
Transaction confirmation
“View Investment Details” link
Goes to: Portfolio section
E. Portfolio Section
Purpose: Manage active investments
Features:
Total invested, profit earned, active plans
Charts and performance indicators
“Withdraw” or “Redeem” button
Transactions history
Goes to: Transaction History
F. Transaction History
Purpose: Track all user activities
Details:
Deposits, investments, payouts, redemptions
Filter by date/type/status
Export to CSV
Goes to: Account Settings
G. Account Settings
Update personal info
Manage wallets
KYC re-verification if expired
Logout
Admin User Flow
Admin Dashboard
Sections:
1. User Management – View users, verify KYC, suspend accounts
2. Investments Overview – List of all active and completed investments
3. Transactions – Track deposits, payouts, Transak logs
4. Analytics – Graphs for ROI, growth, active investors
5. Notifications – Handle messages or alerts to users
Technical Integration Points
Step Integration Description
Signup Backend API User creation, auth (JWT)
KYC KYC Provider API Upload + verify ID
Wallet Connection MetaMask / WalletConnect Wagmi
Fiat Payment Transak API On-ramp for fiat investment
Dashboard Data Backend API Fetch user portfolio data
Transaction History Backend API CRUD and pagination
Admin Actions Secure Admin API Role-based access
Suggested User Flow Diagram (Text Version)
Landing Page
↓
Signup / Login
↓
KYC Verification
↓
Wallet Connection
↓
Investor Dashboard
├── View Portfolio
├── Invest (Crypto / Fiat)
├── Withdraw Funds
├── Transaction History
└── Account Settings
↓
Logout