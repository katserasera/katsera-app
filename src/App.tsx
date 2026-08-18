import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Fan flow
import Splash from "./pages/fan/Splash"
import Launch from "./pages/fan/Launch"
import RoleSelect from "./pages/fan/RoleSelect"
import Welcome from "./pages/fan/Welcome"
import FanSignUp from "./pages/fan/FanSignUp"
import FanVerify from "./pages/fan/FanVerify"
import ArtistPick from "./pages/fan/ArtistPick"

import FanDashboard from "./pages/fan/FanDashboard"
import ArtistProfileFan from "./pages/fan/ArtistProfileFan"

// Fan Shop
import ShopCollection from "./pages/fan/ShopCollection"
import ProductDetail from "./pages/fan/ProductDetail"
import ShopCheckout from "./pages/fan/ShopCheckout"
import ShopPayment from "./pages/fan/ShopPayment"
import ShopDone from "./pages/fan/ShopDone"

// Fan Concert
import ConcertCategory from "./pages/fan/ConcertCategory"
import ConcertTerms from "./pages/fan/ConcertTerms"
import ConcertData from "./pages/fan/ConcertData"
import ConcertPayment from "./pages/fan/ConcertPayment"
import ConcertDone from "./pages/fan/ConcertDone"

// Fan Channel
import ChannelHome from "./pages/fan/ChannelHome"
import ExploreChannel from "./pages/fan/ExploreChannel"

// Fan Membership
import MembershipPackages from "./pages/fan/MembershipPackages"
import MembershipPayment from "./pages/fan/MembershipPayment"
import MembershipActivate from "./pages/fan/MembershipActivate"

// Fan Membership & Coins
import MembershipDetail from "./pages/fan/MembershipDetail"
import CoinTopUp from "./pages/fan/CoinTopUp"

// Fan More destination pages
import OrderHistory from "./pages/fan/OrderHistory"
import OrderDetails from "./pages/fan/OrderDetails"
import EventEntries from "./pages/fan/EventEntries"
import TicketDetails from "./pages/fan/TicketDetails"
import RecentlyWatched from "./pages/fan/RecentlyWatched"
import PurchasedMedia from "./pages/fan/PurchasedMedia"
import Downloaded from "./pages/fan/Downloaded"
import SongWrapped from "./pages/fan/SongWrapped"

// Fan Session 6
import FanMoreTab from "./pages/fan/FanMoreTab"
import FanProfile from "./pages/fan/FanProfile"
import FanReferral from "./pages/fan/FanReferral"
import FanDMChannels from "./pages/fan/FanDMChannels"
import FanChannelSpace from "./pages/fan/FanChannelSpace"

// Artist onboarding
import ArtistJoin from "./pages/artist/ArtistJoin"
import ArtistSignUp from "./pages/artist/ArtistSignUp"
import ArtistVerify from "./pages/artist/ArtistVerify"
import ArtistIdentity from "./pages/artist/ArtistIdentity"
import ArtistCreateProfile from "./pages/artist/ArtistCreateProfile"
import ArtistUploadWorks from "./pages/artist/ArtistUploadWorks"
import ArtistCommunity from "./pages/artist/ArtistCommunity"
import ArtistTerms from "./pages/artist/ArtistTerms"
import ArtistApproval from "./pages/artist/ArtistApproval"
import ArtistDashboard from "./pages/artist/ArtistDashboard"
import CreatorTypeSelect from "./pages/artist/CreatorTypeSelect"

// Painter ecosystem
import PainterDashboard from "./pages/painter/PainterDashboard"

// Artist advanced
import LiveSetup from "./pages/artist/LiveSetup"
import LiveBroadcast from "./pages/artist/LiveBroadcast"
import AIModerationSettings from "./pages/artist/AIModerationSettings"
import AIFilteredWords from "./pages/artist/AIFilteredWords"
import ArtistMyProfile from "./pages/artist/ArtistMyProfile"
import KatseraAcademy from "./pages/artist/KatseraAcademy"
import RedeemNominal from "./pages/artist/RedeemNominal"
import RedeemConfirm from "./pages/artist/RedeemConfirm"
import RedeemSuccess from "./pages/artist/RedeemSuccess"

// Artist profile ecosystem
import EditProfile from "./pages/artist/profile/EditProfile"
import ChangePhoto from "./pages/artist/profile/ChangePhoto"
import VerificationStatus from "./pages/artist/profile/VerificationStatus"
import MusicGenres from "./pages/artist/profile/MusicGenres"
import Languages from "./pages/artist/profile/Languages"
import CreatorPreferences from "./pages/artist/profile/CreatorPreferences"
import NotificationSettings from "./pages/artist/settings/NotificationSettings"
import PrivacySettings from "./pages/artist/settings/PrivacySettings"
import SecuritySettings from "./pages/artist/settings/SecuritySettings"
import ChangePassword from "./pages/artist/settings/ChangePassword"
import TwoFactorAuth from "./pages/artist/settings/TwoFactorAuth"
import ConnectedAccounts from "./pages/artist/settings/ConnectedAccounts"
import DeviceSessions from "./pages/artist/settings/DeviceSessions"
import HelpCenter from "./pages/artist/help/HelpCenter"
import FAQ from "./pages/artist/help/FAQ"
import ContactSupport from "./pages/artist/help/ContactSupport"
import ReportProblem from "./pages/artist/help/ReportProblem"

// Artist Session 6
import ArtistNotifications from "./pages/artist/ArtistNotifications"
import ArtistChannelSpace from "./pages/artist/ArtistChannelSpace"
import ChannelSettings from "./pages/artist/ChannelSettings"
import ArtistSalesHub from "./pages/artist/ArtistSalesHub"
import FanAnalytics from "./pages/artist/FanAnalytics"
import DesignSystem from "./pages/artist/DesignSystem"

// Shared Payment
import PaymentGateway from "./pages/shared/PaymentGateway"
import PaymentStatus from "./pages/shared/PaymentStatus"

// Shared features
import SupportChat from "./pages/shared/SupportChat"
import EventDetail from "./pages/shared/EventDetail"
import EventsList from "./pages/shared/EventsList"
import EventMarketplace from "./pages/shared/EventMarketplace"
import CommentsPage from "./pages/shared/CommentsPage"
import PaymentTimer from "./pages/shared/PaymentTimer"
import MembershipContent from "./pages/fan/MembershipContent"
import SavedItems from "./pages/fan/SavedItems"
import KatseraWallet from "./pages/fan/KatseraWallet"
import ActivityCenter from "./pages/artist/ActivityCenter"
import CreatorStudio from "./pages/artist/CreatorStudio"
import VideoPlayer from "./pages/artist/VideoPlayer"
import ContentVerification from "./pages/artist/ContentVerification"

// Auth flows
import LoginScreen from "./pages/auth/LoginScreen"
import ForgotPassword from "./pages/auth/ForgotPassword"
import FaceVerification from "./pages/auth/FaceVerification"

// Upload flows
import ArtworkUpload from "./pages/painter/ArtworkUpload"
import SongUpload from "./pages/artist/SongUpload"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Entry ── */}
        <Route path="/" element={<Splash />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/role" element={<RoleSelect />} />

        {/* ── Auth flows ── */}
        <Route path="/auth/login" element={<LoginScreen />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/face-verify" element={<FaceVerification />} />

        {/* ── Upload flows ── */}
        <Route path="/painter/upload" element={<ArtworkUpload />} />
        <Route path="/artist/upload" element={<SongUpload />} />

        {/* ── Fan ── */}
        <Route path="/fan/welcome" element={<Welcome />} />
        <Route path="/fan/signup" element={<FanSignUp />} />
        <Route path="/fan/verify" element={<FanVerify />} />
        <Route path="/fan/pick-artists" element={<ArtistPick />} />

        <Route path="/fan/home" element={<FanDashboard />} />
        <Route path="/fan/artist/:id" element={<ArtistProfileFan />} />
        <Route path="/fan/more" element={<FanMoreTab />} />
        <Route path="/fan/profile" element={<FanProfile />} />
        <Route path="/fan/referral" element={<FanReferral />} />
        <Route path="/fan/dm" element={<FanDMChannels />} />
        <Route path="/fan/dm/:id" element={<FanChannelSpace />} />

        {/* ── Fan Shop ── */}
        <Route path="/fan/shop" element={<ShopCollection />} />
        <Route path="/fan/shop/product/:id" element={<ProductDetail />} />
        <Route path="/fan/shop/checkout" element={<ShopCheckout />} />
        <Route path="/fan/shop/payment" element={<ShopPayment />} />
        <Route path="/fan/shop/done" element={<ShopDone />} />

        {/* ── Fan Concert ── */}
        <Route path="/fan/concert" element={<ConcertCategory />} />
        <Route path="/fan/concert/terms" element={<ConcertTerms />} />
        <Route path="/fan/concert/data" element={<ConcertData />} />
        <Route path="/fan/concert/payment" element={<ConcertPayment />} />
        <Route path="/fan/concert/done" element={<ConcertDone />} />

        {/* ── Fan Channel ── */}
        <Route path="/fan/channel" element={<ChannelHome />} />
        <Route path="/fan/channel/:id" element={<ExploreChannel />} />

        {/* ── Fan Membership ── */}
        <Route path="/fan/membership" element={<MembershipPackages />} />
        <Route path="/fan/membership/payment" element={<MembershipPayment />} />
        <Route path="/fan/membership/activate" element={<MembershipActivate />} />

        {/* ── Artist onboarding ── */}
        <Route path="/artist/join" element={<ArtistJoin />} />
        <Route path="/artist/signup" element={<ArtistSignUp />} />
        <Route path="/artist/verify" element={<ArtistVerify />} />
        <Route path="/artist/identity" element={<ArtistIdentity />} />
        <Route path="/artist/create-profile" element={<ArtistCreateProfile />} />
        <Route path="/artist/upload-works" element={<ArtistUploadWorks />} />
        <Route path="/artist/community" element={<ArtistCommunity />} />
        <Route path="/artist/terms" element={<ArtistTerms />} />
        <Route path="/artist/approval" element={<ArtistApproval />} />
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/creator-type" element={<CreatorTypeSelect />} />

        {/* ── Painter ecosystem ── */}
        <Route path="/painter/dashboard" element={<PainterDashboard />} />
        <Route path="/painter/studio" element={<PainterDashboard />} />
        <Route path="/painter/sales" element={<PainterDashboard />} />
        <Route path="/painter/community" element={<PainterDashboard />} />
        <Route path="/painter/analytics" element={<PainterDashboard />} />

        {/* ── Artist advanced ── */}
        <Route path="/artist/live/setup" element={<LiveSetup />} />
        <Route path="/artist/live/broadcast" element={<LiveBroadcast />} />
        <Route path="/artist/ai" element={<AIModerationSettings />} />
        <Route path="/artist/ai/filtered-words" element={<AIFilteredWords />} />
        <Route path="/artist/profile" element={<ArtistMyProfile />} />
        <Route path="/artist/academy" element={<KatseraAcademy />} />
        <Route path="/artist/redeem" element={<RedeemNominal />} />
        <Route path="/artist/redeem/confirm" element={<RedeemConfirm />} />
        <Route path="/artist/redeem/success" element={<RedeemSuccess />} />
        <Route path="/artist/notifications" element={<ArtistNotifications />} />
        <Route path="/artist/channel" element={<ArtistChannelSpace />} />
        <Route path="/artist/channel/settings" element={<ChannelSettings />} />
        <Route path="/artist/sales" element={<ArtistSalesHub />} />
        <Route path="/artist/analytics" element={<FanAnalytics />} />
        <Route path="/artist/design-system" element={<DesignSystem />} />

        {/* ── Artist Profile Ecosystem ── */}
        <Route path="/artist/profile/edit" element={<EditProfile />} />
        <Route path="/artist/profile/photo" element={<ChangePhoto />} />
        <Route path="/artist/profile/verification" element={<VerificationStatus />} />
        <Route path="/artist/profile/genres" element={<MusicGenres />} />
        <Route path="/artist/profile/languages" element={<Languages />} />
        <Route path="/artist/profile/preferences" element={<CreatorPreferences />} />

        {/* ── Artist Settings ── */}
        <Route path="/artist/settings/notifications" element={<NotificationSettings />} />
        <Route path="/artist/settings/privacy" element={<PrivacySettings />} />
        <Route path="/artist/settings/security" element={<SecuritySettings />} />
        <Route path="/artist/settings/password" element={<ChangePassword />} />
        <Route path="/artist/settings/2fa" element={<TwoFactorAuth />} />
        <Route path="/artist/settings/connected" element={<ConnectedAccounts />} />
        <Route path="/artist/settings/sessions" element={<DeviceSessions />} />

        {/* ── Artist Help Center ── */}
        <Route path="/artist/help" element={<HelpCenter />} />
        <Route path="/artist/help/faq" element={<FAQ />} />
        <Route path="/artist/help/contact" element={<ContactSupport />} />
        <Route path="/artist/help/report" element={<ReportProblem />} />

        {/* ── Fan Membership & Coins ── */}
        <Route path="/fan/membership/detail" element={<MembershipDetail />} />
        <Route path="/fan/topup" element={<CoinTopUp />} />

        {/* ── Fan More destination pages ── */}
        <Route path="/fan/orders" element={<OrderHistory />} />
        <Route path="/fan/orders/:id" element={<OrderDetails />} />
        <Route path="/fan/events" element={<EventEntries />} />
        <Route path="/fan/events/:id" element={<TicketDetails />} />
        <Route path="/fan/watched" element={<RecentlyWatched />} />
        <Route path="/fan/media" element={<PurchasedMedia />} />
        <Route path="/fan/downloads" element={<Downloaded />} />
        <Route path="/fan/wrapped" element={<SongWrapped />} />

        {/* ── Shared features ── */}
        <Route path="/support/chat" element={<SupportChat />} />
        <Route path="/events/detail" element={<EventDetail />} />
        <Route path="/events/list" element={<EventsList />} />
        <Route path="/events/marketplace" element={<EventMarketplace />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/payment/timer" element={<PaymentTimer />} />
        <Route path="/fan/membership/content" element={<MembershipContent />} />
        <Route path="/fan/saved" element={<SavedItems />} />
        <Route path="/fan/wallet" element={<KatseraWallet />} />
        <Route path="/artist/activity" element={<ActivityCenter />} />
        <Route path="/artist/studio" element={<CreatorStudio />} />
        <Route path="/academy/player" element={<VideoPlayer />} />
        <Route path="/artist/verify-content" element={<ContentVerification />} />

        {/* ── Shared Payment ── */}
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/payment/status" element={<PaymentStatus />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
