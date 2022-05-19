import json
import mode
path='./config/config.json'

with open(path, 'r+',encoding='utf8') as f:
    data = json.load(f)
    print(data['number'])
    mode.num_pixels = data['number']*30
    mode.numTriangle =data['number']

def saveCount(count):
    print("aaaaaaaaaazzzz",count)
    if(count!='' and count>=0):
        with open(path, 'r+',encoding='utf8') as f:
            data = json.load(f)
            print(count)
            data['number'] =count
            f.seek(0)
            json.dump(data, f, indent=4,ensure_ascii=False)
        mode.updatePixels(count*30)