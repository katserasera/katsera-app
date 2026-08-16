CONTINUE FROM THE EXISTING FIGMA PROJECT.

IMPORTANT:

This is a feature completion and business logic implementation phase.

DO NOT redesign any existing screens.
DO NOT modify layouts, typography, spacing, colors, navigation, or design system.

Keep every previous screen, component, interaction, and prototype exactly as they are.

Only ADD missing functionality, improve UX logic, and connect existing features together.

The final result should behave like a complete production-ready platform.

======================================================
1. ORDER HISTORY & EVENT ENTRIES INTEGRATION
======================================================

Every successful purchase must automatically update the user's account.

If a Fan purchases:

- Concert Ticket
- Workshop Ticket
- Merchandise
- Membership
- Digital Product

Automatically add the purchase into:

- Order History
- Event Entries (if it is an event ticket)
- Purchased Products
- Purchase Confirmation

Example Flow:

Buy Ticket

↓

Checkout

↓

Payment

↓

Payment Success

↓

Automatically Added To:

• Order History
• Event Entries
• Artist Revenue Dashboard

Users should be able to open Order History and view:

- Purchase status
- Invoice
- QR Ticket / Entry Pass
- Download receipt
- View event details

======================================================
2. EVENT MARKETPLACE
======================================================

Expand the Event Ticket feature into a complete Event Marketplace.

Users should be able to search events by:

- Artist Name
- Creator Name
- Event Category
- City
- Date

Categories include:

Music
- Concert
- Fan Meeting
- Album Launch
- Meet & Greet

Visual Arts
- Painting Workshop
- Watercolor Class
- Oil Painting Workshop
- Live Painting Session
- Gallery Exhibition

Creative Arts
- Pottery Workshop
- Flower Arrangement Workshop
- Craft Workshop
- Sculpture Workshop
- Calligraphy Workshop

Each event page must include:

- Cover Image
- Organizer
- Date
- Time
- Location
- Maps
- Ticket Price
- Remaining Seats
- Description
- Gallery
- Participants
- Reviews

After completing a workshop, creators can upload:

- Workshop photos
- Student creations
- Event recap
- Certificates
- Community posts

======================================================
3. COMMENTS, SAVED POSTS & SAVED MERCH
======================================================

Make social interactions fully functional.

Comments:

Click Comment

↓

Open Full Comment Page

↓

View all comments

↓

Reply

↓

Like comments

↓

Delete own comment

↓

Report comment

Saved Posts:

Saved posts should automatically appear inside:

Profile

↓

Saved

↓

Posts

Saved Merchandise:

Create:

Profile

↓

Saved

↓

Wishlist

↓

Merchandise

Users should be able to remove or purchase saved items.

======================================================
4. ARTIST ACTIVITY CENTER
======================================================

Connect Fan interactions directly to Artist Dashboard.

Artists should receive:

- New Like notification
- New Comment notification
- New Follow notification
- New Purchase notification
- New Membership notification
- New Ticket Purchase notification

Artist Dashboard should include:

Activity Center

Showing:

- Recent Likes
- Recent Comments
- Recent Orders
- Merchandise Sales
- Ticket Sales
- Membership Sales

======================================================
5. VERIFY EMAIL OTP RESPONSIVENESS
======================================================

Improve the Verify Email screen.

The OTP input fields should automatically adapt to:

- Mobile phones
- Tablets
- Desktop
- Laptop

The verification boxes must always fit the screen properly without overflowing.

Include:

- Auto focus
- Auto next input
- Backspace support
- Paste OTP support

======================================================
6. CREATOR CONTENT VERIFICATION
======================================================

Before publishing, creators must verify ownership.

Music Artist:

Before uploading songs:

Required:

- Upload copyright certificate
- Upload ownership proof
- Song information
- Album information

Visual Artist:

Before uploading artwork:

Required:

- Artwork image
- Copyright certificate
- HKI certificate
- Artwork information

Submission Flow:

Upload

↓

Verification Queue

↓

Katsera Review Team

↓

Approved

OR

Revision Required

OR

Rejected

Only approved content can be published.

======================================================
7. KATSERA WALLET & QRIS
======================================================

Replace the current coin system with:

Katsera Wallet

Features:

- Wallet Balance
- Top Up
- Transaction History
- Payment History
- Withdrawal (Artist)

Top Up Methods:

- QRIS
- Virtual Account
- E-wallet
- Credit Card

For QRIS:

Generate a realistic QRIS payment screen including:

- QR Code
- Payment Timer
- Merchant Name
- Amount
- Payment Status

Wallet balance should automatically update after successful payment.

======================================================
8. STUDIO READY
======================================================

The "Studio Ready" section inside Artist Dashboard must become fully functional.

Click Studio Ready

↓

Open Creator Studio

Features:

- Upload Content
- Draft
- Scheduled Posts
- Content Calendar
- Analytics
- AI Suggestions
- Publish

======================================================
9. KATSERA ACADEMY VIDEO PLAYER
======================================================

All Katsera Academy videos should become playable.

Create a complete video learning experience.

Features:

- Video Player
- Play
- Pause
- Fullscreen
- Playback Speed
- Progress Bar
- Continue Watching

Create an Admin upload flow for Katsera Team.

Katsera Team should be able to:

- Upload Video
- Edit Video
- Replace Video
- Delete Video
- Add Thumbnail
- Add Description
- Organize Courses

======================================================
10. PAYMENT TIMER & PAYOUT TIMER
======================================================

Improve all payment experiences.

For Fans:

Checkout

↓

Payment Page

↓

Countdown Timer

Example:

15 Minutes Remaining

States:

Waiting for Payment

↓

Payment Successful

OR

Payment Expired

OR

Payment Failed

Users may:

Retry Payment

or

Choose Another Payment Method

For Artists:

Redeem Earnings

↓

Withdrawal Request

↓

Processing

↓

Approved

OR

Rejected

↓

Funds Sent

Display payout status and estimated processing time.

======================================================
FINAL REQUIREMENTS
======================================================

Every new feature must include:

- Default state
- Hover state
- Active state
- Loading state
- Success state
- Error state
- Empty state

All buttons, cards, menus, forms, and interactions must be fully connected.

No static UI.

No dead-end screens.

All new features must integrate seamlessly with the existing design system, navigation, authentication, payment flow, and creator ecosystem without modifying previous designs.