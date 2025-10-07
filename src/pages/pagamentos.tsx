import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode.react";

const Pagamentos = () => {
  const [fotoId, setFotoId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFotoId(params.get("foto"));
  }, []);

  const chavePix = "10660265990"; // sua chave CPF
  const valor = "4.99";

  // Payload simples PIX (apenas para QRCode)
  const payload = `00020126360014BR.GOV.BCB.PIX0111${chavePix}5204000053039865405${valor}5802BR5913Primitive Fotos6009SaoPaulo62070503***6304`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Pagamento da Foto</h1>
      <p className="mb-4">Você está comprando a foto #{fotoId} sem marca d’água</p>

      <QRCode value={payload} size={220} />

      <p className="mt-4">Escaneie o QR Code no app do seu banco</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Chave PIX: <strong>{chavePix}</strong>
      </p>

      <Button className="mt-6" onClick={() => alert("Pagamento simulado!")}>
        Já paguei
      </Button>
    </div>
  );
};

export default Pagamentos;
