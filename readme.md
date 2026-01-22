This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# A Next.js e-commerce store with following features
* Product listing
* Cart
* Checkout with stripe payment gateway

## Development features
* App router
* Zustand state management
* Supabase - Auth, Users, products, carts 
* Stripe Integration
* Vitest test cases
* Playwright test cases
* Docker image
* CI/CD pipeline (probably Github Actions)
* SEO work on SSR pages

### UI Features
* Checkout without login
* Login checkout
  * User cart saved on Supabase
  * User cart retrieved on login
  * User order saved on Supabase
  * User order listed on account section
* One quantity per item
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### To run playwright test cases
```
// To run on headless UI 
npx playwright test --ui 

// To run on chromim
npm playwright test --project=chromium
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

