# How it works?
# You add the images that you want inside src/images splitted into teams and then run `python createJson.py`
# It will create the data.json inside the src/ folder with the dataset that the app expects.

import os
import json

data = []

for team in os.listdir("./src/images"):
    if team == ".DS_Store":
        continue
    
    for fileTarget in os.listdir("./src/images/" + team):
        if fileTarget == ".DS_Store":
            continue
 
        teamMember = {}
        teamMember["team"] = team

        isTrainer = fileTarget[0:7] == "trainer"
        teamMember["trainer"] = isTrainer

        if isTrainer:
            teamMember["name"] = fileTarget[8:len(fileTarget) - 4]
        else:
            teamMember["name"] = fileTarget[0:len(fileTarget) - 4]
            
        teamMember["image"] = "./src/images/" + team + "/" + fileTarget
        
        data.append(teamMember)
    
with open('./src/data.json', 'w') as fp:
    json.dump(data, fp)
