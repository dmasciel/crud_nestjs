#!/bin/bash

# Captura o tempo de início
start=$(date +%s)

# Instala as dependências npm com a flag legacy-peer-deps
npm install --legacy-peer-deps

# Captura o tempo de término
end=$(date +%s)

# Calcula o tempo de execução
runtime=$(echo "$end - $start" | bc -l)
echo "#### Runtime: $runtime seconds ####"

# Mantém o script em execução
echo "Hit CTRL+C to stop"
tail -f /dev/null
