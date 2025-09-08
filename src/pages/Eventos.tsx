import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import GalleryGrid from "@/components/gallery-grid";
import corporateEvent from "@/assets/corporate-event.jpg";
import birthdayEvent from "@/assets/birthday-event.jpg";
import graduationEvent from "@/assets/graduation-event.jpg";
import heroImage from "@/assets/hero-image.jpg";

const Eventos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const allPhotos = [
    {
      id: "1",
      src: corporateEvent,
      alt: "Evento corporativo elegante",
      event: "Corporativo",
      date: "2024-01-15",
      likes: 45,
      downloads: 12
    },
    {
      id: "2",
      src: birthdayEvent,
      alt: "Festa de aniversário",
      event: "Aniversário",
      date: "2024-01-10",
      likes: 67,
      downloads: 23
    },
    {
      id: "3",
      src: graduationEvent,
      alt: "Cerimônia de formatura",
      event: "Formatura",
      date: "2024-01-08",
      likes: 89,
      downloads: 34
    },
    {
      id: "4",
      src: heroImage,
      alt: "Casamento elegante",
      event: "Casamento",
      date: "2024-01-20",
      likes: 156,
      downloads: 67
    },
    {
      id: "5",
      src: corporateEvent,
      alt: "Conferência tecnológica",
      event: "Corporativo",
      date: "2024-01-12",
      likes: 78,
      downloads: 45
    },
    {
      id: "6",
      src: birthdayEvent,
      alt: "Festa infantil",
      event: "Aniversário",
      date: "2024-01-05",
      likes: 92,
      downloads: 28
    },
    {
      id: "7",
      src: graduationEvent,
      alt: "Formatura medicina",
      event: "Formatura",
      date: "2024-01-03",
      likes: 134,
      downloads: 56
    },
    {
      id: "8",
      src: heroImage,
      alt: "Casamento ao ar livre",
      event: "Casamento",
      date: "2024-01-25",
      likes: 203,
      downloads: 89
    },
  ];

  const categories = ["todos", "Casamento", "Corporativo", "Aniversário", "Formatura"];

  const filteredPhotos = allPhotos.filter(photo => {
    const matchesSearch = photo.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || photo.event === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getEventCount = (category: string) => {
    if (category === "todos") return allPhotos.length;
    return allPhotos.filter(photo => photo.event === category).length;
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
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
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

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category === "todos" ? "Todos" : category}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {getEventCount(category)}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPhotos.length > 0 ? (
            <GalleryGrid photos={filteredPhotos} />
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold mb-2">Nenhuma foto encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar seus filtros ou termos de pesquisa
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("todos");
              }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Eventos;