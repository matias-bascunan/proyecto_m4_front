import Image from 'next/image'
import { getProductById } from "../../../services/product.services";
import AddCartButton from '../../../components/AddCartButton';
interface ProductDetailProps {
    params: {
        idProduct: string;
            };
}


export default 
async function ProductDetailPage({params}:ProductDetailProps) {
  const{idProduct}= await params;
  const product = await getProductById(idProduct);
  return (
    <div className="bg-white">
      <div className="pt-6">
       
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          <div className="row-span-2 w-full aspect-3/4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center max-lg:hidden">
            <Image
              alt={product.name}
              src={product.image}
              width={800}
              height={800}
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
            <form className="mt-10">
              <AddCartButton product={product}/>
            </form> 
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
