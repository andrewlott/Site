import json
f = open('google_transit/shapes.txt','r')
f.readline() #kill ex data
d = {}
for line in f:
    info = line.strip()[:-1].split(',')
    if info[0] not in d:
        d[info[0]] = []
    d[info[0]].append((float(info[1]),float(info[2])))

json.dump(d,open('routes.json','w'))
