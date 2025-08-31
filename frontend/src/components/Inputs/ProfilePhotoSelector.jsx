import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6 gap-3">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 relative shadow-lg">
          <LuUser className="text-5xl text-white/80" />
          <button
            type="button"
            onClick={onChooseFile}
            className="absolute -bottom-2 -right-2 w-9 h-9 flex items-center justify-center 
              bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md 
              transition-transform duration-200 hover:scale-110"
          >
            <LuUpload className="text-lg" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover shadow-lg ring-2 ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-2 -right-2 w-9 h-9 flex items-center justify-center 
              bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md 
              transition-transform duration-200 hover:scale-110"
          >
            <LuTrash className="text-lg" />
          </button>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">Upload Profile Picture</p>
    </div>
  );
};

export default ProfilePhotoSelector;
