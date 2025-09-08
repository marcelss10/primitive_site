import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, Settings, BarChart3, Trash2, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Upload concluído!",
      description: `${selectedFiles.length} foto(s) enviada(s) com marca d'água aplicada.`,
    });
    
    setIsUploading(false);
    setSelectedFiles(null);
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const mockEvents = [
    { id: 1, name: "Casamento Silva", date: "2024-01-20", photos: 45, status: "Ativo" },
    { id: 2, name: "Evento Corporativo Tech", date: "2024-01-15", photos: 32, status: "Ativo" },
    { id: 3, name: "Aniversário Maria", date: "2024-01-10", photos: 28, status: "Arquivado" },
  ];

  const mockStats = [
    { title: "Total de Eventos", value: "15", change: "+3 este mês" },
    { title: "Fotos Uploadadas", value: "1,234", change: "+156 esta semana" },
    { title: "Downloads", value: "456", change: "+23 hoje" },
    { title: "Visualizações", value: "2,567", change: "+89 hoje" },
  ];

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Painel <span className="bg-gradient-accent bg-clip-text text-transparent">Administrativo</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus eventos e fotos de forma simples
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Form */}
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Novo Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-name">Nome do Evento</Label>
                    <Input id="event-name" placeholder="Ex: Casamento Silva" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casamento">Casamento</SelectItem>
                        <SelectItem value="corporativo">Corporativo</SelectItem>
                        <SelectItem value="aniversario">Aniversário</SelectItem>
                        <SelectItem value="formatura">Formatura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-date">Data do Evento</Label>
                    <Input id="event-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Textarea id="description" placeholder="Adicione detalhes sobre o evento..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Selecionar Fotos</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="cursor-pointer"
                    />
                    {selectedFiles && (
                      <p className="text-sm text-muted-foreground">
                        {selectedFiles.length} foto(s) selecionada(s)
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFiles || isUploading}
                    className="w-full bg-gradient-accent text-primary-foreground hover:shadow-glow"
                  >
                    {isUploading ? "Enviando..." : "Upload com Marca D'água"}
                  </Button>
                </CardContent>
              </Card>

              {/* Upload Instructions */}
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Instruções de Upload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Selecione as fotos</h4>
                        <p className="text-sm text-muted-foreground">
                          Escolha múltiplas fotos em formato JPG, PNG ou RAW
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Marca d'água automática</h4>
                        <p className="text-sm text-muted-foreground">
                          O sistema aplicará automaticamente a marca "PRIMITIVE" em cada foto
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Publicação automática</h4>
                        <p className="text-sm text-muted-foreground">
                          As fotos serão disponibilizadas na galeria após o processamento
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">💡 Dica Importante</h4>
                    <p className="text-sm text-muted-foreground">
                      Para melhor qualidade, envie fotos em alta resolução. 
                      O sistema otimizará automaticamente para web.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Eventos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.photos} fotos
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={event.status === "Ativo" ? "default" : "secondary"}>
                          {event.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStats.map((stat, index) => (
                <Card key={index} className="bg-gradient-card border-border">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-primary">{stat.change}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Configurações da Marca D'água</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="watermark-text">Texto da Marca D'água</Label>
                    <Input id="watermark-text" defaultValue="PRIMITIVE" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="watermark-opacity">Opacidade</Label>
                    <Input id="watermark-opacity" type="range" min="0" max="100" defaultValue="60" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="watermark-position">Posição</Label>
                    <Select defaultValue="bottom-right">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Inferior Direito</SelectItem>
                        <SelectItem value="bottom-left">Inferior Esquerdo</SelectItem>
                        <SelectItem value="top-right">Superior Direito</SelectItem>
                        <SelectItem value="center">Centro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Salvar Configurações</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Título do Site</Label>
                    <Input id="site-title" defaultValue="Primitive Photography" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email de Contato</Label>
                    <Input id="contact-email" defaultValue="contato@primitive.com.br" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-publish">Publicação Automática</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Habilitado</SelectItem>
                        <SelectItem value="disabled">Desabilitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Salvar Configurações</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;