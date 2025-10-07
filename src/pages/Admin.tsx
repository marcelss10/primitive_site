// src/pages/Admin.tsx
import { useState, useEffect } from "react";
import { Upload, FolderPlus, Image, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Event {
  name: string;
  date: string;
  slug: string;
  description: string;
  featured: boolean;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [isUploading, setIsUploading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  const [newEvent, setNewEvent] = useState<Event>({
    name: "",
    date: "",
    slug: "",
    description: "",
    featured: false,
  });

  // Criação de evento
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.date || !newEvent.slug) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setEvents(prev => [...prev, newEvent]);
    toast.success(`Evento "${newEvent.name}" criado com sucesso!`);
    setNewEvent({ name: "", date: "", slug: "", description: "", featured: false });
  };

  // Upload de fotos
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEvent) {
      toast.error("Selecione um evento para enviar as fotos");
      return;
    }

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("file", file));
    formData.append("event", selectedEvent);

    setIsUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setIsUploading(false);

    if (res.ok) {
      toast.success(`${files.length} foto(s) carregada(s) com sucesso para o evento "${selectedEvent}"!`);
    } else {
      toast.error("Erro ao enviar fotos.");
    }
  };

  const tabs = [
    { id: "events", label: "Eventos", icon: FolderPlus },
    { id: "photos", label: "Fotos", icon: Image },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-8 px-6 border-b border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Painel Administrativo</h1>
              <p className="text-muted-foreground">Gerencie eventos, fotos e configurações</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card/50 hover:bg-card/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* === EVENTOS === */}
          {activeTab === "events" && (
            <div className="space-y-8">
              {/* Criar Evento */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Criar Novo Evento</h2>
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border">
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome do Evento</label>
                        <Input
                          type="text"
                          required
                          placeholder="Ex: Campeonato de MTB 2024"
                          className="bg-background/50"
                          value={newEvent.name}
                          onChange={e => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Data</label>
                        <Input
                          type="date"
                          required
                          className="bg-background/50"
                          value={newEvent.date}
                          onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição</label>
                      <Textarea
                        rows={3}
                        placeholder="Descreva o evento..."
                        className="bg-background/50"
                        value={newEvent.description}
                        onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                      <Input
                        type="text"
                        required
                        placeholder="campeonato-mtb-2024"
                        className="bg-background/50"
                        value={newEvent.slug}
                        onChange={e => setNewEvent(prev => ({ ...prev, slug: e.target.value }))}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={newEvent.featured}
                          onChange={e => setNewEvent(prev => ({ ...prev, featured: e.target.checked }))}
                        />
                        <span className="text-sm">Evento em destaque</span>
                      </label>
                    </div>

                    <Button type="submit">
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Criar Evento
                    </Button>
                  </form>
                </div>
              </div>

              {/* Eventos existentes */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Eventos Existentes</h2>
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border">
                  {events.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhum evento criado ainda. Crie seu primeiro evento acima.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {events.map(ev => (
                        <li key={ev.slug} className="flex justify-between border-b border-border py-2 px-3 rounded-md">
                          <span>{ev.name} ({ev.date})</span>
                          <span className="text-sm text-muted-foreground">{ev.featured ? "Destaque" : ""}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* === FOTOS === */}
          {activeTab === "photos" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Upload de Fotos</h2>
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border">
                  <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                    <label className="block w-full md:w-1/3">
                      Evento:
                      <select
                        className="w-full mt-1 p-2 border rounded-md bg-background/50"
                        value={selectedEvent}
                        onChange={e => setSelectedEvent(e.target.value)}
                      >
                        <option value="">Selecione o evento</option>
                        {events.map(ev => (
                          <option key={ev.slug} value={ev.slug}>
                            {ev.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">
                      {isUploading ? "Carregando..." : "Selecionar Fotos"}
                    </label>
                  </div>

                  <p className="text-muted-foreground text-center py-8">
                    {selectedEvent
                      ? `As fotos serão enviadas para o evento "${selectedEvent}"`
                      : "Selecione um evento acima para fazer upload das fotos"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* === Analytics e Configurações continuam iguais === */}
          {/* ... */}
        </div>
      </section>
    </div>
  );
};

export default Admin;
