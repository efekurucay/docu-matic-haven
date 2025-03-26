import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FileManager from "@/components/FileManager";
import Editor from "@/components/Editor";
import FileSystemNote from "@/components/FileSystemNote";
import { 
  getAllDocs, 
  getDocContent, 
  saveDoc, 
  deleteDoc, 
  createDoc, 
  getFolderContents 
} from "@/utils/mdxUtils";
import { toast } from "sonner";
import { Save, Eye, EyeOff, AlertTriangle, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

interface FileItem {
  name: string;
  path: string;
  isFolder: boolean;
}

const Admin = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      loadFolderContents(currentPath);
    }
  }, [isAuthenticated, currentPath]);

  const loadFolderContents = async (folderPath: string) => {
    setIsLoading(true);
    try {
      const contents = getFolderContents(folderPath);
      
      const fileItems: FileItem[] = contents.map(item => ({
        name: item.title,
        path: item.path || "",
        isFolder: item.isFolder || false
      }));
      
      setFiles(fileItems);
    } catch (error) {
      console.error("Error loading folder contents:", error);
      toast.error("Failed to load folder contents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFile = (filePath: string) => {
    if (selectedFile && content) {
      if (confirm("Do you want to save changes to the current file before switching?")) {
        handleSaveContent();
      }
    }
    
    setSelectedFile(filePath);
    try {
      const docContent = getDocContent(filePath);
      setContent(docContent);
    } catch (error) {
      console.error(`Error loading file ${filePath}:`, error);
      toast.error(`Failed to load file ${filePath}`);
    }
  };

  const handleCreateFile = async (filename: string, isFolder: boolean) => {
    if (!filename) return;
    
    let fullPath = currentPath 
      ? `${currentPath}/${filename}` 
      : filename;
    
    if (!isFolder && !filename.endsWith(".mdx")) {
      fullPath = `${fullPath}.mdx`;
    }
    
    try {
      if (isFolder) {
        await createDoc(fullPath, "", true);
        toast.success(`Created folder: ${filename}`);
      } else {
        const filenameWithoutExt = filename.endsWith(".mdx") 
          ? filename.slice(0, -4) 
          : filename;
        
        const initialContent = `# ${filenameWithoutExt.charAt(0).toUpperCase() + filenameWithoutExt.slice(1)}

This is a new document.

## Introduction

Start writing your content here.
`;
        
        await createDoc(fullPath, initialContent);
        toast.success(`Created file: ${filename}`);
      }
      
      loadFolderContents(currentPath);
      
      if (!isFolder) {
        handleSelectFile(fullPath);
      }
    } catch (error) {
      console.error(`Error creating ${isFolder ? 'folder' : 'file'} ${fullPath}:`, error);
      toast.error(`Failed to create ${isFolder ? 'folder' : 'file'} ${fullPath}`);
    }
  };

  const handleDeleteFile = async (filePath: string, isFolder: boolean) => {
    const filename = filePath.split('/').pop() || filePath;
    
    if (!confirm(`Are you sure you want to delete ${isFolder ? 'folder' : 'file'} ${filename}?`)) {
      return;
    }
    
    try {
      await deleteDoc(filePath, isFolder);
      toast.success(`Deleted ${isFolder ? 'folder' : 'file'}: ${filename}`);
      
      if (selectedFile === filePath) {
        setSelectedFile(null);
        setContent("");
      }
      
      loadFolderContents(currentPath);
    } catch (error) {
      console.error(`Error deleting ${isFolder ? 'folder' : 'file'} ${filePath}:`, error);
      toast.error(`Failed to delete ${isFolder ? 'folder' : 'file'} ${filename}`);
    }
  };

  const handleSaveContent = async () => {
    if (!selectedFile) return;
    
    setIsSaving(true);
    try {
      await saveDoc(selectedFile, content);
      toast.success("Document saved successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save document");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (login(username, password)) {
      toast.success("Logged in successfully");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderPreview = (markdown: string) => {
    let html = markdown.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, text) => {
      const level = hashes.length;
      return `<h${level} class="mt-6 mb-4 text-2xl font-bold">${text}</h${level}>`;
    });
    
    html = html.replace(/^(?!<h|<ul|<ol|<li|<pre|<blockquote)(.+)$/gm, '<p class="my-4">$1</p>');
    
    html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code>$2</code></pre>');
    
    html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
    
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6">$1</li>');
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc my-4">$&</ul>');
    
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6">$1</li>');
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ol class="list-decimal my-4">$&</ol>');
    
    return html;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-fluid pt-32 pb-20">
          <div className="max-w-md mx-auto animate-fade-in">
            <div className="bg-background rounded-lg shadow-sm border p-8">
              <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
              
              {loginError && (
                <div className="mb-6 bg-destructive/10 text-destructive p-3 rounded-md flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>{loginError}</span>
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn btn-primary py-2 px-4 rounded-md"
                  >
                    Login
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Demo credentials: admin / password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-fluid pt-24 pb-16">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <button
              className={cn(
                "btn inline-flex items-center",
                isPreviewMode ? "btn-primary" : "btn-secondary"
              )}
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  <span>Edit Mode</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  <span>Preview Mode</span>
                </>
              )}
            </button>
            <button
              className="btn btn-primary inline-flex items-center"
              onClick={handleSaveContent}
              disabled={!selectedFile || isSaving}
            >
              {isSaving ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              <span>Save</span>
            </button>
            <button
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => {
                logout();
                toast.success("Logged out successfully");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <FileSystemNote />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
          <div className="lg:col-span-1">
            <FileManager
              files={files}
              currentPath={currentPath}
              selectedFile={selectedFile}
              onSelectFile={handleSelectFile}
              onCreateFile={handleCreateFile}
              onDeleteFile={handleDeleteFile}
              onNavigate={handleNavigate}
            />
          </div>
          
          <div className="lg:col-span-2">
            {selectedFile ? (
              isPreviewMode ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 border-b flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Preview: {selectedFile.split('/').pop() || selectedFile}
                    </span>
                    <div className="flex space-x-1">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div 
                    className="p-6 prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
                  />
                </div>
              ) : (
                <Editor
                  value={content}
                  onChange={setContent}
                  className="h-full"
                />
              )
            ) : (
              <div className="border rounded-lg p-12 text-center">
                <h3 className="text-lg font-medium mb-2">No file selected</h3>
                <p className="text-muted-foreground mb-6">
                  Select a file from the sidebar or create a new one to start editing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
