import {useRouter} from "next/router";
import {api} from "~/utils/api";
import {currency} from "~/utils/formater";
import Image from "next/image";
import React from "react";
import PublicLayout from "~/components/templates/PublicLayout";

export default function Payment() {
  const router = useRouter();
  const {data: order} = api.order.getOrder.useQuery({orderId: router.query.ref as string || ''});
  const {data: bankAccounts} = api.bank.getAccounts.useQuery();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Terimakasih telah mendaftar!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Lakukan Pembayaran!</p>
          <p className="mt-2 text-base text-gray-500">Lakukan pembayaran untuk menyelesaikan pendaftaran Anda.</p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Order ID</dt>
            <dd className="mt-2 text-indigo-600">{order?.data?.code}</dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {order?.data?.items.map((product) => (
            <div key={product.id} className="flex space-x-6 border-b border-gray-200 py-10">
              <Image
                src={product.product.images?.[0] || "/img-placeholder.png"}
                width={64}
                height={64}
                alt={product.productName}
                className="h-16 w-16 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-16 sm:w-16"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {product.productName}
                  </h4>
                  <dl className="flex mt-4 space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Jumlah</dt>
                      <dd className="ml-2 text-gray-700">{Number(product.quantity)}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Harga</dt>
                      <dd className="ml-2 text-gray-700">{currency.format(Number(product.price))}</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  {/*<p className="mt-2 text-sm text-gray-600">{product.description}</p>*/}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-10">
            <h3 className="font-medium text-gray-900">Lakukan pembayaran di salah satu rekening dibawah ini</h3>

            <h4 className="sr-only">Rekening</h4>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-10 text-sm">
              {bankAccounts?.data?.map(item => <div key={item.id} className="flex space-x-4">
                <Image
                  src={`/${item.bankCode || ''}.png`}
                  width={64}
                  height={64}
                  alt="Bank icon"
                  className="h-16 w-16 flex-none rounded-lg bg-gray-100 object-contain object-center sm:h-16 sm:w-16"
                />
                <div>
                  <dt className="font-medium text-gray-900">{item.bankName} ({item.bankCode})</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">{item.accountNumber}</span>
                      <span className="block">{item.name}</span>
                      <span className="block"></span>
                    </address>
                  </dd>
                </div>
              </div>)}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

Payment.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}