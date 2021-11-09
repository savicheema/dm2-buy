This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

1. Should have Git installed on your system.
2. Should have node.js installed. (_preferably >= v12_)

### Steps to development

1. Firstly, Install dependencies

```bash
npm install

```

2. Add .env file to the root folder. (_ask for it_)
3. Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Steps to push

1. Pull recent changes from _origin main_ branch.

```bash
git fetch origin
```

2. Create seperate branch for local development.

```bash
git checkout -b <issue-500> origin/dev
```

3. Make changes, test and then commit your code
```bash
git add -u
git commit -m "message"
```

4. Pull/Rebase your code
```
git pull -r
```

5. Fix merge conflicts. (_if any_)

6. Push code to your branch

```bash
git push origin <issue-500>
```

6. Notify peer developers about the merge conflicts

## deployment workflow
  - all feature branches to be created with the issue id
  - once feature development is done, all PR to be raised on dev branch
  - the testing of the feature is done on dev branch, and all bug fixes are to be done here.
  - Once the feature is fully tested and ready to go we will merge the dev branch to main for final feature deployment

## Business Rules

public website for dm2buy.com where buyers can buy products from sellers

1. All sellers have their store **sellername.dm2buy.com**.
2. All products are listed on the homepage.
3. Product details page for users to zoom into product details and add product to their bag.
4. Checkout enables users to enter their personal details and review order to make payment.
5. Order detail page summarises their purchase after payment has been successful or not.

## DM2BUY resources
1. [Zeplin](https://app.zeplin.io/project/60942da3b7616d03de23e45c/dashboard)
2. [Figma](https://www.figma.com/file/LHi8gm0Q273edU8f09Kb03/Chubb?node-id=0%3A1)

## Tech resources
1. [NextJS](https://nextjs.org/docs)

