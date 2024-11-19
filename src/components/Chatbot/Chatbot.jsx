import React, { useState } from 'react';
import {
  Button,
  Spinner,
  Alert,
  Input
} from '@edx/paragon';
import Sidebar from '../Sidebar/sidebar';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      alert('Por favor, insira uma mensagem.');
      return;
    }

    setMessages((prev) => [...prev, `Você: ${input}`]);
    setLoading(true);

    const payload = { message: input };

    try {
      const response = await fetch('http://147.79.111.214:5000/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'b7fe1fd2-7074-4ae0-95ec-23f637695b87',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false);
        alert('Falha na comunicação com o chatbot.');
        return;
      }

      const data = await response.json();
      const botResponse = data.response || 'Sem resposta';
      setMessages((prev) => [...prev, `Bot: ${botResponse}`]);
    } catch (error) {
      alert('Erro ao processar sua mensagem. Tente novamente.');
    } finally {
      setLoading(false);
      setInput('');
    }
  }
;

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Barra lateral */}

      <Sidebar />
      {/* Conteúdo principal */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <h1 style={{ marginBottom: '16px' }}>PD Coach</h1>

        {/* Exibição de mensagens */}
        <div
          style={{
            maxHeight: '300px',
            width: '100%',
            maxWidth: '600px',
            overflowY: 'auto',
            marginBottom: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f7f7f7',
          }}
        >
          {messages.length === 0 && (
            <Alert variant="info">Envie uma mensagem para começar!</Alert>
          )}
          {messages.map((msg, index) => (
            <p key={index} style={{ margin: 0, marginBottom: '8px' }}>
              {msg}
            </p>
          ))}
        </div>

        {/* Entrada e botão de envio */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tire uma dúvida com o Coach..."
            disabled={loading}
            style={{ flex: 1 }}
          />
          <Button
            onClick={handleSendMessage}
            variant="primary"
            style={{ marginLeft: '16px' }}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Enviar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
