import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Camera, Users, Award, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import videoEvento from "@/assets/fotos-sem-watermark/C1166.mp4"; // ✅ Importa vídeo

const Index = () => {
  const navigate = useNavigate();

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
        {/* Imagem de fundo */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fotografia profissional de eventos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-6 text-sm py-2 px-4">
            {/* Subtítulo opcional */}
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              {/* Texto principal colorido */}
            </span>
            <br />
            <span className="text-foreground">
              {/* Texto secundário */}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {/* Texto descritivo opcional */}
          </p>

          {/* 🔻 Botões realmente mais abaixo */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-40">
            <Button
              size="lg"
              className="bg-gradient-accent text-primary-foreground hover:shadow-glow"
              asChild
            >
              <Link to="/eventos">
                Ver Portfólio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vídeo em Destaque */}
   <section className="py-20">
  <div className="max-w-5xl mx-auto px-4">
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {/* O vídeo */}
      <video
        src={videoEvento}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
        onClick={() => navigate("/eventos")}
      />

      {/* Overlay clicável */}
      <button
        onClick={() => navigate("/eventos")}
        className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-3xl md:text-5xl font-bold hover:bg-black/40 transition"
      >
        Veja como foi nosso último evento!
      </button>
    </div>

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
