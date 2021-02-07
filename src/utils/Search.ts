  /**
   *  Identifies an item by name
   *  Uses an already imported data.
   *  Compares it to a path from it param.
   * @params {nameOfBracelet} string - this will take a name from asPath of router object
   * @return {void}
   */
  const findItem = (path: string) => {
    // const prefix = "/collections/";

    // const foundItem = bracelets.find((item) => {
    //   if (prefix + convertItemName(item.name) === path) {
    //     console.log(
    //       "Prefixes and name",
    //       prefix + " " + path + " " + convertItemName(item.name)
    //     );
    //     setCurrentItem(item);
    //     setValues({
    //       name: item.name,
    //       size: 0,
    //       quantity: 1,
    //       price: item.price,
    //       src: item.src,
    //       id: "",
    //     })
    //   }
    // });
    // console.log("Found Bracelet ", foundItem);
  };

  export default findItem