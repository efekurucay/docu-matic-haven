
import React from "react";
import { AlertCircle } from "lucide-react";

const FileSystemNote = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="text-amber-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-amber-900 mb-1">Dosya Sistemi Notları</h4>
          <p className="text-amber-700 text-sm">
            Bu demo uygulamada, dosyalar <strong>tarayıcı belleğinde</strong> simüle edilmektedir.
            Gerçek bir uygulamada, dosyaların kalıcı olarak saklanması için bir backend API'si
            ve dosya sistemi erişimi gerekir. Sunucu tarafında çalışan bir Node.js uygulaması örnekleri
            dosyalarını server klasöründe bulabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileSystemNote;
