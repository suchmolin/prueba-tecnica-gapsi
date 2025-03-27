export const getProducts = async (
  setLoading,
  criterio,
  pageRef,
  setProducts
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=${criterio}&page=${pageRef.current}&sortBy=best_match`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "fce0e15738msh6a87c0c9db9505cp14b74fjsn54bc768f3bc7",
        },
      }
    );
    const data = await response.json();
    const items =
      data.item.props.pageProps.initialData.searchResult.itemStacks[0].items;

    await setProducts((prev) => {
      const newProducts = items.filter(
        (product) => product.id && !prev.some((p) => p.id === product.id)
      );
      return [...prev, ...newProducts];
    });
  } catch (error) {
    console.log(error);
  }
  pageRef.current++;

  setLoading(false);
};
