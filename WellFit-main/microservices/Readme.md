**Flask microservice for disease prediction.** <br>
The api is hosted in heroku eg:https://diagonosisapi.herokuapp.com

**API routes:**<br>

**'/'** : Home route, tells that the server is online.<br>
**'/reset-all'** : Resets all the parameters of the API.<br>
**'/verify-symptom-name'** : Recieves the message text, extracts the symptom name using nlp and checks if it is present in our dataset.<br>
**'/verify-symptom-days'** : Recieves the message text and extracts the days form it using nlp.<br>
**'/get-symptom-version'** : Returns the different types of diseases associated with the symptom.<br>
**'/set-symptom-version'** : Recieves the user selected disease and returns different conditions according to the disease.<br>
**'/set-symptoms'** : Recieves the conditions chosen by the user, calls the ML models and returns the predicted disease, its explaination and precautions to be taken.<br>
