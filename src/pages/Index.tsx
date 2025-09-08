import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Camera, Users, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import GalleryGrid from "@/components/gallery-grid";
import heroImage from "@/assets/hero-image.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import birthdayEvent from "@/assets/birthday-event.jpg";
import graduationEvent from "@/assets/graduation-event.jpg";

const Index = () => {
  const featuredPhotos = [
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
  ];

  const stats = [
    { icon: Camera, label: "Fotos Capturadas", value: "10K+" },
    { icon: Users, label: "Eventos Realizados", value: "500+" },
    { icon: Award, label: "Clientes Satisfeitos", value: "300+" },
    { icon: Sparkles, label: "Momentos Únicos", value: "∞" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fotografia profissional de eventos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-6 text-sm py-2 px-4">
          
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
            </span>
            <br />
            <span className="text-foreground"></span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-1 max-w-2xl mx-auto">
          </p>
          
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-60">
          <Button size="lg" className="bg-gradient-accent text-primary-foreground hover:shadow-glow" asChild>
            <Link to="/eventos">
              Ver Portfólio
              <ArrowRight className="ml-10 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <GalleryGrid 
            photos={featuredPhotos} 
            title="Trabalhos em Destaque"
          />
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/eventos">
                Ver Todos os Eventos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para Capturar Seus
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Momentos Especiais?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Entre em contato conosco e vamos criar memórias inesquecíveis juntos.
          </p>
          <Button size="lg" className="bg-gradient-accent text-primary-foreground hover:shadow-glow" asChild>
            <Link to="/contato">
              Fale Conosco
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;