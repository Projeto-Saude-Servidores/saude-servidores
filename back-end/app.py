from flask import Flask, jsonify, Response
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)


# Load the data from the CSV file
df = pd.read_csv('./Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares - Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares (respostas).csv')

# Mapeamento de abreviações de setores(para facilitar na criação dos gráficos no front)
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


@app.route('/api/data', methods=['GET'])
def get_csv_data():
    response_counts = {}
    
    for column in df.columns:
        counts = df[column].value_counts().to_dict()
        response_counts[column] = counts
        
        
    # Usar json.dumps para garantir que os caracteres não sejam escapados
    response_json = json.dumps(response_counts, ensure_ascii=False)
    
    # Retornar a resposta JSON com o mime type application/json
    return Response(response_json, content_type="application/json; charset=utf-8")

# Rota para definir o nível de dor média de cada setor
@app.route('/api/setores', methods=['GET'])
def get_average_pain_by_sector():
    # Define as colunas relacionadas aos níveis de dor(acho mais adequado mudar as colunas no arquivo csv para diminuir esse código)
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


@app.route('/api/amostragem', methods=['GET'])
def get_csv_amostragem():
    response_counts = {}
    
    # quantidade de pessoas
    response_counts["Pessoas"] = len(df)
    
    # calculando quantas pessoas de cada sexo tem
    counts = df["2. Sexo:"].value_counts().to_dict()
    response_counts["Gêneros"] = counts
    
    
    idades = df["1. Idade:"].dropna()
     # Definindo faixas de altura
    faixas_idade = {
        "até 29": 0,
        "entre 30 e 39": 0,
        "entre 40 e 49": 0,
        "50 ou mais": 0
    }
    
    for idade in idades:
        if idade <= 29:
            faixas_idade["até 29"] += 1
        elif 30 <= idade <= 39:
            faixas_idade["entre 30 e 39"] += 1
        elif 40<= idade <=49:
            faixas_idade["entre 40 e 49"] += 1
        else:
            faixas_idade["50 ou mais"] += 1
            
    response_counts["Idades"] = faixas_idade
    
    
    # Calculando frequência de alturas por faixa
    alturas = df["4. Qual a sua altura? Ex: 1,70m"].dropna()  # Remove valores NaN se houver(talvez não precise)
    
    # Definindo faixas de altura
    faixas_altura = {
        "menor que 165": 0,
        "entre 165 e 172": 0,
        "entre 173 e 179": 0,
        "maior que 179": 0
    }
    
    # Contagem de alturas por faixa
    for altura in alturas:
        if altura < 165:
            faixas_altura["menor que 165"] += 1
        elif 165 <= altura <= 172:
            faixas_altura["entre 165 e 172"] += 1
        elif 173<= altura <=179:
            faixas_altura["entre 173 e 179"] += 1
        else:
            faixas_altura["maior que 179"] += 1
    
    response_counts["Alturas"] = faixas_altura
        
    # calculando quantas pessoas de cada setor tem
    counts = df["7. Setor da Reitoria:"].value_counts().to_dict()
    response_counts["Setores"] = counts
    
    # calculando quantas pessoas por cada regime de trabalho
    counts = df["6. Qual o seu regime de trabalho?"].value_counts().to_dict()
    response_counts["Regimes de trabalho"] = counts
    
    
        
    # Usar json.dumps para garantir que os caracteres não sejam escapados
    response_json = json.dumps(response_counts, ensure_ascii=False)
    
    # Retornar a resposta JSON com o mime type application/json
    return Response(response_json, content_type="application/json; charset=utf-8")


if __name__ == '__main__':
    app.run(debug=True, port=5000)
