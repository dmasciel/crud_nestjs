# Esta configuração é para Desenvolvimento
FROM node:22.8.0-slim

# Atualiza os pacotes e instala o 'bc'
RUN apt-get update && apt-get install -y bc && apt-get clean && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /home/node/app

# Copia o script e dá permissões de execução
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Altera para o usuário 'node'
USER node

# Comando padrão para inicialização
CMD ["/start.sh"]
