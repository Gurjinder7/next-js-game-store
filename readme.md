
The app is deployed at: https://next-js-game-store.vercel.app/orders

# A Next.js e-commerce store with following features
* Product listing (sorting and filtering)
* Product suggestions
* Cart
* Checkout with stripe payment gateway
* User orders listed
* Cart saved and retrieved
* Protected routes
* Email and password signup and login

## Development features
* App router 
* Zustand state management
* Supabase - Auth, Users, products, carts 
* Stripe Integration
* Vitest test cases
* Playwright test cases
* Docker image
* CI/CD pipeline (probably Github Actions)
* SEO work on SSR pages - home, product details

### UI Features
* Checkout without login
* Login checkout
  * User cart saved on Supabase
  * User cart retrieved on login
  * User order saved on Supabase
  * User order listed 
* One quantity per item
* filtering and sorting of products on homepage
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

