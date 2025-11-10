import React from 'react'
import Link from 'next/link'
import {IProduct} from '../product.interface'
import Image from 'next/image';

interface CardProps {
    product: IProduct;
}
function Card({product}: CardProps) {
  const href = product.id ? `/product/${product.id}` : undefined;

  const content = (
    <div className="max-w-sm bg-linear-to-br from-white via-gray-100 to-yellow-50 p-4 rounded-lg shadow hover:shadow-xl transition-transform hover:scale-105 cursor-pointer flex flex-col">
      <div className="w-full aspect-4/3 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
       
        <Image src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-sm text-gray-700 line-clamp-2">
          <span className="inset-0">{product.name}</span>
        </h3>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
        <span className="text-xs text-gray-500">Stock: {product.stock}</span>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} prefetch className="inline-block">
      {content}
    </Link>
  ) : (
    content
  );
}

export default Card
