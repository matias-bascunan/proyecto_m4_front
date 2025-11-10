import Card from "../components/Card";
import { getAllProducts } from "../services/product.services";

export default async function HomePage() {
  const allProducts = await getAllProducts();
  return (
    <div className="flex flex-col min-h-screen items-center bg-black dark:bg-black">
      <h1 className="mt-6 text-2xl font-semibold">E Commerce mio y solo mio</h1>
      <h3 className="text-zinc-600 dark:text-zinc-300">Bienvenidos mortales</h3>
      <div className="w-full max-w-7xl px-6 mt-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {allProducts.map((product) => (
            <Card key={product.name} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
