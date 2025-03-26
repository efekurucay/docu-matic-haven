
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { File, Folder, FolderOpen, Plus, Search, Trash, ArrowLeft, ArrowRight } from "lucide-react";

interface FileItem {
  name: string;
  path: string;
  isFolder: boolean;
}

interface FileManagerProps {
  files: FileItem[];
  currentPath: string;
  selectedFile: string | null;
  onSelectFile: (file: string) => void;
  onCreateFile: (filename: string, isFolder: boolean) => void;
  onDeleteFile: (filename: string, isFolder: boolean) => void;
  onNavigate: (path: string) => void;
}

const FileManager: React.FC<FileManagerProps> = ({
  files,
  currentPath,
  selectedFile,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onCreateFile(newFileName.trim(), isCreatingFolder);
      setNewFileName("");
      setIsCreatingFile(false);
      setIsCreatingFolder(false);
    }
  };

  // Parse the current path to display breadcrumbs
  const pathParts = currentPath.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Root', path: '' },
    ...pathParts.map((part, index) => ({
      name: part,
      path: pathParts.slice(0, index + 1).join('/')
    }))
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-3 border-b bg-muted flex items-center justify-between">
        <div className="flex items-center">
          <FolderOpen className="h-5 w-5 text-primary mr-2" />
          <span className="font-medium">Files</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsCreatingFile(true);
              setIsCreatingFolder(false);
            }}
            className="p-1.5 rounded-md hover:bg-background transition-colors"
            aria-label="Create new file"
            title="Create new file"
          >
            <File className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setIsCreatingFile(true);
              setIsCreatingFolder(true);
            }}
            className="p-1.5 rounded-md hover:bg-background transition-colors"
            aria-label="Create new folder"
            title="Create new folder"
          >
            <Folder className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="p-2 bg-muted/50 border-b flex items-center overflow-x-auto">
        <div className="flex items-center space-x-1 text-xs">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              <button
                onClick={() => onNavigate(crumb.path)}
                className={cn(
                  "px-1.5 py-1 rounded hover:bg-muted transition-colors",
                  index === breadcrumbs.length - 1 ? "font-medium" : ""
                )}
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-3 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Creation form for files or folders */}
      {isCreatingFile && (
        <div className="p-3 border-t animate-slide-down">
          <div className="flex items-center">
            {isCreatingFolder ? (
              <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
            ) : (
              <File className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder={isCreatingFolder ? "folder-name" : "filename.mdx"}
              className="flex-1 py-2 px-3 bg-muted/50 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-colors"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCreateFile()}
            />
            <button
              onClick={handleCreateFile}
              className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Create
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {isCreatingFolder 
              ? "Create a new folder to organize your files." 
              : "Create a new document with .mdx extension for Markdown content."}
          </p>
        </div>
      )}

      <div className="max-h-96 overflow-y-auto">
        {/* Back button when in a subfolder */}
        {currentPath && (
          <div 
            className="flex items-center p-3 cursor-pointer hover:bg-muted/50 transition-colors border-b"
            onClick={() => {
              const parts = currentPath.split('/');
              parts.pop();
              onNavigate(parts.join('/'));
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Back to parent folder</span>
          </div>
        )}
        
        {filteredFiles.length > 0 ? (
          <ul className="divide-y">
            {filteredFiles.map((file) => (
              <li key={file.path} className="group">
                <div
                  className={cn(
                    "flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                    selectedFile === file.path && !file.isFolder && "bg-muted"
                  )}
                  onClick={() => {
                    if (file.isFolder) {
                      onNavigate(file.path);
                    } else {
                      onSelectFile(file.path);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {file.isFolder ? (
                      <Folder className="h-4 w-4 mr-2 text-primary" />
                    ) : (
                      <File className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFile(file.path, file.isFolder);
                    }}
                    className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Delete ${file.name}`}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            {searchTerm ? "No matching files" : "No files"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
