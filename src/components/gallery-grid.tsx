import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  src: string;
  alt: string;
  event: string;
  date: string;
  likes: number;
  downloads: number;
}

interface GalleryGridProps {
  photos: Photo[];
  title?: string;
}

const GalleryGrid = ({ photos, title }: GalleryGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="group relative overflow-hidden bg-gradient-card border-border hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/80 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <Button size="sm" variant="secondary" className="h-10 w-10 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-10 w-10 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-10 w-10 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {photo.event}
                </Badge>
                <span className="text-xs text-muted-foreground">{photo.date}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{photo.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>{photo.downloads}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute bottom-2 right-2 text-xs text-white/60 font-medium">
              PRIMITIVE
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for full view */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-glass z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-full h-full object-contain rounded-lg shadow-elegant"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedPhoto(null)}
            >
              Fechar
            </Button>
            
            {/* Watermark in modal */}
            <div className="absolute bottom-4 right-4 text-white/80 font-bold text-lg">
              PRIMITIVE
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;