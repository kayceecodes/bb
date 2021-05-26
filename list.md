## Notes on using JS shopify Buy SDK Api  
          products[0].variants[0].price,
          products[0].title,
          products[0].images[0].src,
          products[0].options[*].values[0].value
          products[0].options[*].name

## To Do

    1X  Cart - Add to shopify cart
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
    11. 
    12x 'anchorEl' provided to Popover is invalid.
        Should be an Element instance. It's undefined instead.
    13X 'Search Bracelets' component does not setvalues correctly
        After first change of url it stops working
        Fix: Handle was not in the dependencies of the useEffect
        so it wouldn't re-render when the handle changed.
    14X Checkout Button goes to collections in CartSummaryModal.tsx
    15X GetStaticProps needs to find product by handle 
    16X Add Variant selections in [slug].tsx
    17. 
    18. Remove productData [slug].tsx
    19. Remove product, products from useContext [slug].tsx
    20. Remove item card from shoppingcart and all the item's quantity
    21. Clear values need to ONLY REMOVE quantity and sizes!
    22. Shoppingcart.tsx Alert if user really wants to clear item from cart
    23X Update Items.tsx to use countTotalItems, since it requires cartItems [object]
    24. Update Cart Number in header.
    25. Check/Remove string manipulation for the items size, represented by 'variant.title'
    26. Check if Micro pebbles 5.5" size is unavailable, since the title is left blank on CSV
    27. Check if inventory issues/alert happen after purchases, since Variant Inventory Policy can potentially cause issues
    28. Edit quantity options in Shopify's set up so there is an unlimited in stock, cause right now Shopify's checkout is saying OUT OF STOCK.
# Questions & Answers ( '-' means an aswer )
    1. Pro/Cons & Difference between Link href and router.push
        - SE see's html
        - router isn't shown
        - router.push is great for re enforcement
    2. Refs Advantages over Props.
    3. RTL built in Nextjs 
        - It's not.
    4. How does '?' help with potentially undefined variables. ItemsList -> lineItems?.map
    5. Changing CSV changes ids?
        - Every time an Option value in a CSV is change the Variant id is change. A new one is created and replaces the old
    6. Why forEach over for in vice versa
    7. Why doesnt process.env.SHOPIF_ACCESS_TOKEN work but it does on other pages
    8. Collections Page has a Warning, "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."
    9. Advatages of using .env.local? Should api tokens be used with .env.local
    10. Are .env.development files great with hidding secret keys?
    11. Why is github not updated after deploying project with vercel.
# Plan out Shopping Cart & Shopify Cart
    Add To Cart in Product's Page
    X Add a variant-id to addToCart()
    X Check if variantid is in redux 

    From the Shopping Cart Page
    - Update quantity Subtract/Add
    - Remove Item all together

    Redux Cart
    - checkout-id in redux
    - 