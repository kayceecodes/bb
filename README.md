# Next.js with TypeScript example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs-with-typescript
cd nextjs-with-typescript
```

Install it and run:

```sh
npm install
npm run dev
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/nextjs-with-typescript)

## The idea behind the example

[Next.js](https://github.com/zeit/next.js) is a framework for server-rendered React apps.


## Notes on using JS shopify Buy SDK Api  
          products[0].variants[0].price,
          products[0].title,
          products[0].images[0].src,
          products[0].options[*].values[0].value
          products[0].options[*].name

## To Do

    1.  Cart - Add to shopify cart
    2X  Work on back button to /shoppingcart from shopify
        note - Chromium clears either cache or cookies, it works.
    3X  Work on the CSV. It's causing options[] values to be undefined
    4X  Remove all unnecessary string conversion methods
    5X  Add more products, at least one for 'featured bracelets'
    6X  Featured Links to send client to product
    7.  Change values.name to values.title throughout redux & product
    8X  FeaturedProducts needs rendered elements with key
    9X  Cart Card has two set of quotations for Inches
    10X Tabs in Sidedrawer are setting Values to wrong tab.
        Shows up only in console.
    11. [slug], Replace Go to checkout button
    12x 'anchorEl' provided to Popover is invalid.
        Should be an Element instance. It's undefined instead.
    13X 'Search Bracelets' component does not setvalues correctly
        After first change of url it stops working
        Fix: Handle was not in the dependencies of the useEffect
        so it wouldn't re-render when the handle changed.
    14. Checkout Button goes to collections in CartSummaryModal.tsx
    15. GetStaticProps needs to find product by handle 
    16. Add Variant selections in [slug].tsx
    17. AddToCartBtn should still be able to add product
    18. Remove productData [slug].tsx
    19. Remove product, products from useContext [slug].tsx
    20. Adjust
    21. Clear values need to ONLY REMOVE quantity and sizes!

# Questions
    Pro/Cons & Difference between Link href and router.push
        SE see's html
        router isn't shown
        router.push is great for re enforcement
    Refs Advantages over Props.
    Why does returning a response

# Plan out Shopping Cart & Shopify Cart
    From the Shopping Cart Page
    - Update quantity Subtract/Add
    - Remove Item all together

    Redux Cart
    - check-id in redux
    - 

