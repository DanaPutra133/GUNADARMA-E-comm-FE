import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              Rp{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">Rp{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Ubah
          </Button>
          <Button onClick={() => setShowDeleteDialog(true)}>Hapus</Button>
        </CardFooter>
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
          <div
            className="relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm transform transition-transform duration-300 scale-95 animate-slide-up"
          >
            <h2 className="text-lg font-bold text-gray-800">
              Konfirmasi Hapus Produk
            </h2>
            <p className="mt-2 text-gray-600">
              Produk yang sudah di hapus tidak dapat di kembalikan.
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
                  handleDelete(product?._id);
                  setShowDeleteDialog(false);
                }}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default AdminProductTile;
