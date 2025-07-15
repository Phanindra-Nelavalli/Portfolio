import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (url: string) => void;
  currentImageUrl?: string;
  folder?: string; // Cloudinary uses folder in 'public_id' if needed
  accept?: string;
}

const CLOUDINARY_UPLOAD_PRESET = "unsigned_preset"; // 🔁 Replace with actual
const CLOUDINARY_CLOUD_NAME = "dte5onh3s"; // 🔁 Replace with actual

const FileUpload = ({
  onFileUpload,
  currentImageUrl,
  folder = "portfolio",
  accept = "image/*",
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null
  );
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    handleUpload(selectedFile);
  };

  const handleDrag = (e: React.DragEvent, isEnter: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEnter);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    const objectUrl = URL.createObjectURL(droppedFile);
    setPreview(objectUrl);
    handleUpload(droppedFile);
  };

  const handleUpload = async (selectedFile: File) => {
    if (!selectedFile) return;

    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folder);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`
      );

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          onFileUpload(response.secure_url);
          toast({
            title: "Upload successful",
            description: "Image uploaded to Cloudinary",
          });
        } else {
          toast({
            title: "Upload failed",
            description: `Error: ${xhr.statusText}`,
            variant: "destructive",
          });
        }
        setIsUploading(false);
      };

      xhr.onerror = () => {
        toast({
          title: "Upload failed",
          description: "An error occurred during upload",
          variant: "destructive",
        });
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (err: any) {
      toast({
        title: "Upload error",
        description: err.message || "Unknown error",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`file-upload-container ${isDragging ? "dragging" : ""}`}
        onDragEnter={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDragOver={(e) => handleDrag(e, true)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="file-upload-input"
        />

        <Upload className="h-8 w-8 text-gray-400 mb-2" />

        <p className="text-sm font-medium text-gray-700">
          {isUploading
            ? "Uploading..."
            : "Drag & drop image here or click to browse"}
        </p>
        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to ~5MB</p>
      </div>

      {isUploading && (
        <div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center mt-1 text-gray-500">
            {progress}% uploaded
          </p>
        </div>
      )}

      {preview && (
        <div className="file-upload-preview">
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 object-contain mx-auto rounded-md border"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
