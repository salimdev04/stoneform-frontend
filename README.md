Token Launch Implementation Plan
Core Components Overview
1- Token Contract
An ERC-20 token implemented using audited, industry-standard OpenZeppelin contracts.
2- Presale Contract
A dedicated smart contract managing a six-phase presale, with distinct pricing, allocation
limits, and durations for each phase.
2- Multisignature Wallet (Treasury / Distributor)
Acts as the central treasury of the protocol. It receives the full token supply at
deployment and manages all token distributions, including presale allocations, vesting
streams, liquidity provisioning, and ecosystem allocations.
3- Vesting Infrastructure (Sablier)
Utilizes Sablier as the canonical vesting solution to manage token vesting for presale
participants, team members, and advisors.
4- Frontend Application
Provides the user interface for presale participation (pre-TGE) and vesting/claim
management (post-TGE).
1. Token Contract
ERC-20 token implemented using audited OpenZeppelin standards
Total token supply minted at deployment
100% of the supply is immediately transferred to a Safe Multisig Wallet controlled by the
core team
2. Multisignature Wallet (Treasury / Distributor)
Serves as the central treasury managing the entire token supply
Responsible for:
Funding presale token allocations
Funding vesting streams for team members, advisors, contributors, and presale
participants
Liquidity provisioning and ecosystem allocations
May also act as the recipient of funds collected during the presale
Secured through multi-signature approval
Implemented using Safe (formerly Gnosis Safe) as an institutional-grade multisig solution
3. Presale Contract
Multi-tier presale contract managing all six sale phases
Each phase includes:
Phase-specific token pricing
Allocation caps
Defined sale durations
Presale token allocations are funded directly by the Multisig Wallet
At the claim date, a Sablier vesting stream is created for each participant, handling token
release and vesting on a per-user basis
Supports payments in BNB and approved stablecoins
4. Vesting Infrastructure (Sablier)
Sablier is used as the canonical, battle-tested vesting solution
Responsible for:
Presale participant vesting
Team and advisor vesting
Each beneficiary receives an individual vesting stream
Eliminates the need for custom vesting logic, reducing protocol complexity and risk
5. Frontend Application
Pre-TGE Interface
Presale participation flow
Visibility into sale phases (pricing, allocation caps, vesting terms)
Wallet connection and payment handling
Balance checks and transaction status monitoring
Post-TGE Interface
Overview of vesting streams for presale participants
Display of vested and claimable amounts
Direct link to claim tokens via Sablier