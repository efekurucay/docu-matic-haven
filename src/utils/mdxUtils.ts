
// Gerçek bir uygulamada bu dosya sunucu tarafında çalışır ve dosya sistemine erişir
// Şu an için demo amaçlı aynı verileri kullanacağız, ancak nasıl implemente edilebileceğini göstereceğim

export interface DocMeta {
  slug: string;
  title: string;
  category?: string;
  description?: string;
  path?: string; // Full path including folders
  isFolder?: boolean;
}

// Mock data yapısını sabit tutalım
export const mockDocs = {
  // Root level files
  "introduction": `# Introduction

Welcome to the DocuMatic documentation site. This platform helps you create, manage, and publish documentation with ease.

## Features

- **MDX Support:** Write documentation in Markdown with JSX components
- **Admin Panel:** Manage your documentation through a user-friendly interface
- **Modern Design:** Clean, minimalist interface focused on readability

## Getting Started

To get started, check out the [installation guide](/docs/installation) or [quick start guide](/docs/quick-start).`,

  "installation": `# Installation

## Prerequisites

- Node.js 16 or higher
- NPM or Yarn

## Setup

1. Clone the repository:

\`\`\`bash
git clone https://github.com/docu-matic/docu-matic.git
cd docu-matic
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Your documentation site should now be running at http://localhost:3000.`,

  // Course Notes folder
  "Ders Notları/matematik/donem1": `# Matematik - Dönem 1

Bu döküman, Matematik dersinin 1. dönem notlarını içermektedir.

## Konular

1. Sayılar
2. Cebir
3. Geometri
4. Analiz

## Detaylı İçerik

### 1. Sayılar

Doğal sayılar, tam sayılar, rasyonel sayılar ve reel sayılar hakkında temel bilgiler.

### 2. Cebir

Denklemler, eşitsizlikler ve fonksiyonlar hakkında temel bilgiler.

### 3. Geometri

Üçgenler, dörtgenler ve çemberler hakkında temel bilgiler.

### 4. Analiz

Türev ve integral hakkında temel bilgiler.`,

  "Ders Notları/matematik/donem2": `# Matematik - Dönem 2

Bu döküman, Matematik dersinin 2. dönem notlarını içermektedir.

## Konular

1. İleri Analiz
2. İleri Cebir
3. İleri Geometri
4. Olasılık ve İstatistik

## Detaylı İçerik

### 1. İleri Analiz

Çok değişkenli fonksiyonlar, kısmi türevler ve çoklu integraller.

### 2. İleri Cebir

Matrisler, determinantlar ve lineer denklem sistemleri.

### 3. İleri Geometri

Uzayda vektörler, düzlemler ve doğrular.

### 4. Olasılık ve İstatistik

Olasılık teorisi, rassal değişkenler ve istatistiksel dağılımlar.`,

  "Ders Notları/fizik/mekanik": `# Fizik - Mekanik

Bu döküman, Fizik dersinin Mekanik konusunu içermektedir.

## Konular

1. Kinematik
2. Dinamik
3. Statik
4. Enerji ve İş

## Detaylı İçerik

### 1. Kinematik

Hareket, hız ve ivme kavramları.

### 2. Dinamik

Kuvvet, Newton'un hareket yasaları ve momentum.

### 3. Statik

Denge, moment ve ağırlık merkezi.

### 4. Enerji ve İş

Kinetik enerji, potansiyel enerji, iş ve güç.`,

  "Ders Notları/fizik/elektrik": `# Fizik - Elektrik

Bu döküman, Fizik dersinin Elektrik konusunu içermektedir.

## Konular

1. Elektrostatik
2. Elektrik Alan
3. Elektrik Akımı
4. Devreler

## Detaylı İçerik

### 1. Elektrostatik

Elektrik yük, Coulomb yasası ve elektrik potansiyel.

### 2. Elektrik Alan

Elektrik alan, elektrik akı ve Gauss yasası.

### 3. Elektrik Akımı

Akım yoğunluğu, iletkenlik ve direnç.

### 4. Devreler

Seri ve paralel devreler, Kirchhoff yasaları ve RC devreleri.`,

  "quick-start": `# Quick Start

## Creating Your First Document

1. Navigate to the Admin Panel by clicking on "Admin" in the main navigation.
2. Click the "+" button to create a new document.
3. Enter a filename for your document (e.g., "getting-started").
4. Write your content using Markdown and MDX syntax.
5. Click "Save" to publish your document.

## Markdown Basics

Here are some basic Markdown syntax examples:

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image alt text](image-url.jpg)
\`\`\`

## MDX Components

You can also use custom React components within your Markdown:

\`\`\`jsx
<Alert type="info">
  This is an informational message.
</Alert>

<CodeBlock language="javascript">
  const greeting = "Hello, world!";
  console.log(greeting);
</CodeBlock>
\`\`\``,

  "architecture": `# Architecture

The DocuMatic platform is built on a modern stack that includes:

- **Next.js** for server-side rendering and static site generation
- **MDX** for writing content with React components
- **React** for the user interface
- **Tailwind CSS** for styling

## Directory Structure

\`\`\`
docu-matic/
├── components/     # React components
├── pages/          # Next.js pages and routes
├── docs/           # Documentation content (MDX)
├── public/         # Static assets
├── styles/         # CSS and style definitions
└── utils/          # Utility functions
\`\`\`

## Content Flow

1. MDX files are stored in the \`docs/\` directory
2. The admin panel provides a UI for managing these files
3. Next.js uses dynamic routing to map URLs to the corresponding MDX files
4. MDX content is rendered with custom components for enhanced presentation`,

  "components": `# Components

DocuMatic provides a set of built-in components to enhance your documentation:

## Alert

Use the Alert component to highlight important information:

\`\`\`jsx
<Alert type="info">This is an informational alert</Alert>
<Alert type="warning">This is a warning alert</Alert>
<Alert type="error">This is an error alert</Alert>
<Alert type="success">This is a success alert</Alert>
\`\`\`

## CodeBlock

The CodeBlock component provides syntax highlighting for code snippets:

\`\`\`jsx
<CodeBlock language="javascript">
  const hello = "world";
  console.log(hello);
</CodeBlock>
\`\`\`

## Tabs

The Tabs component allows you to organize content into tabbed sections:

\`\`\`jsx
<Tabs>
  <Tab label="JavaScript">
    JavaScript content here...
  </Tab>
  <Tab label="Python">
    Python content here...
  </Tab>
</Tabs>
\`\`\``,

  "data-flow": `# Data Flow

DocuMatic uses a straightforward data flow to manage documentation content:

1. **Content Creation:** Authors create content in MDX format
2. **Storage:** Content is stored as MDX files in the \`docs/\` directory
3. **Processing:** When accessed, MDX content is processed and converted to HTML
4. **Rendering:** The processed content is rendered with custom components
5. **Delivery:** The final HTML is delivered to the client

## Content Structure

Each MDX file should include:

- A top-level heading (# Title)
- Content organized with headings, paragraphs, lists, etc.
- Optional metadata in frontmatter format

Example frontmatter:

\`\`\`yaml
---
title: Getting Started
description: Learn how to use DocuMatic
category: Tutorials
order: 1
---
\`\`\`

## Search Indexing

DocuMatic automatically indexes all content for search functionality, extracting:

- Headings
- Paragraphs
- Lists
- Code blocks

No additional configuration is needed for basic search functionality.`,

  "performance": `# Performance Optimization

DocuMatic is designed for optimal performance out of the box. Here are some key optimization techniques used:

## Static Site Generation

DocuMatic uses Next.js's static site generation (SSG) to pre-render pages at build time, resulting in:

- Faster page loads
- Improved SEO
- Reduced server load

## Code Splitting

The application uses automatic code splitting to:

- Load only the JavaScript needed for each page
- Reduce initial bundle size
- Improve time-to-interactive

## Image Optimization

Images are automatically optimized through:

- Lazy loading
- WebP conversion (when supported)
- Responsive sizing

## Caching Strategy

DocuMatic implements effective caching through:

- ETag headers
- Cache-Control headers
- Service Worker for offline support`,

  "security": `# Security

Security is a top priority in DocuMatic. Here's how we keep your documentation secure:

## Authentication

The admin panel is protected by:

- Strong authentication requirements
- Session timeout mechanisms
- CSRF protection

## Content Security

All user-generated content undergoes:

- Sanitization to prevent XSS attacks
- Validation to ensure format compliance
- Scope limitation to prevent unauthorized access

## Dependency Management

We maintain security through:

- Regular dependency updates
- Security vulnerability scanning
- Minimal dependency footprint

## Deployment Security

Secure deployment practices include:

- HTTPS enforcement
- Strict Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)`,

  "deployment": `# Deployment

Deploy your DocuMatic site to various platforms with these instructions:

## Vercel (Recommended)

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Import your repository in Vercel
3. Configure build settings:
   - Build Command: \`npm run build\`
   - Output Directory: \`out\`
4. Deploy

## Netlify

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Import your repository in Netlify
3. Configure build settings:
   - Build Command: \`npm run build\`
   - Publish Directory: \`out\`
4. Deploy

## Self-hosted

1. Build your site:
   \`\`\`bash
   npm run build
   \`\`\`
2. The output will be in the \`out\` directory
3. Deploy the contents of \`out\` to your web server
4. Configure your web server to serve the static files

## Environment Variables

For production builds, set these environment variables:

- \`NEXT_PUBLIC_SITE_URL\`: Your site's public URL
- \`NEXT_PUBLIC_API_URL\`: Your API URL (if applicable)
- \`NEXT_PUBLIC_GA_ID\`: Google Analytics ID (optional)`
};

// Helper to handle path slash normalization
const normalizePath = (path: string): string => {
  return path.replace(/\\/g, '/');
};

// Helper to parse path into folders and filename
const parsePath = (path: string): { folders: string[], filename: string } => {
  const normalizedPath = normalizePath(path);
  const parts = normalizedPath.split('/');
  const filename = parts.pop() || '';
  return { folders: parts, filename };
};

// Gerçek bir uygulamada bu fonksiyon sunucu tarafından dosya sisteminden okur
export const getDocContent = (slug: string): string => {
  // Bu aslında bir API çağrısı olacak:
  // const response = await fetch(`/api/docs/content?path=${slug}`);
  // const data = await response.json();
  // return data.content;
  
  // Şimdilik mock verilerini kullanalım
  return mockDocs[slug as keyof typeof mockDocs] || `# Not Found\n\nThe document "${slug}" was not found.`;
};

export const getDocTitle = (content: string): string => {
  const titleMatch = content.match(/^# (.*$)/m);
  return titleMatch ? titleMatch[1] : "Untitled Document";
};

// Tüm dokümanları klasör yapısında organize eder
export const getAllDocs = (): DocMeta[] => {
  // Gerçek uygulamada bu API çağrısı olurdu:
  // const response = await fetch('/api/docs/list');
  // return await response.json();
  
  const docs: DocMeta[] = [];
  const folders: { [key: string]: boolean } = {}; // To track folders
  
  Object.keys(mockDocs).forEach(slug => {
    const content = mockDocs[slug as keyof typeof mockDocs];
    const title = getDocTitle(content);
    
    // Handle folder structure
    if (slug.includes('/')) {
      const { folders } = parsePath(slug);
      
      // Add parent folders if they don't exist
      let currentPath = '';
      folders.forEach(folder => {
        currentPath = currentPath ? `${currentPath}/${folder}` : folder;
        if (!folders[currentPath]) {
          folders[currentPath] = true;
          docs.push({
            slug: currentPath,
            title: folder,
            isFolder: true,
            path: currentPath
          });
        }
      });
    }
    
    // Simple logic to determine category from the slug
    let category = "General";
    if (["introduction", "installation", "quick-start"].includes(slug)) {
      category = "Getting Started";
    } else if (["architecture", "components", "data-flow"].includes(slug)) {
      category = "Core Concepts";
    } else if (["performance", "security", "deployment"].includes(slug)) {
      category = "Advanced Guides";
    } else if (slug.startsWith("Ders Notları/")) {
      category = "Ders Notları";
    }
    
    // Add the document
    docs.push({
      slug,
      title,
      category,
      description: `Documentation about ${title.toLowerCase()}.`,
      path: slug
    });
  });
  
  return docs;
};

// Create a new document or folder
export const createDoc = async (slug: string, content: string, isFolder: boolean = false): Promise<void> => {
  console.log(`Creating ${isFolder ? 'folder' : 'doc'}: ${slug}`);
  
  // Gerçek uygulamada bu API çağrısı olurdu:
  // await fetch('/api/docs/create', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ path: slug, content, isFolder })
  // });
  
  if (!isFolder) {
    // @ts-ignore - This is a mock implementation
    mockDocs[slug] = content;
  }
  
  return Promise.resolve();
};

// Save an existing document
export const saveDoc = async (slug: string, content: string): Promise<void> => {
  console.log(`Saving doc: ${slug}`);
  
  // Gerçek uygulamada bu API çağrısı olurdu:
  // await fetch('/api/docs/save', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ path: slug, content })
  // });
  
  // @ts-ignore - This is a mock implementation
  mockDocs[slug] = content;
  return Promise.resolve();
};

// Delete a document or folder
export const deleteDoc = async (slug: string, isFolder: boolean = false): Promise<void> => {
  console.log(`Deleting ${isFolder ? 'folder' : 'doc'}: ${slug}`);
  
  // Gerçek uygulamada bu API çağrısı olurdu:
  // await fetch('/api/docs/delete', {
  //   method: 'DELETE',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ path: slug, isFolder })
  // });
  
  if (isFolder) {
    // If it's a folder, delete all documents that start with this path
    Object.keys(mockDocs).forEach(key => {
      if (key.startsWith(`${slug}/`)) {
        // @ts-ignore - This is a mock implementation
        delete mockDocs[key];
      }
    });
  } else {
    // @ts-ignore - This is a mock implementation
    delete mockDocs[slug];
  }
  
  return Promise.resolve();
};

// Get folder contents
export const getFolderContents = (folderPath: string): DocMeta[] => {
  // Gerçek uygulamada bu API çağrısı olurdu:
  // const response = await fetch(`/api/docs/folder?path=${folderPath}`);
  // return await response.json();
  
  const results: DocMeta[] = [];
  const normalizedFolderPath = normalizePath(folderPath);
  const prefix = normalizedFolderPath ? `${normalizedFolderPath}/` : '';
  
  // Find immediate children (files and folders)
  Object.keys(mockDocs).forEach(slug => {
    if (slug.startsWith(prefix)) {
      const remainingPath = slug.slice(prefix.length);
      const firstLevel = remainingPath.split('/')[0];
      
      if (remainingPath && !remainingPath.includes('/')) {
        // This is a file directly in this folder
        const content = mockDocs[slug as keyof typeof mockDocs];
        const title = getDocTitle(content);
        results.push({
          slug,
          title,
          path: slug,
          isFolder: false
        });
      } else if (remainingPath) {
        // This might be a subfolder
        const subfolderPath = `${prefix}${firstLevel}`;
        
        // Check if we've already added this subfolder
        const exists = results.some(item => item.path === subfolderPath && item.isFolder);
        
        if (!exists) {
          results.push({
            slug: subfolderPath,
            title: firstLevel,
            path: subfolderPath,
            isFolder: true
          });
        }
      }
    }
  });
  
  return results;
};
