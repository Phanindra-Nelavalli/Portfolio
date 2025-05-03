
import { useState, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (url: string) => void;
  currentImageUrl?: string;
  folder?: string;
  accept?: string;
}

const FileUpload = ({ onFileUpload, currentImageUrl, folder = "images", accept = "image/*" }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Create a preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    
    // Start upload automatically when file is selected
    handleUpload(selectedFile);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    
    // Create a preview
    const objectUrl = URL.createObjectURL(droppedFile);
    setPreview(objectUrl);
    
    // Start upload automatically when file is dropped
    handleUpload(droppedFile);
  };

  const handleUpload = async (selectedFile: File) => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    try {
      const storage = getStorage();
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(uploadProgress);
        }, 
        (error) => {
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive"
          });
          setIsUploading(false);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onFileUpload(downloadURL);
          toast({
            title: "Upload successful",
            description: "Your file has been uploaded"
          });
          setIsUploading(false);
          setProgress(100);
        }
      );
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`file-upload-container ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
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
          {isUploading ? "Uploading..." : "Drag & drop image here or click to browse"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG up to 5MB
        </p>
      </div>
      
      {isUploading && (
        <div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center mt-1 text-gray-500">{progress}% uploaded</p>
        </div>
      )}
      
      {preview && (
        <div className="file-upload-preview">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-48 object-contain mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
