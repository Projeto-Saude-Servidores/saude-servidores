from flask import Flask, jsonify, Response
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)

# Load the data from the Excel file
df = pd.read_csv('./Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares - Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares (respostas).csv')

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
    # Define the columns related to pain levels
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
    
    # Calcular o nível médio de dor por setor
    sector_average_pain = df.groupby('7. Setor da Reitoria:')['Average Pain Level'].mean().to_dict()
    
    # Usar json.dumps para garantir que os caracteres não sejam escapados
    response_json = json.dumps(sector_average_pain, ensure_ascii=False)
    
    # Retornar a resposta JSON com o mime type application/json
    return Response(response_json, content_type="application/json; charset=utf-8")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
