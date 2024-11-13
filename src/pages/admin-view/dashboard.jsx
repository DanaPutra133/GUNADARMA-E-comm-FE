import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
//peringatan jika tidak ada gambar
  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      setWarningMessage("Harus ada gambar yang diunggah!"); // Tampilkan peringatan jika tidak ada gambar di imageupload
      return;
    }
    //OWKOWKOKWO DI RESET
    setWarningMessage(""); // Reset peringatan jika ada gambar
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      {/* di sini buat alert nya */}
      {warningMessage && (
        <p className="text-red-500 mt-2 text-sm">{warningMessage}</p>
      )}
      {/* button unggah nya */}
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Unggah foto iklan
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem, index) => (
              <div key={index} className="h-auto max-w-full rounded-lg">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                  alt="Feature Image"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
