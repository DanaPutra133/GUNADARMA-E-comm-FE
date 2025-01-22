import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State untuk dialog konfirmasi
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Hanya ada ${getTotalStock} barang tersisa`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Produk di keranjang berhasil diperbarui",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Produk di keranjang berhasil dihapus",
        });
      }
    });
  }

  const pangerangay = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          {pangerangay(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              cartItem?.quantity
          )}
        </p>
        <Trash
          onClick={() => setShowDeleteDialog(true)} // Menampilkan dialog konfirmasi
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>

      {/* Dialog konfirmasi hapus */}
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowDeleteDialog(false)}
          ></div>

          {/* Pop-up box */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-bold text-gray-800">
              Konfirmasi Hapus Item
            </h2>
            <p className="mt-2 text-gray-600">
              Apakah Anda yakin ingin menghapus item ini dari keranjang?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              {/* Tombol Batalkan */}
              <Button
                variant="secondary"
                onClick={() => setShowDeleteDialog(false)}
              >
                Batalkan
              </Button>
              {/* Tombol Hapus */}
              <Button
                variant="danger"
                onClick={() => {
                  handleCartItemDelete(cartItem);
                  setShowDeleteDialog(false);
                }}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCartItemsContent;
