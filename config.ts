import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "儿童AI绘本",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "专为儿童设计的AI绘本创作和阅读平台，让孩子们轻松创作属于自己的精彩故事。",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "manus-cloud.space",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "基础版",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "适合初次体验的小朋友",
        // The price you want to display, the one user will be charged on Stripe.
        price: 29,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 49,
        features: [
          {
            name: "每月创作5本绘本",
          },
          { name: "基础AI绘图功能" },
          { name: "语音朗读功能" },
          { name: "个人绘本库" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "高级版",
        description: "适合创作达人的小朋友",
        price: 59,
        priceAnchor: 99,
        features: [
          {
            name: "无限制创作绘本",
          },
          { name: "高级AI绘图功能" },
          { name: "多语言语音朗读" },
          { name: "个人绘本库" },
          { name: "绘本分享功能" },
          { name: "优先客服支持" },
        ],
      },
    ],
  },
  // Creem payment gateway configuration
  creem: {
    // Products created in your Creem dashboard
    products: [
      {
        // REQUIRED - The product ID from Creem dashboard
        productId: "prod_qR4gaLbaLaU3yA1XLHUfz", // Replace with your actual Creem product ID
        // REQUIRED - Name of the product
        name: "基础版",
        // Description of the product
        description: "适合初次体验的小朋友",
        // The price to display
        price: 29,
        // Optional anchor price (original price to show discounted from)
        priceAnchor: 49,
        features: [
          {
            name: "每月创作5本绘本",
          },
          { name: "基础AI绘图功能" },
          { name: "语音朗读功能" },
          { name: "个人绘本库" },
        ],
      },
      {
        productId: "prod_3ynGemonHDI3Wfinb1uUTO", // Replace with your actual Creem product ID
        isFeatured: true,
        name: "高级版",
        description: "适合创作达人的小朋友",
        price: 59,
        priceAnchor: 99,
        features: [
          {
            name: "无限制创作绘本",
          },
          { name: "高级AI绘图功能" },
          { name: "多语言语音朗读" },
          { name: "个人绘本库" },
          { name: "绘本分享功能" },
          { name: "优先客服支持" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `儿童AI绘本 <noreply@manus-cloud.space>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `儿童AI绘本客服 <admin@manus-cloud.space>`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@manus-cloud.space",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "cupcake",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["cupcake"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users to after a successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
