import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [qrisImageUrl, setQrisImageUrl] = useState(""); // URL untuk gambar QRIS
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleCheckout() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Pilih 1 alamat! Tekan alamatnya.",
        variant: "destructive",
      });

      return;
    }

    // Membuat data order
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "qris",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    // Dispatch action untuk membuat order
    dispatch(createNewOrder(orderData)).then(() => {
      // Mengatur URL gambar QRIS setelah checkout
      setQrisImageUrl("https://api.betabotz.eu.org/api/tools/get-upload?id=s/sNSvw");
      setIsOrderCreated(true);
    });
  }

  return (
    <div className="flex flex-col">
      {isOrderCreated ? (
        <div className="flex flex-col items-center">
          {/* Tampilkan gambar QRIS setelah order dibuat */}
          <img src={qrisImageUrl} alt="QRIS Code" className="w-80 h-90" />
          <p className="mt-4">scan qris ini untuk pembayaran.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent key={item.productId} cartItem={item} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">Rp{totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button onClick={handleCheckout} className="w-full">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCheckout;
