import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Camera, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
    });
    
    setIsSubmitting(false);
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (11) 99999-9999",
      description: "Segunda a Sexta, 9h às 18h"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contato@primitive.com.br",
      description: "Resposta em até 24h"
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "São Paulo, SP",
      description: "Atendemos toda a região metropolitana"
    },
    {
      icon: Clock,
      title: "Horário",
      value: "9h às 18h",
      description: "Segunda a Sexta-feira"
    },
  ];

  const services = [
    {
      icon: Camera,
      title: "Casamentos",
      description: "Cobertura completa do seu dia especial"
    },
    {
      icon: Users,
      title: "Eventos Corporativos",
      description: "Profissionalismo para sua empresa"
    },
    {
      icon: Calendar,
      title: "Aniversários",
      description: "Momentos únicos em família"
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Entre em <span className="bg-gradient-accent bg-clip-text text-transparent">Contato</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vamos conversar sobre como podemos capturar seus momentos especiais
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Solicite um Orçamento</CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário abaixo e entraremos em contato
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(11) 99999-9999" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Tipo de Evento</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casamento">Casamento</SelectItem>
                          <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                          <SelectItem value="aniversario">Aniversário</SelectItem>
                          <SelectItem value="formatura">Formatura</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data do Evento</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Número de Convidados</Label>
                      <Input id="guests" type="number" placeholder="Ex: 100" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Local do Evento</Label>
                    <Input id="location" placeholder="Cidade, Estado" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Detalhes do Evento</Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos mais sobre seu evento, expectativas e qualquer informação adicional..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-accent text-primary-foreground hover:shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <info.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.title}</h4>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Nossos Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-accent text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Pronto para Começar?</h3>
                <p className="mb-4 opacity-90">
                  Entre em contato agora e vamos criar memórias inesquecíveis juntos!
                </p>
                <Button variant="secondary" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;