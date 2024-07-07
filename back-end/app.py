from flask import Flask, jsonify, Response
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)

# Load the data from the CSV file
df = pd.read_csv('./Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares - Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares (respostas).csv')

# Mapeamento de abreviações de setores
department_abbreviations = {
    "Administração Geral": "ADM",
    "Biblioteca Central": "BIB",
    "Departamento de Comunicação": "COM",
    "Departamento de Ensino": "ENS",
    "Departamento de Finanças": "FIN",
    "Departamento de Infraestrutura": "INF",
    "Departamento de Pesquisa": "PES",
    "Departamento de Recursos Humanos": "RH",
    "Departamento de Tecnologia": "TEC",
    "Gabinete do (a) Reitor(a), eu": "GAB"
}

# Invertendo o dicionário para facilitar a busca
abbreviation_to_department = {v: k for k, v in department_abbreviations.items()}

# Definir as colunas relacionadas aos níveis de dor
pain_columns = [
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Pescoço]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Ombro Direito]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Ombro Esquerdo]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Punho/mão direita]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Punho/mão esquerda]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Cotovelo direito]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Cotovelo esquerdo]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Coluna dorsal]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Coluna lombar]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Quadris/coxa]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Joelho direito]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Joelho esquerdo]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Tornozelo/pé direito]",
    "29. Nos últimos 12 meses, você sentiu alguma dor ou desconforto ? Indique a intensidade da dor (0 = nenhuma 5 = dor extrema) [Tornozelo/pé esquerdo]"
]

# Rota para definir o nível de dor média de cada setor
@app.route('/api/setores', methods=['GET'])
def get_average_pain_by_sector():
    # Calcular o nível médio de dor para cada pessoa
    df['Average Pain Level'] = df[pain_columns].mean(axis=1)
    
    # Calcular o nível médio de dor por setor e aplicar as abreviações definidas manualmente
    sector_average_pain = df.groupby('7. Setor da Reitoria:')['Average Pain Level'].mean().reset_index()
    sector_average_pain['7. Setor da Reitoria:'] = sector_average_pain['7. Setor da Reitoria:'].map(department_abbreviations)
    sector_average_pain_dict = sector_average_pain.set_index('7. Setor da Reitoria:')['Average Pain Level'].to_dict()
    
    # Usar json.dumps para garantir que os caracteres não sejam escapados
    response_json = json.dumps(sector_average_pain_dict, ensure_ascii=False)
    
    # Retornar a resposta JSON com o mime type application/json
    return Response(response_json, content_type="application/json; charset=utf-8")

# Rota para obter os níveis de dor médios de um setor específico
@app.route('/api/setores/<abbreviation>', methods=['GET'])
def get_pain_levels_by_sector(abbreviation):
    # Verificar se a abreviação fornecida existe no mapeamento
    if abbreviation not in abbreviation_to_department:
        return jsonify({"error": "Setor não encontrado"}), 404
    
    # Filtrar os dados pelo setor
    sector_name = abbreviation_to_department[abbreviation]
    sector_data = df[df['7. Setor da Reitoria:'] == sector_name]
    
    # Calcular a média dos níveis de dor para cada tipo de dor
    pain_means = sector_data[pain_columns].mean().to_dict()
    
    # Renomear as chaves do dicionário para uma forma mais amigável
    pain_means = {col.split(' [')[1].replace(']', ''): pain_means[col] for col in pain_columns}
    
    # Usar json.dumps para garantir que os caracteres não sejam escapados
    response_json = json.dumps(pain_means, ensure_ascii=False)
    
    # Retornar a resposta JSON com o mime type application/json
    return Response(response_json, content_type="application/json; charset=utf-8")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
