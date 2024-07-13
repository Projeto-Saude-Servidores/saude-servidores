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

satisfaction_columns = [
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Em muitos campos a minha vida está próxima do meu ideal.]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [As minhas condições de vida são excelentes]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Estou satisfeito com a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Até o presente momento tenho alcançado as coisas importantes que quero para a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Se pudesse viver a minha vida de novo não mudaria quase nada]"
]

@app.route('/api/satisfacao/<sector>', methods=['GET'])
def get_satisfaction_data_by_sector(sector):
    satisfaction_columns = [col for col in df.columns if "Sobre a sua satisfação com a vida" in col]

    sector_name = [k for k, v in department_abbreviations.items() if v == sector][0]
    sector_data = df[df['7. Setor da Reitoria:'] == sector_name]

    satisfaction_counts = {}
    for column in satisfaction_columns:
        counts = sector_data[column].value_counts().to_dict()
        satisfaction_counts[column] = counts

    response_json = json.dumps(satisfaction_counts, ensure_ascii=False)
    return Response(response_json, content_type="application/json; charset=utf-8")

@app.route('/api/setores', methods=['GET'])
def get_average_pain_by_sector():
    # Calcular o nível médio de dor para cada pessoa
    df['Average Pain Level'] = df[pain_columns].mean(axis=1)
    
    # Calcular o nível médio de dor por setor e aplicar as abreviações definidas manualmente
    sector_average_pain = df.groupby('7. Setor da Reitoria:')['Average Pain Level'].mean().reset_index()
    sector_average_pain['7. Setor da Reitoria:'] = sector_average_pain['7. Setor da Reitoria:'].map(department_abbreviations)
    
    # Arredondar os valores para 2 casas decimais
    sector_average_pain_dict = sector_average_pain.set_index('7. Setor da Reitoria:')['Average Pain Level'].round(2).to_dict()
    
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
    
    faixas_idade = {
        "até 29 anos": 0,
        "entre 30 e 39 anos": 0,
        "entre 40 e 49 anos": 0,
        "50 anos ou mais": 0
    }
    
    for idade in idades:
        if idade <= 29:
            faixas_idade["até 29 anos"] += 1
        elif 30 <= idade <= 39:
            faixas_idade["entre 30 e 39 anos"] += 1
        elif 40 <= idade <= 49:
            faixas_idade["entre 40 e 49 anos"] += 1
        else:
            faixas_idade["50 anos ou mais"] += 1
            
    response_counts["Idades"] = faixas_idade
    
    pesos = df["5. Qual o seu peso? Ex: 68 kg"].dropna()
    
    faixas_peso = {
        "até 60 kg": 0,
        "entre 61 e 75 kg": 0,
        "entre 76 e 85 kg": 0,
        "acima de 85 kg": 0
    }
    
    for peso in pesos:
        if peso <= 60:
            faixas_peso["até 60 kg"] += 1
        elif 61 <= peso <= 75:
            faixas_peso["entre 61 e 75 kg"] += 1
        elif 76 <= peso <= 85:
            faixas_peso["entre 76 e 85 kg"] += 1
        else:
            faixas_peso["acima de 85 kg"] += 1
            
    response_counts["Pesos"] = faixas_peso
    
    
    # Calculando frequência de alturas por faixa
    alturas = df["4. Qual a sua altura? Ex: 1,70m"].dropna()  # Remove valores NaN se houver(talvez não precise)
    
    # Definindo faixas de altura
    faixas_altura = {
        "menor que 165 cm": 0,
        "entre 165 e 172 cm": 0,
        "entre 173 e 179 cm": 0,
        "maior que 179 cm": 0
    }
    
    # Contagem de alturas por faixa
    for altura in alturas:
        if altura < 165:
            faixas_altura["menor que 165 cm"] += 1
        elif 165 <= altura <= 172:
            faixas_altura["entre 165 e 172 cm"] += 1
        elif 173 <= altura <= 179:
            faixas_altura["entre 173 e 179 cm"] += 1
        else:
            faixas_altura["maior que 179 cm"] += 1
    
    response_counts["Alturas"] = faixas_altura
        
    # calculando quantas pessoas de cada setor tem
    counts = df["7. Setor da Reitoria:"].value_counts().to_dict()
    response_counts["Setores"] = counts
    
    # calculando quantas pessoas por cada regime de trabalho
    counts = df["6. Qual o seu regime de trabalho?"].value_counts().to_dict()
    response_counts["Regimes de trabalho"] = counts
    
    
        
    # Usar json.dumps para garantir que os caracteres não sejam escapados
    response_json = json.dumps(response_counts, ensure_ascii=False)
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
    
    
    pain_sector = sector_data[pain_columns]
    
    #transformando df em dicionário
    sector_dict = pain_sector.to_dict(orient='list')

    response_response = {"nível 0":[] , "nível 1":[] , "nível 2":[] , "nível 3":[], "nível 4":[], "nível 5":[]}

    
    # # Renomear as chaves do dicionário para uma forma mais amigável
    sector_dict = {
        col.split(' [')[1].replace(']', ''):  sector_dict[col]       
        for col in sector_dict
    }

    #contando quantidade de 0,1,2,3,4 e 5 e adicionar no response_response   
    # ta brutão msm 
    for chave in sector_dict:
        qtd0=0
        qtd1=0
        qtd2=0
        qtd3=0
        qtd4=0
        qtd5=0
        valores = sector_dict[chave]
        for valor in valores:
            if valor == 0:
                qtd0+=1
            if valor == 1:
                qtd1+=1
            if valor == 2:
                qtd2+=1
            if valor == 3:
                qtd3+=1
            if valor == 4:
                qtd4+=1
            if valor == 5:
                qtd5+=1    
        response_response["nível 0"].append({chave:qtd0})
        response_response["nível 1"].append({chave:qtd1})
        response_response["nível 2"].append({chave:qtd2})
        response_response["nível 3"].append({chave:qtd3})
        response_response["nível 4"].append({chave:qtd4})
        response_response["nível 5"].append({chave:qtd5})

    response_json = json.dumps(response_response, ensure_ascii=False)
    
    # Retornar a resposta JSON com o mime type application/json
    return Response(response_json, content_type="application/json; charset=utf-8")

posture_columns = [
    "21. Quando sentado na sua cadeira, sua mesa de trabalho fica na altura do seu cotovelo?",
    "22. Ao trabalhar sentado na cadeira, você apoia seus pés no chão ou em algum suporte?",
    "23. Sua cadeira possui altura ajustável do assento?",
    "24. Com relação a cadeira, ela possui encosto com a forma levemente adaptada ao corpo para proteção da região lombar?",
    "25. A mesa de trabalho ou cadeira proporciona espaço ou suporte para apoiar os antebraços?",
    "26. Ao utilizar o computador durante o trabalho, você utiliza:",
    "27. Ao utilizar o computador durante o trabalho, você utiliza:",
    "28. A borda superior da tela do seu computador está na altura dos seus olhos?"
]

@app.route('/api/postura/<sector>', methods=['GET'])
def get_posture_data_by_sector(sector):
    posture_columns = [col for col in df.columns if col.startswith(("21.", "22.", "23.", "24.", "25.", "26.", "27.", "28."))]

    sector_name = [k for k, v in department_abbreviations.items() if v == sector][0]
    sector_data = df[df['7. Setor da Reitoria:'] == sector_name]

    posture_counts = {}
    for column in posture_columns:
        counts = sector_data[column].value_counts().to_dict()
        posture_counts[column] = counts

    response_json = json.dumps(posture_counts, ensure_ascii=False)
    return Response(response_json, content_type="application/json; charset=utf-8")

workplace_columns = [
    "12. Como é o seu relacionamento com colegas do setor?",
    "13. Como é o seu relacionamento com a sua chefia?",
    "14. Você classifica o seu trabalho como monótono?",
    "15. Você se sente estressado durante o seu trabalho?",
    "16. O seu trabalho exige esforço mental?",
    "17. Você possui conhecimento em relação a ergonomia?",
    "18. Como você classifica o ruído no seu ambiente de trabalho?",
    "19. Como você classifica a temperatura no seu ambiente de trabalho?",
    "20. A iluminação incomoda na realização do seu trabalho?"
]

@app.route('/api/ambiente/<sector>', methods=['GET'])
def get_workplace_data_by_sector(sector):
    workplace_columns = [col for col in df.columns if col.startswith(("12.", "13.", "14.", "15.", "16.", "17.", "18.", "19.","20."))]

    sector_name = [k for k, v in department_abbreviations.items() if v == sector][0]
    sector_data = df[df['7. Setor da Reitoria:'] == sector_name]

    workplace_counts = {}
    for column in workplace_columns:
        counts = sector_data[column].value_counts().to_dict()
        workplace_counts[column] = counts

    response_json = json.dumps(workplace_counts, ensure_ascii=False)
    return Response(response_json, content_type="application/json; charset=utf-8")

health_columns = [
    "9. Você pratica alguma atividade física regularmente (mínimo 3 vezes por semana)?",
    "10. Você possuí algum problema de saúde? Liste abaixo:",
    "11. Tem alguma deficiência, se sim qual(ais)"
]

@app.route('/api/saude/<sector>', methods=['GET'])
def get_health_data_by_sector(sector):
    health_columns = [col for col in df.columns if col.startswith(("9.", "10.", "11."))]

    sector_name = [k for k, v in department_abbreviations.items() if v == sector][0]
    sector_data = df[df['7. Setor da Reitoria:'] == sector_name]

    health_counts = {}
    for column in health_columns:
        counts = sector_data[column].value_counts().to_dict()
        health_counts[column] = counts

    response_json = json.dumps(health_counts, ensure_ascii=False)
    return Response(response_json, content_type="application/json; charset=utf-8")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
