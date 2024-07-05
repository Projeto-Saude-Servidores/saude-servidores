from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app) 

@app.route('/api/data', methods=['GET'])
def get_csv_data():
    df = pd.read_csv('Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares - Projeto Saúde do Servidor -  Riscos Ergonômicos e Sintomas Osteomusculares (respostas).csv')
    
    response_counts = {}
    
    for column in df.columns:
        counts = df[column].value_counts().to_dict()
        response_counts[column] = counts
    
    return jsonify(response_counts)

if __name__ == '__main__':
    app.run(debug=True, port=5000)