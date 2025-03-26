
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocsLayout from "@/components/DocsLayout";
import { getDocContent, getDocTitle } from "@/utils/mdxUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DocPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [title, setTitle] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        // Gerçek bir uygulamada bu API çağrısı olurdu:
        // const content = await fetchDocContent(slug);
        const docContent = getDocContent(slug || "");
        setContent(docContent);
        setTitle(getDocTitle(docContent));
      } catch (error) {
        console.error("Error loading document:", error);
        setContent("# Error\n\nCould not load the document.");
        setTitle("Error");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDocument();
    }
  }, [slug]);

  // Basit bir Markdown işleyici
  const renderMarkdown = (markdown: string) => {
    // Başlıkları dönüştür
    let html = markdown.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, text) => {
      const level = hashes.length;
      return `<h${level} class="mt-6 mb-4 text-2xl font-bold">${text}</h${level}>`;
    });
    
    // Paragrafları dönüştür
    html = html.replace(/^(?!<h|<ul|<ol|<li|<pre|<blockquote)(.+)$/gm, '<p class="my-4">$1</p>');
    
    // Kod bloklarını dönüştür
    html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code>$2</code></pre>');
    
    // Satır içi kodları dönüştür
    html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
    
    // Kalın metinleri dönüştür
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // İtalik metinleri dönüştür
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Bağlantıları dönüştür
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Sırasız listeleri dönüştür
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6">$1</li>');
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc my-4">$&</ul>');
    
    // Sıralı listeleri dönüştür
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6">$1</li>');
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ol class="list-decimal my-4">$&</ol>');
    
    return html;
  };

  // Klasör yolu kontrolü (URL'deki slug'ın sonunda / varsa klasör olarak kabul et)
  const isFolder = slug?.endsWith('/') || false;

  // Eğer klasör ise, klasör içeriğini göster
  if (isFolder) {
    return (
      <DocsLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">{slug?.replace(/\/$/, "").split('/').pop() || "Root"}</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Klasör içeriği burada gösterilecektir.
          </p>
          
          {/* Gerçek uygulamada burada klasör içeriği olacak */}
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ) : (
          <article className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content || "") }} />
          </article>
        )}
      </div>
    </DocsLayout>
  );
};

export default DocPage;
