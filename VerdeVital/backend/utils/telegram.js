const fetch = require('node-fetch');
const TELEGRAM_TOKEN = 'TU_TOKEN';
const CHAT_ID = 'TU_CHAT_ID';

exports.notificarPedidoTelegram = (pedido_id, usuario_id) => {
  const mensaje = `🛒 Nuevo pedido #${pedido_id} realizado por usuario ${usuario_id}`;
  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: mensaje })
  });
};
