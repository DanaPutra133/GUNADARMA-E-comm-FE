import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Menampilkan keranjang produk yang ditambahkan
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Keranjangmu</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between items-center">
                <UserCartItemsContent cartItem={item} />
                <div className="text-right">
                  <span
                    className={`${
                      item?.salePrice > 0 ? "line-through" : ""
                    } text-lg font-semibold text-primary`}
                  >
                    Rp{new Intl.NumberFormat("id-ID").format(item?.price || 0)}
                  </span>
                  {item?.salePrice > 0 ? (
                    <span className="text-lg font-bold block">
                      Rp{new Intl.NumberFormat("id-ID").format(item?.salePrice || 0)}
                    </span>
                  ) : null}
                </div>
              </div>
            ))
          : <p className="text-center text-gray-500">Keranjang kosong.</p>}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            Rp{new Intl.NumberFormat("id-ID").format(totalCartAmount || 0)}
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
