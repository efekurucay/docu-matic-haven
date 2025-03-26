
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder = "Write your documentation...", className }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Adjust textarea height to content
  useEffect(() => {
    const textarea = document.getElementById("mdx-editor") as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div 
      className={cn(
        "relative border rounded-lg transition-all duration-200 overflow-hidden",
        isFocused ? "border-primary ring-1 ring-primary/30" : "border-border",
        className
      )}
    >
      <div className="flex justify-between items-center bg-muted px-4 py-2 border-b">
        <span className="text-sm font-medium text-muted-foreground">Markdown Editor</span>
        <div className="flex space-x-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <textarea
        id="mdx-editor"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full min-h-[300px] p-4 bg-background resize-none focus:outline-none font-mono text-sm"
      />
      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
        {value.length} characters
      </div>
    </div>
  );
};

export default Editor;
