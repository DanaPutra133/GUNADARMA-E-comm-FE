import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { useState } from "react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State for the confirmation dialog

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Alamat: {addressInfo?.address}</Label>
        <Label>Kota: {addressInfo?.city}</Label>
        <Label>Kode pos: {addressInfo?.pincode}</Label>
        <Label>No hp: {addressInfo?.phone}</Label>
        <Label>Catatan: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => setShowDeleteDialog(true)}>Delete</Button>
      </CardFooter>

      {/* Confirmation dialog for delete */}
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
              Konfirmasi Hapus Alamat
            </h2>
            <p className="mt-2 text-gray-600">
              Apakah Anda yakin ingin menghapus alamat ini?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              {/* Batalkan */}
              <Button
                variant="secondary"
                onClick={() => setShowDeleteDialog(false)}
              >
                Batalkan
              </Button>
              {/* Hapus */}
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteAddress(addressInfo);
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

export default AddressCard;
