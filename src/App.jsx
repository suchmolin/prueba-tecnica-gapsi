import { useEffect, useRef, useState } from "react";
import "./App.css";
import HeaderGapsi from "./components/HeaderGapsi";
import SearcherCriterio from "./components/SearcherCriterio";
import BuyCart from "./components/BuyCart";
import LoaderComponent from "./components/LoaderComponent";
import { getProducts } from "./functions/getProducts";

function App() {
  const [criterio, setCriterio] = useState("computer");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const loaderRef = useRef(null);

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
    pageRef.current = 1;
    getProducts(setLoading, criterio, pageRef, setProducts);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          getProducts(setLoading, criterio, pageRef, setProducts);
        }
      },
      { rootMargin: "0px 0px 200px 0px", threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect(); // Limpia el observador al desmontar
      }
    };
  }, [criterio]);

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
        <section className="buscador w-full flex flex-col sm:flex-row justify-between px-10 py-5">
          <SearcherCriterio criterio={criterio} setCriterio={setCriterio} />
          <BuyCart cart={cart} draggingOver={draggingOver} onDrop={onDrop} />
        </section>

        <section
          className="w-full overflow-y-scroll flex gap-10 flex-wrap px-4 py-12 justify-center"
          style={{ height: `calc(100vh - 240px)` }}
        >
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
                  className="w-[200px]"
                />
              </div>
              <div className="w-full px-7 py-3">
                <p className="w-full text-end text-5xl font-bold text-blue-500 py-3">
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
