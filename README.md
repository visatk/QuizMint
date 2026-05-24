### 🛠️ The Tech Stack (100% Cloudflare Native)

* **Framework:** Next.js (App Router)
* **Runtime Adapter:** `@opennextjs/cloudflare` (Next.js-কে সরাসরি Cloudflare Workers/Pages-এ চালানোর জন্য)
* **Database:** Cloudflare D1 (SQLite-based সার্ভারলেস ডাটাবেস)
* **Caching/State:** Cloudflare KV (লিডারবোর্ড এবং লাইভ সেশন ক্যাশ করার জন্য)
* **Authentication:** Auth.js (NextAuth) + Google OAuth
* **Security:** Cloudflare Turnstile (বট ঠেকানোর জন্য)
* **Styling:** Tailwind CSS

---

### 📅 Project Plan: Development Blueprint (২ সপ্তাহের স্প্রিন্ট)

#### Phase 1: Environment & Project Setup (Day 1)

"Code Second, Setup First."

1. **Initialize Project:** `create-next-app` দিয়ে প্রজেক্ট সেটআপ এবং সাথে `@opennextjs/cloudflare` কনফিগার করা।
2. **Wrangler CLI:** Cloudflare-এর লোকাল ডেভেলপমেন্ট টুল `wrangler` ইনস্টল করা।
3. **Config File:** `wrangler.toml` ফাইলে D1 এবং KV ডাটাবেসের বাইন্ডিং (Bindings) সেটআপ করা।

#### Phase 2: Database Architecture & Auth (Day 2-3)

ডাটাবেস সিম্পল এবং রিলেশনাল হবে।

1. **D1 Schema Design:**
* `Users` (id, email, name, wallet_balance)
* `Quizzes` (id, question, options, correct_answer, category)
* `Transactions` (id, user_id, amount, status - withdraw এর জন্য)


2. **Authentication:** ফেক একাউন্ট কমানোর জন্য শুধুমাত্র "Login with Google" রাখা হবে। Auth.js কনফিগার করে সেশন ডাটাবেসে সেভ করার ব্যবস্থা করা।

#### Phase 3: Core API & Quiz Logic (Day 4-6)

Next.js Route Handlers (API) এবং Cloudflare D1 দিয়ে ব্যাকএন্ড লজিক লেখা।

1. **Quiz Fetch API:** D1 থেকে র‍্যান্ডম কুইজ লোড করে ফ্রন্টএন্ডে পাঠানো।
2. **Validation & Point Logic:** ইউজার কুইজ সাবমিট করলে API এন্ডপয়েন্টে সঠিক উত্তর ভেরিফাই করা এবং ইউজারের `wallet_balance` আপডেট করা।
3. **Anti-Cheat System:** কুইজ সাবমিট API-তে Cloudflare Turnstile টোকেন ভেরিফাই করা, যাতে কেউ Python বা Postman দিয়ে বট বানিয়ে অটোমেটিক পয়েন্ট না নিতে পারে।

#### Phase 4: UI/UX & Ad Integration (Day 7-9)

ডিজাইন হবে ক্লিন, ফাস্ট এবং Ad-বান্ধব।

1. **Dashboard:** ইউজারের ব্যালেন্স, উইথড্র অপশন এবং কুইজ ক্যাটাগরি দেখানোর জন্য সিম্পল ড্যাশবোর্ড।
2. **Quiz Player UI:** প্রতিটি প্রশ্নের জন্য টাইমার (৫-১০ সেকেন্ড) সহ একটি গ্যামিফাইড ইন্টারফেস।
3. **Google AdSense Placement:**
* *Next.js Script tag* ব্যবহার করে AdSense কোড বসানো।
* কুইজ পেজে Native Ads এবং কুইজ শেষে রেজাল্ট পেজে Interstitial Ads ইন্টিগ্রেট করা।



#### Phase 5: Testing & Deployment (Day 10)

1. **Local Testing:** `wrangler pages dev` ব্যবহার করে লোকালি @opennextjs বিল্ড টেস্ট করা।
2. **Deploy:** গিটহাবের সাথে Cloudflare Pages কানেক্ট করে CI/CD পাইপলাইন তৈরি করা। কোড পুশ করলেই অটোমেটিক লাইভ সাইট আপডেট হবে।

**পরবর্তী পদক্ষেপ:**
আপনি যদি এই প্ল্যানের সাথে একমত হন, তবে আমি আপনাকে **Phase 1 (Environment Setup)** এবং `wrangler.toml` এর কমপ্লিট কোডবেস দিয়ে শুরু করতে পারি। আমরা কি কোডিং শুরু করব?
