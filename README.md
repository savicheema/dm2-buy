This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

1. Should have Git installed on your system.
2. Should have node.js installed. (_preferably >= v12_)

### Steps to development

Firstly, Install dependencies

```bash
npm install

```

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
```

Third, create seperate branch for local development.

```bash
git branch <branch-name>
```

## Business Rules

public website for dm2buy.com where buyers can buy products from sellers

**Requirements**

Product detail page

- Every product on the site will have a detailed page where all product specifications will be listed.
- The page will follow the following url scheme -> https://www.dm2buy.com/products/<slug>; where slug is the url component saved with each product in airtable.
- The full page design for the page is available here -> https://app.zeplin.io/project/60942da3b7616d03de23e45c/screen/60a3a26b193d902b13827f86/

- The top of the page will have the same top navigation as common across all the other pages.

  ![top-nav](https://user-images.githubusercontent.com/84374083/118669617-86c6d880-b813-11eb-8205-f645e91157c3.png)

* Next we will have basic product information. This will entail the following components:

  - Product Images - The product images section has two parts:
    - Image Viewer - On the top we have the current image being viewed.
      - Images can be changed by swiping or moving the arrow bars at the bottom
      - There can be a total of 10 images for each product. The images are always served in the order where the first image is always served from the header photo field from airtable and the rest of the images are served from the other photos column(order isn't important for the rest of the photos).
      - The swiping of images is always smooth and works in loop. Which means that if there are four images in total on for the product, after swiping the fourth image the first image will be shown again.
      - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2Fa9S2q5OoXM.jpeg?alt=media&token=768c3982-cf63-492b-8a5c-7cbff82c15f5)
    - Image Sliders - The image sliders at the bottom have two arrows one left and one right and in the middle there are n circles; where n is the number in the photo count field on airtable.
      - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2Fzs1GbHSj-U.png?alt=media&token=bd857ce3-1c5d-473f-9c1e-a003f67c1bfb)
      - The photo slider will always have one photo and the corresponding circle highlighted(shown in black) while the other circles are dimmed and shown in grey. The highlighted image shows which product image the user is viewing.
      - For now we are not covering the scenario where there are no photos (no photo in the header photo and other photos columns) or just one photo i.e. just header photo being present and other photos missing. This is done to simplify the development process and will be added as a feature in the next release.
  - Product Name - Fetched from the Name column from airtable.
    - One business rule that we will not be implementing right now is truncating long names after three rows (discuss - is it easier to truncate after a certain number of characters or after a certain number of rows)
  - Product Price - Fetched from the Price column from airtable and needs to be prefixed with the rupee symbol as shared in the design.
  - Action Button -> Share Product
    - The share product action button will open the default browser share card if that's supported by the API. If not, it will just copy the URL of the product.
    - This is the same URL as the product URL covered above i.e. https://www.dm2buy.com/products/<slug>; where slug is the url component saved with each product in airtable.
  - Primary CTA - This is the main CTA available on the page. There are two variations possible.
    - **Available Products** if the product status is "for-sale" on airtable then the CTA copy will be "Buy Now" and the button will be activated
      - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FQtMV1MWSNr.png?alt=media&token=87b560fc-7258-444d-9301-6e64df6303fa)
    - **Sold out Products** - if the product status is "sold-out" on airtable then the CTA copy will be "Sold Out" and the button will be disabled.
      - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2F13kOjaA4xN.png?alt=media&token=db2a3576-ad2e-4b93-841c-55378ccfa064)
      - refer design here -> https://app.zeplin.io/project/60942da3b7616d03de23e45c/screen/60a3b4773beef12a350df294/
  - **Product Description** - Fetched from the description column from airtable.

    - The important thing here is to honour the character spacing and line breaks in the string
    - One business rule that we are not adding here is around when to truncate the description i.e. **Show More**/**Show Less**. I'll be adding this later.

  - After covering all the information about the product, we will have store information that's relevant to the product
    - Store Policy - This is a standard section on the page which will be static for now.
      - Later on we will link this to the "allow replacement" boolean column from airtable.
      - The Learn more button for now will not be clickable but make sure you follow the styles as covered in the design.
      - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FVjvcEtQZw5.png?alt=media&token=6d107739-cdd0-4a87-964a-6eb814ee07b4)
    - Store Card - The store card tells the user which store the product belongs to specifically, it has two subsections:
      - Seller Info
        - Store owner photo - Fetched from the store_profile_photo column on airtable in the Stores Table.
        - Store owner instagram handle - Fetched from the store_instagram_handle column on airtable in the Stores Table.
        - Store owner instagram location - Fetched from the location column on airtable in the Stores Table.
      - Seller Instagram Action button
        - clicking on this button will open the instagram profile of the store owner. The url will follow the scheme -> https://www.instagram.com/< store_instagram_handle>; where store_instagram_handle is fetched from airtable
        - The user should have the option of opening the profile in the browser or the instagram app (if he has that installed on this phone)
      - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FwxxOLTJjOR.png?alt=media&token=2eee443a-22bb-4c1d-97d3-fa8a667dee5c)

* Lastly we will have the page footer which is common across all the pages. The footer will have our instagram handle, clicking on which the user will land on our instagram page -> https://www.instagram.com/dm2buydotcom/
  - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2Fll0qqKswKA.png?alt=media&token=1727bf21-a962-4d97-914f-b662ce902702)
