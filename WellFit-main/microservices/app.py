
import pandas as pd
from sklearn import preprocessing
from sklearn.tree import DecisionTreeClassifier, _tree
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.svm import SVC
import csv
import warnings
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import word_tokenize
import json


app = Flask(__name__)
CORS(app)
# warnings.filterwarnings("ignore", category=DeprecationWarning)


training = pd.read_csv('Training.csv')
testing = pd.read_csv('Testing.csv')
cols = training.columns
cols = cols[:-1]
x = training[cols]
y = training['prognosis']
y1 = y


reduced_data = training.groupby(training['prognosis']).max()

# mapping strings to numbers
le = preprocessing.LabelEncoder()
le.fit(y)
y = le.transform(y)


x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.33, random_state=42)
testx = testing[cols]
testy = testing['prognosis']
testy = le.transform(testy)


clf1 = DecisionTreeClassifier()
clf = clf1.fit(x_train, y_train)

scores = cross_val_score(clf, x_test, y_test, cv=3)

model = SVC()
model.fit(x_train, y_train)


importances = clf.feature_importances_
indices = np.argsort(importances)[::-1]
features = cols


severityDictionary = dict()
description_list = dict()
precautionDictionary = dict()

symptoms_dict = {}

for index, symptom in enumerate(x):
    symptoms_dict[symptom] = index


def calc_condition(exp, days):
    sum = 0
    for item in exp:
        sum = sum+severityDictionary[item]
    if((sum*days)/(len(exp)+1) > 13):
        print("You should take the consultation from doctor. ")
    else:
        print("It might not be that bad but you should take precautions.")


def getDescription():
    global description_list
    with open('symptom_Description.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _description = {row[0]: row[1]}
            description_list.update(_description)


def getSeverityDict():
    global severityDictionary
    with open('Symptom_severity.csv') as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        try:
            for row in csv_reader:
                _diction = {row[0]: int(row[1])}
                severityDictionary.update(_diction)
        except:
            pass


def getprecautionDict():
    global precautionDictionary
    with open('symptom_precaution.csv') as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _prec = {row[0]: [row[1], row[2], row[3], row[4]]}
            precautionDictionary.update(_prec)


def getInfo():
    # name=input("Name:")
    print("Your Name \n\t\t\t\t\t\t", end="->")
    name = input("")
    print("hello ", name)


def check_pattern(dis_list, inp):
    pred_list = []
    ptr = 0
    patt = "^" + inp + "$"
    regexp = re.compile(inp)
    for item in dis_list:

        # print(f"comparing {inp} to {item}")
        if regexp.search(item):
            pred_list.append(item)
            # return 1,item
    if(len(pred_list) > 0):
        return 1, pred_list
    else:
        return ptr, item


def sec_predict(symptoms_exp):
    df = pd.read_csv('Training.csv')
    X = df.iloc[:, :-1]
    y = df['prognosis']
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=20)
    rf_clf = DecisionTreeClassifier()
    rf_clf.fit(X_train, y_train)

    symptoms_dict = {}

    for index, symptom in enumerate(X):
        symptoms_dict[symptom] = index

    input_vector = np.zeros(len(symptoms_dict))
    for item in symptoms_exp:
        input_vector[[symptoms_dict[item]]] = 1

    return rf_clf.predict([input_vector])


def print_disease(node):
    # print(node)
    node = node[0]
    # print(len(node))
    val = node.nonzero()
    # print(val)
    disease = le.inverse_transform(val[0])
    return disease


def final_response(tree, feature_names, symptom_name, symptom_days, symptom_number, symptoms_extra):
    def tree_to_code(tree, feature_names, symptom_name, symptom_days, symptom_number, symptoms_extra):
        tree_ = tree.tree_
        # print(tree_)
        feature_name = [
            feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
            for i in tree_.feature
        ]

        chk_dis = ",".join(feature_names).split(",")
        symptoms_present = []

        disease_input = symptom_name
        conf_inp = symptom_number
        num_days = symptom_days

        def recurse(node, depth):
            global return_text
            global disease_list
            global precaution_list

            return_text = []
            indent = "  " * depth
            if tree_.feature[node] != _tree.TREE_UNDEFINED:
                name = feature_name[node]
                threshold = tree_.threshold[node]

                if name == disease_input:
                    val = 1
                else:
                    val = 0
                if val <= threshold:
                    recurse(tree_.children_left[node], depth + 1)
                else:
                    symptoms_present.append(name)
                    recurse(tree_.children_right[node], depth + 1)
            else:
                present_disease = print_disease(tree_.value[node])

                red_cols = reduced_data.columns
                symptoms_given = red_cols[reduced_data.loc[present_disease].values[0].nonzero(
                )]
                \
                global symptoms_exp
                second_prediction = sec_predict(symptoms_exp)

                calc_condition(symptoms_exp, num_days)
                if(present_disease[0] == second_prediction[0]):
                    disease_list.append(present_disease[0])
                    return_text.append(str(description_list[present_disease[0]]))

                else:
                    print("You may have ",
                          present_disease[0], "or ", second_prediction[0])
                    # return_text += "You may have " + \
                    #    str(present_disease[0]) + "or " + \
                    #    str(second_prediction[0]) + "\n"
                    disease_list.append(present_disease[0])
                    disease_list.append(second_prediction[0])
                    return_text.append(str(description_list[present_disease[0]]))
                    return_text.append(str(description_list[second_prediction[0]]))

                precution_list = precautionDictionary[present_disease[0]]
                
                for i, j in enumerate(precution_list):
                    recommendation_list.append(str(j))

        recurse(0, 1)
        return return_text
    return tree_to_code(tree, feature_names, symptom_name, symptom_days, symptom_number, symptoms_extra)


def make_symptoms_extra(tree, feature_names, symptom_name, symptom_days, symptom_number):
    def tree_to_code(tree, feature_names, symptom_name, symptom_days, symptom_number):
        tree_ = tree.tree_
        feature_name = [
            feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
            for i in tree_.feature
        ]

        chk_dis = ",".join(feature_names).split(",")
        symptoms_present = []

        disease_input = symptom_name
    
        conf, cnf_dis = check_pattern(chk_dis, disease_input)
        if conf == 1:
            for num, it in enumerate(cnf_dis):
                print(num, ")", it)
            if num != 0:
                conf_inp = symptom_number
            else:
                conf_inp = 0
            disease_input = cnf_dis[conf_inp]
        num_days = symptom_days

        def recurse(node, depth):
            global return_symptoms_extra
            return_symptoms_extra = []
            indent = "  " * depth
            if tree_.feature[node] != _tree.TREE_UNDEFINED:
                name = feature_name[node]
                threshold = tree_.threshold[node]

                if name == disease_input:
                    val = 1
                else:
                    val = 0
                if val <= threshold:
                    recurse(tree_.children_left[node], depth + 1)
                else:
                    symptoms_present.append(name)
                    recurse(tree_.children_right[node], depth + 1)
            else:
                present_disease = print_disease(tree_.value[node])

                red_cols = reduced_data.columns
                symptoms_given = red_cols[reduced_data.loc[present_disease].values[0].nonzero(
                )]
                symptoms_exp = []
                for syms in list(symptoms_given):
                    return_symptoms_extra.append(str(syms))
                second_prediction = sec_predict(symptoms_exp)
                calc_condition(symptoms_exp, num_days)
        recurse(0, 1)
        return return_symptoms_extra
    return tree_to_code(tree, feature_names, symptom_name, symptom_days, symptom_number)


def get_preprocessed_symptom_name(data):
    data1 = word_tokenize(data)
    pos_tagged_text = nltk.pos_tag(data1)
    print(pos_tagged_text)
    word = ''
    word2 = ''
    for i in pos_tagged_text:
        if i[1] == 'NN':
            word = word+'_'+i[0]
        elif i[1] == 'JJ':
            word = word+'_'+i[0]
        elif i[1] == 'VBG':
            word2 = word2+'_'+i[0]
    if(len(word) != 0):
        return word.strip()
    return word2.strip()


def get_preprocessed_symptom_day(data):
    data1 = word_tokenize(data)
    for i in data1:
        if(i in day_dict):
            return day_dict[i]


getSeverityDict()
getDescription()
getprecautionDict()

day_dict = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8,
            "nine": 9, "ten": "10", "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15}
symptom_name = "fever"
symptom_days = 1
symptom_number = 0
symptoms_extra = []
recommendation_list = []
disease_list = []
symptoms_exp = []
final_info = ""


@app.route('/', methods=['GET'])
def start_server():
    return "started"


@app.route('/reset-all', methods=['GET'])
def reset_all():
    global symptom_name,symptom_days,symptom_number,symptoms_extra,recommendation_list,disease_list,disease_list,symptoms_exp
    symptom_name = ""
    
    symptom_days = 1
    symptom_number = 0
    symptoms_extra = []
    recommendation_list = []
    disease_list = []
    symptoms_exp = []
    return jsonify({'value': 1})


@app.route('/verify-symptom-name', methods=['POST'])
def verify_symptom_name():
    data = request.get_json()
    result = get_preprocessed_symptom_name(data['name'])
    # day = get_preprocessed_symptom_day(data['day'])
    result1 = result[1:]

    chk_dis = ",".join(cols).split(",")
    conf, cnf_dis = check_pattern(chk_dis, result1)
    global symptom_name
    symptom_name = result1

    if conf == 1:
        return jsonify({'value': 1})
    return jsonify({"value": 0})


@app.route('/verify-symptom-days', methods=['POST'])
def verify_symptom_days():
    data = request.get_json()
    day = get_preprocessed_symptom_day(data['day'])
    global symptom_days
    symptom_days = day
    return jsonify({'value': 1})


# 2nd route
@app.route('/get-symptom-version', methods=['GET'])
def get_symptom_version():
    chk_dis = ",".join(cols).split(",")
    conf, cnf_dis = check_pattern(chk_dis, symptom_name)
    version_list = []
    for num, it in enumerate(cnf_dis):
        version_list.append(it)
    if len(version_list) > 1:
        return jsonify({'value': 1, "versions": version_list})
    return jsonify({'value': 0, "versions": version_list})


# 3rd route
@app.route('/set-symptom-version', methods=['POST'])
def set_symptom_version():
    data = request.get_json()
    global symptom_name
    symptom_name = data['version']
    symptoms_extra = make_symptoms_extra(clf, cols, symptom_name,
                                         symptom_days, symptom_number)
    return json.dumps(symptoms_extra)


# 5th route
@app.route('/set-symptoms', methods=['POST'])
def set_symptoms():
    global symptoms_exp
    data = request.get_json()
    for i in data:
        if(data[i] == "yes"):
            symptoms_exp.append(i)
    string1 = final_response(clf, cols, symptom_name,
                             symptom_days, symptom_number, symptoms_extra)
    return jsonify({"recommendatins": recommendation_list, "diseases": disease_list, "information": string1})


if __name__ == "__main__":
    app.run(debug=True)
