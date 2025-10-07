import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

type PhotoType = {
  id: string;
  src: string;
  alt: string;
  event: string;
  date: string;
  likes: number;
  downloads: number;
};

const Eventos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showQR, setShowQR] = useState<PhotoType | null>(null);
  const [allPhotos, setAllPhotos] = useState<PhotoType[]>([]);

  useEffect(() => {
    const importAll = import.meta.glob("@/assets/fotos/*.{jpg,jpeg,png,JPG}", { eager: true });

    const photos: PhotoType[] = Object.entries(importAll).map(([path, file], index) => {
      const name = path.split("/").pop() || "";
      return {
        id: String(index + 1),
        src: (file as any).default,
        alt: name,
        event: "Outros",
        date: "2025-01-01",
        likes: 0,
        downloads: 0,
      };
    });

    setAllPhotos(photos);
  }, []);

  const categories = ["todos", "Casamento", "Corporativo", "Aniversário", "Formatura", "Outros"];

  const filteredPhotos = allPhotos.filter((photo) => {
    const matchesSearch =
      photo.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || photo.event === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getEventCount = (category: string) => {
    if (category === "todos") return allPhotos.length;
    return allPhotos.filter((photo) => photo.event === category).length;
  };

  const gerarMarcaDagua = useCallback((src: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const fontSize = canvas.width / 5;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 6);

        const step = canvas.width / 2;
        for (let x = -canvas.width; x < canvas.width; x += step) {
          for (let y = -canvas.height; y < canvas.height; y += step) {
            ctx.fillText("PRIMITIVE", x, y);
          }
        }

        ctx.rotate(Math.PI / 6);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
    });
  }, []);

  const baixarComMarcaDagua = async (photo: PhotoType) => {
    const url = await gerarMarcaDagua(photo.src);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PRIMITIVE_${photo.alt}`;
    link.click();
  };

  const pagarDownload = (photo: PhotoType) => setShowQR(photo);

  const confirmarPagamento = (photo: PhotoType) => {
    const link = document.createElement("a");
    link.href = photo.src;
    link.download = photo.alt;
    link.click();
    setShowQR(null);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nossos <span className="bg-gradient-accent bg-clip-text text-transparent">Eventos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore nossa coleção de momentos únicos capturados com paixão e profissionalismo
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "todos" ? "Todas as Categorias" : category}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {getEventCount(category)}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                baixarComMarcaDagua={baixarComMarcaDagua}
                pagarDownload={pagarDownload}
                gerarMarcaDagua={gerarMarcaDagua}
              />
            ))
          ) : (
            <div className="text-center py-20 col-span-full">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold mb-2">Nenhuma foto encontrada</h3>
              <p className="text-muted-foreground mb-4">Tente ajustar seus filtros ou termos de pesquisa</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("todos"); }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal QR Code PIX */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Pague via PIX R$4,99</h2>
            <QRCodeCanvas value="00020126360014BR.GOV.BCB.PIX0114+55119999999952040000530398654054.99" size={200} />
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => confirmarPagamento(showQR)}
              >
                Confirmar Pagamento
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowQR(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 📷 Card otimizado
const PhotoCard = ({
  photo,
  baixarComMarcaDagua,
  pagarDownload,
  gerarMarcaDagua,
}: {
  photo: PhotoType;
  baixarComMarcaDagua: (photo: PhotoType) => void;
  pagarDownload: (photo: PhotoType) => void;
  gerarMarcaDagua: (src: string) => Promise<string>;
}) => {
  const [srcComWatermark, setSrcComWatermark] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const cacheKey = `wm_${photo.src}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          setSrcComWatermark(cached);
        } else {
          const url = await gerarMarcaDagua(photo.src);
          setSrcComWatermark(url);
          sessionStorage.setItem(cacheKey, url);
        }
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [photo.src, gerarMarcaDagua]);

  return (
    <div className="relative group">
      <div ref={imgRef} className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200">
        {!srcComWatermark ? (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        ) : (
          <img
            src={srcComWatermark}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={() => baixarComMarcaDagua(photo)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Baixar Gratuito
        </button>
        <button
          onClick={() => pagarDownload(photo)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Baixar Pago R$4,99
        </button>
      </div>
    </div>
  );
};

export default Eventos;
