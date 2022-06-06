import json
import argparse
path='./config/brightness.json'
if __name__ == '__main__':
    """
    Update the brightness
    Param: count: int
    Update the brightness in the config file
    """
    parser = argparse.ArgumentParser(description="Input effects for ws2812b/neopixel")
    
    parser.add_argument('effect', type=str, help="Input Effect Type")
    args = parser.parse_args()
    count = int(args.effect)

    
    if(count!='' and count>=0):
        with open(path, 'w',encoding='utf8') as f:
            print(count)
            if count ==0 :
                count +=1
            data ={'brightness':str(count)} 
            f.seek(0)
            json.dump(data, f, indent=4,ensure_ascii=False)
    
    