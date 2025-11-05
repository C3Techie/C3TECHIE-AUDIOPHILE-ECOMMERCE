import { useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/section/Button/Button'
import { CartProduct } from '@/types'
import { CheckoutFormData } from '../CheckoutForm/schema'
import { getFormattedPrice, getShortenedProductName } from '@/utils/cart'
import OrderConfirmationIcon from '@/assets/checkout/icon-order-confirmation.svg'

interface OrderConfirmationProps {
  orderData: CheckoutFormData
  cart: CartProduct[]
  grandTotal: number
  onClose: () => void
}

export function OrderConfirmation({ cart, grandTotal, onClose }: OrderConfirmationProps) {
  const firstItem = cart[0]
  const otherItemsCount = cart.length - 1

  useEffect(() => {
    // No scroll locking - allow page to scroll freely
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-[5] bg-neutral-900/40" onClick={onClose} />
      <div className="fixed inset-0 z-[6] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-8 pt-[calc(125px+var(--navigation-height))] pb-8">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-[540px] h-[581px] rounded-lg bg-neutral-100 p-8 md:p-12"
          >
          <div className="mb-6 md:mb-8">
            <Image
              src={OrderConfirmationIcon}
              width={64}
              height={64}
              alt="Order confirmed"
              priority
            />
          </div>
          <h2 className="mb-4 md:mb-6 text-2xl font-bold uppercase text-neutral-900 lg:text-3xl">
            Thank you<br />for your order
          </h2>
          <p className="mb-6 md:mb-8 text-base text-neutral-900/50">
            You will receive an email confirmation shortly.
          </p>

          <div className="mb-6 md:mb-[2.875rem] overflow-hidden rounded-lg md:flex">
            <div className="bg-neutral-400 p-6 md:flex-1 md:rounded-l-lg">
              <div className="flex items-start gap-4">
                <Image
                  width={64}
                  height={64}
                  src={firstItem.image}
                  alt={firstItem.name}
                  className="rounded-lg"
                  priority
                />
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="font-bold">{getShortenedProductName(firstItem.name)}</p>
                    <p className="text-sm font-bold tracking-[0] text-neutral-900/50">
                      $ {getFormattedPrice(firstItem.price)}
                    </p>
                  </div>
                  <span className="text-base opacity-50">x{firstItem.quantity}</span>
                </div>
              </div>
              {otherItemsCount > 0 && (
                <>
                  <div className="my-3 h-[1px] w-full bg-neutral-900/[8%]" />
                  <p className="text-center text-[0.75rem] tracking-[-0.013em] opacity-50">
                    and {otherItemsCount} other item{otherItemsCount > 1 ? 's' : ''}
                  </p>
                </>
              )}
            </div>
            <div className="bg-neutral-900 p-6 md:flex-1 md:flex md:flex-col md:justify-center md:rounded-r-lg">
              <p className="text-base uppercase text-neutral-100/50">Grand total</p>
              <p className="mt-2 text-lg font-bold text-neutral-100">
                $ {getFormattedPrice(grandTotal)}
              </p>
            </div>
          </div>

          <Button
            className="w-full"
            intent="primary"
            fullWidth
            onClick={onClose}
          >
            Back to home
          </Button>
          </div>
        </div>
      </div>
    </>
  )
} 