import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "@/store/shop/order-slice";
import { deleteCartItem } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [qrisImageUrl, setQrisImageUrl] = useState("");
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    if (cartItems.items.length === 0) {
      toast({
        title: "keranjang kamu kosong, isi dulu yuk...",
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

    const newOrderData = {
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

    dispatch(createNewOrder(newOrderData)).then(() => {
      setQrisImageUrl("https://telegra.ph/file/fd7714ee03f6970d8fb30.jpg");
      setIsOrderCreated(true);
    });
  }

  async function handleSelesai() {
    if (!uploadedFile) {
      toast({
        title: "Upload bukti pembayaran kamu!",
        variant: "destructive",
      });
      return;
    }

    // Hapus semua item di keranjang
    if (cartItems.items && cartItems.items.length > 0) {
      for (const item of cartItems.items) {
        await dispatch(
          deleteCartItem({ userId: user?.id, productId: item.productId })
        );
      }
    }

    // Simulasi pengiriman data ke server
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      toast({
        classname: "w-full py-2 px-4 bg-zinc-100 text-sky-400 rounded-lg hover:bg-sky-800 font-bold",
        title: "Data telah di kirim ke admin untuk di proses.",
        variant: "success",
      });
      navigate("/shop/home"); // user di lempar ke home
    }, 2000); 
  }

  function handleFileUpload(event) {
    setUploadedFile(event.target.files[0]);
  }

  return (
    <div className="flex flex-col">
      {isOrderCreated ? (
        <div className="flex flex-col items-center">
          <img src={qrisImageUrl} alt="QRIS Code" className="w-80 h-90" />
          <p className="mt-4">Scan QRIS ini untuk pembayaran.</p>
          <input
            type="file"
            onChange={handleFileUpload}
            className="mt-4"
          />
          <Button onClick={handleSelesai} className="mt-4">
            Selesai
          </Button>
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
                  <div key={item.productId} className="flex justify-between items-center">
                    <UserCartItemsContent cartItem={item} />            
                  </div>
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  Rp{new Intl.NumberFormat("id-ID").format(totalCartAmount || 0)}
                </span>
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
      {showPopup && (
        <div className="popup w-full py-2 px-4 bg-zinc-100 text-sky-400 rounded-lg hover:bg-sky-800 font-bold">
          <p>Data dikirim ke admin untuk diproses. Anda akan kembali ke menu utama.</p>
        </div>
      )}
    </div>
  );
}

export default ShoppingCheckout;

// Add CSS for popup
<style jsx>{`
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
    text-align: center;
  }
`}</style>
