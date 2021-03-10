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
    4.  Remove all unnecessary string conversion methods
    5X  Add more products, at least one for 'featured bracelets'
    6X  Featured Links to send client to product
    7.  Change values.name to values.title throughout redux & product
    8X  FeaturedProducts needs rendered elements with key
    9X  Cart Card has two set of quotations for Inches
    10. Tabs in Sidedrawer are setting Values to wrong tab.
        Shows up only in console.
    11. [product], Replace Go to checkout button
    12x 'anchorEl' provided to Popover is invalid.
        Should be an Element instance. It's undefined instead.
    13. 'Search Bracelets' component does not setvalues correctly
        After first change of url it stops working
    14. Checkout Button goes to collections in CartSummaryModal.tsx
# Questions
    Pro/Cons & Difference between href and router.push