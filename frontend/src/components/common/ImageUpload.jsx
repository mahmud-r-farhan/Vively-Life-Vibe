import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const ImageUpload = ({ onChange, defaultImage }) => {
  const [preview, setPreview] = useState(defaultImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error('File size exceeds 3MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        return;
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange(null);
    URL.revokeObjectURL(preview);
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profilePicture"
      />
      <label
        htmlFor="profilePicture"
        className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full rounded-full object-cover" />
        ) : (
          <Upload className="w-8 h-8 text-gray-500" />
        )}
      </label>
      {preview && (
        <button
          onClick={removeImage}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ImageUpload;