# Esta configuração é para Desenvolvimento
FROM node:22.8.0-slim

# Atualiza a lista de pacotes disponíveis nos repositórios
RUN apt-get update && \
    # Instala os pacotes necessários: openssl, procps e bc
    apt-get install -y openssl procps bc && \
    # Remove os arquivos temporários do cache do apt
    apt-get clean && \
    # Remove as listas de pacotes para reduzir o tamanho da imagem
    rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /home/node/app

# Copia o script e dá permissões de execução
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Altera para o usuário 'node'
USER node
# Apenas para documentar
EXPOSE 3000
# Comando padrão para inicialização
# contem o tail -f /dev/null para deixar o conteiner executando
CMD ["/start.sh"] 
