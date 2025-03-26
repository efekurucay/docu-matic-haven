
// Bu dosya, gerçek bir sunucu API'si oluşturulduğunda nasıl iletişim kurulacağını gösterir
// React tabanlı bir frontend uygulamasında doğrudan dosya sistemi erişimi olmadığını unutmayın
// Bu işlemler için Node.js, Express veya Next.js API Routes gibi bir backend gerekir

import { DocMeta } from "../utils/mdxUtils";

// API temel URL'i 
const API_URL = 'http://localhost:3001/api/docs'; // örneğin

export const fetchFolderContents = async (folderPath: string): Promise<DocMeta[]> => {
  const response = await fetch(`${API_URL}/folder?path=${encodeURIComponent(folderPath)}`);
  if (!response.ok) {
    throw new Error('Klasör içeriği alınamadı');
  }
  return await response.json();
};

export const fetchDocContent = async (path: string): Promise<string> => {
  const response = await fetch(`${API_URL}/content?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error('Doküman içeriği alınamadı');
  }
  const data = await response.json();
  return data.content;
};

export const createNewDoc = async (path: string, content: string, isFolder: boolean = false): Promise<void> => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, content, isFolder }),
  });
  
  if (!response.ok) {
    throw new Error('Doküman oluşturulamadı');
  }
};

export const updateDoc = async (path: string, content: string): Promise<void> => {
  const response = await fetch(`${API_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, content }),
  });
  
  if (!response.ok) {
    throw new Error('Doküman güncellenemedi');
  }
};

export const deleteDocument = async (path: string, isFolder: boolean = false): Promise<void> => {
  const response = await fetch(`${API_URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, isFolder }),
  });
  
  if (!response.ok) {
    throw new Error('Doküman silinemedi');
  }
};
