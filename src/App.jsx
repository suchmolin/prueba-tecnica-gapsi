import { useEffect, useRef, useState } from "react";
import "./App.css";
import HeaderGapsi from "./components/HeaderGapsi";
import SearcherCriterio from "./components/SearcherCriterio";
import BuyCart from "./components/BuyCart";
import LoaderComponent from "./components/LoaderComponent";

function App() {
  const [criterio, setCriterio] = useState("computer");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const loaderRef = useRef(null);

  const getProducts = async () => {
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
      console.log(items);

      setProducts((prev) => {
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

  const startDrag = (e, item) => {
    e.dataTransfer.setData("item", item.id);
  };
  const draggingOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const item = e.dataTransfer.getData("item");
    setCart((prev) => [...prev, item]);
    const newProducts = products.filter((product) => product.id !== item);
    setProducts(newProducts);
  };

  useEffect(() => {
    setProducts([]);
    getProducts();

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0]);

        const entry = entries[0];
        if (entry.isIntersecting) {
          getProducts();
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }, [criterio]);

  useEffect(() => {
    console.log(pageRef.current);
  }, [pageRef.current]);

  const resetApp = () => {
    setProducts([]);
    setCart([]);
    if (criterio !== "computer") {
      setCriterio("computer");
    } else {
      getProducts();
    }
    document.getElementById("searcher").value = "";
  };

  return (
    <>
      <main className="App">
        <HeaderGapsi resetApp={resetApp} />
        <section className="buscador w-full h-[140px] flex justify-between px-10">
          <SearcherCriterio criterio={criterio} setCriterio={setCriterio} />
          <BuyCart cart={cart} draggingOver={draggingOver} onDrop={onDrop} />
        </section>

        <section className="w-full h-[750px] overflow-y-scroll flex gap-10 flex-wrap px-4 py-12 justify-center">
          {products.map((product, i) => (
            <div
              key={`${product.id}${i}`}
              className="product-card rounded-xl shadow-2xl w-[400px] min-h-[200px] overflow-hidden bg-white relative"
              draggable
              onDragStart={(e) => startDrag(e, product)}
            >
              <div className="w-full flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[300px]"
                />
              </div>
              <div className="w-full px-7 py-5">
                <p className="w-full text-end text-5xl font-bold text-blue-600 py-3">
                  <span className="text-gray-600 text-base">price</span>{" "}
                  {product.price}$
                </p>
                <p>{product.name}</p>
              </div>
            </div>
          ))}
          <div ref={loaderRef} className="w-full flex justify-center">
            {loading && <LoaderComponent />}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
