
// Bu dosya, frontend uygulamanızın parçası olmayıp, ayrı bir Node.js server uygulamasıdır
// Bu bir örnek olup, gerçek uygulamanızda kullanmak için ayrıca kurulum yapmanız gerekir

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Frontend'e CORS izni
app.use(express.json()); // JSON gövdeli istekleri ayrıştırır

// Docs dizini için temel dizin - bu özellikle projenizin yapılandırmasına göre değişecektir
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// Bir dizinin içeriğini listeler
app.get('/api/docs/folder', async (req, res) => {
  try {
    const folderPath = req.query.path || '';
    const fullPath = path.join(DOCS_DIR, folderPath);
    
    // Dizinin varlığını kontrol et
    try {
      await fs.access(fullPath);
    } catch (error) {
      return res.status(404).json({ error: 'Klasör bulunamadı' });
    }
    
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const contents = entries.map(entry => {
      const entryPath = path.join(folderPath, entry.name);
      const isFolder = entry.isDirectory();
      
      return {
        slug: entryPath,
        title: entry.name.replace(/\.mdx?$/, ''),
        path: entryPath,
        isFolder
      };
    });
    
    res.json(contents);
  } catch (error) {
    console.error('Klasör içeriği alınırken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir dokümanın içeriğini okur
app.get('/api/docs/content', async (req, res) => {
  try {
    const docPath = req.query.path || '';
    let fullPath = path.join(DOCS_DIR, docPath);
    
    // Eğer dosya uzantısı belirtilmemişse .mdx ekle
    if (!fullPath.endsWith('.mdx') && !fullPath.endsWith('.md')) {
      fullPath += '.mdx';
    }
    
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      res.json({ content });
    } catch (error) {
      res.status(404).json({ error: 'Doküman bulunamadı' });
    }
  } catch (error) {
    console.error('Doküman içeriği alınırken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni bir doküman veya klasör oluşturur
app.post('/api/docs/create', async (req, res) => {
  try {
    const { path: docPath, content, isFolder } = req.body;
    const fullPath = path.join(DOCS_DIR, docPath);
    
    if (isFolder) {
      // Klasör oluştur
      await fs.mkdir(fullPath, { recursive: true });
      res.json({ message: 'Klasör oluşturuldu' });
    } else {
      // Dosya oluştur (gerekirse üst klasörleri de oluştur)
      const dirPath = path.dirname(fullPath);
      await fs.mkdir(dirPath, { recursive: true });
      
      // Eğer dosya uzantısı belirtilmemişse .mdx ekle
      const filePath = fullPath.endsWith('.mdx') || fullPath.endsWith('.md') 
        ? fullPath 
        : `${fullPath}.mdx`;
      
      await fs.writeFile(filePath, content);
      res.json({ message: 'Doküman oluşturuldu' });
    }
  } catch (error) {
    console.error('Doküman oluşturulurken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir dokümanı günceller
app.put('/api/docs/update', async (req, res) => {
  try {
    const { path: docPath, content } = req.body;
    let fullPath = path.join(DOCS_DIR, docPath);
    
    // Eğer dosya uzantısı belirtilmemişse .mdx ekle
    if (!fullPath.endsWith('.mdx') && !fullPath.endsWith('.md')) {
      fullPath += '.mdx';
    }
    
    await fs.writeFile(fullPath, content);
    res.json({ message: 'Doküman güncellendi' });
  } catch (error) {
    console.error('Doküman güncellenirken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir dokümanı veya klasörü siler
app.delete('/api/docs/delete', async (req, res) => {
  try {
    const { path: docPath, isFolder } = req.body;
    const fullPath = path.join(DOCS_DIR, docPath);
    
    if (isFolder) {
      // Klasörü ve tüm içeriğini sil (recursive)
      await fs.rm(fullPath, { recursive: true, force: true });
    } else {
      // Dosyayı sil
      let filePath = fullPath;
      // Eğer dosya uzantısı belirtilmemişse .mdx veya .md olarak dene
      if (!filePath.endsWith('.mdx') && !filePath.endsWith('.md')) {
        // Önce .mdx'i dene
        try {
          await fs.access(`${filePath}.mdx`);
          filePath += '.mdx';
        } catch {
          // .mdx yoksa .md'yi dene
          filePath += '.md';
        }
      }
      
      await fs.unlink(filePath);
    }
    
    res.json({ message: isFolder ? 'Klasör silindi' : 'Doküman silindi' });
  } catch (error) {
    console.error('Doküman silinirken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Doküman API sunucusu http://localhost:${PORT} adresinde çalışıyor`);
  
  // Docs dizininin varlığını kontrol et ve gerekirse oluştur
  fs.mkdir(DOCS_DIR, { recursive: true })
    .then(() => console.log(`Docs dizini kontrol edildi: ${DOCS_DIR}`))
    .catch(err => console.error('Docs dizini oluşturulurken hata:', err));
});
