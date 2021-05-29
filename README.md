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

4. Create seperate branch for local development.

```bash
git branch <branch-name>
```

### Steps to push

1. Commit all/complete the changes to the local codebase.
2. Pull recent changes from _origin main_ branch.

```bash
git fetch origin main
```

3. Merge the code into your local codebase.

```bash
git merge main
```

4. Fix merge conflicts. (_if any_)

- Identify all the files with merge conflicts.
- For each resolved conflict make a seperate commit with a message. (_preferably_)

```bash
git commit -m <message>
```

5. Push code to your branch

```bash
git push origin <branch name>
```

6. Notify lead developer about the merge conflicts

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

Checkout Form

- Once the user has decided the product they want to purchase, clicking on 'Buy Now' will direct them to the checkout page. - **Done**
- The checkout page will be hosted at the url -> dm2buy.com/cart/checkout and can only be accessed after selecting a product to purchase. You can not access this page directly. - **should remove network call to fetch product, instead use local storage**
- Save the information for the user in their browser in a cookie so the next time they can checkout easily.
- The page has the following sections:
  - Thank you note - This is a static section where we display a Thank you note followed by the name of the creator. This section will be static for now i.e. just implement the design as it is without any dynamic components. - **Done**
    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FtggdU28Fum.png?alt=media&token=6a185a50-ff8f-409e-bb33-9dbe7f756cb1)
  - Personal Info - This section entails the following fields:
    - Full Name (validation and error message below)
      - Can't be empty -> "We need your name" - **Done**
      - Can't be more than 50 characters -> No error message just disable typing
    - Instagram Handle (validation and error message below)
      - Can't be empty -> "Need your instagram" - **Done**
      - Has to be a valid instagram handle(refer -> https://blog.jstassen.com/2016/03/code-regex-for-instagram-username-and-hashtags/) -> "Instagram handle doesn't seem correct"
    - Phone number (validation and error message below)
      - Can't be empty -> "A number is needed"
      - Has to be a valid phone number(refer -> https://stackoverflow.com/questions/3813195/regular-expression-for-indian-mobile-numbers/3813226) -> "Incorrect number"
    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FNvUiDuE3cy.png?alt=media&token=c754ed42-ba87-4463-ae12-a568e8cc5b75)
  - Shipping Info - This section entails the following fields
    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FByK9xPGqzP.png?alt=media&token=f817e6a9-8b7f-4609-af16-fe3021ae73c4)
    - Address with Landmark (validation and error message below)
      - Can't be empty -> "Give us an address" - **Done**
      - Can't be more than 70 characters -> No error message just disable typing
    - Other address components pin code, city, state, country
      - Use this API to fetch city and state for a pincode -> https://www.marchtee.com/cart/shipping_options/pincode
      - If there is a valid pin code passed in the request, the API will return a 200 status code and a JSON response with the country, state and city. Use that to fill the city and state data with the values. Ignore shipping options.
      - For an invalid pincode, the API will return a 404 page in which case leave the city and state inputs empty.
      - The state and city will be immediately filled if the pin code is correct but will be left empty if the pincode search returns no results. So this needs to be an asynchronous network call independent of form submission. The validation will still only be invoked on form submission though.
      - The country field is uneditable and will always be set to India.
      - validation and error messages for each field below
        - Pincode
          - For empty pin code - "Need a pin code"
          - For invalid pin code -> Invalid pin code
        - City -> City is needed - **Done**
        - State -> State is needed - **Done**
  - Order Summary
    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fsuavelambi%2FoUuUdE67jI.png?alt=media&token=acd1cb5c-8997-474a-a48a-770a1379c011)
    - Order summary will entail four sub sections:
      - Product information -> cover the information of the product that the user selected on the previous screen (product name, product photo and price) - **price is missing**
      - Delivery information -> This is a static field which will tell the user about the delivery, shipping date(set to tomorrow by default), price(set to 100 by default) and an icon - **price is missing**
      - Disclaimer about no return, exchange, refund or cancellations.
      - CTA -> which takes the user to payment page (this will have the final price mentioned which is product price + INR 100)- **not showing price computed**
- Other form validation rules:
  - Clicking on checkout to a form with error messages will take you at the top where the first error message shows.
  - If the error message is for invalid input, ensure that the input isn't erased and still shows in the textbox as it is. - **done**
  - Show all the error messages in the form after the user clicks the checkout button - **done**
- Design references:
  - Empty form -> https://app.zeplin.io/project/60942da3b7616d03de23e45c/screen/60a7f2d18b2b9b257caecddb/
  - Filled form -> https://app.zeplin.io/project/60942da3b7616d03de23e45c/screen/60a7f2d10fb8c248db7002d9/
  - Form with errors -> https://app.zeplin.io/project/60942da3b7616d03de23e45c/screen/60ab57e2ee0036a3a370b90f/
