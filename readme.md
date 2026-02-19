
The app is deployed at: https://next-js-game-store.vercel.app/orders
![Screenshot_20260217_213449.png](public/Screenshot_20260217_213449.png)
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

```
npm i
npm run dev
```

#### Project will run on localhost:3000

### To run playwright test cases

```
npm run playwright-ui
```
![Screenshot_20260217_213105.png](public/Screenshot_20260217_213105.png)
```
// To run on headless UI 
npx playwright test --ui 

// To run on chromim
npm playwright test --project=chromium
```

## To run vitest tests
```
npm run dom-test -  for UI
```
```
npm run test
```
![Screenshot_20260217_213335.png](public/Screenshot_20260217_213335.png)

## Run docker on local
need your .env file for environment variables
```
docker compose up

```