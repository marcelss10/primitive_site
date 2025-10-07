// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { photoId } = JSON.parse(req.body);

    if (!photoId) {
      return res.status(400).json({ error: "ID da foto é obrigatório" });
    }

    // 🔒 Aqui futuramente você integra com Stripe/MercadoPago
    // Por enquanto, vamos simular que o pagamento sempre dá certo
    const fakeCheckoutUrl = `/pagamento-sucesso?photoId=${photoId}`;

    return res.status(200).json({ url: fakeCheckoutUrl });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao processar pagamento" });
  }
}
