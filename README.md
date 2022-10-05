# TFE_CorentinDallenogare_2022

/!\ USE RASPI OS

## install dependencies

1) sudo pip3 install Flask-Limiter
1) sudo pip3 install adafruit-circuitpython-led-animation
1) sudo pip3 install adafruit-circuitpython-fancyled
1) sudo pip3 install Flask
1) sudo pip3 install python-dotenv
1) sudo pip3 install flask-jwt-extended
1) sudo pip3 install adafruit-circuitpython-neopixel
1) sudo pip3 install typing-extensions --upgrade

## create your .env (check .env.exemple)

## setup ngnix service

=> check deploiement/ngnix.service

## Create app service

You need to create a service for starting the backend when raspberry start.

Check deploiement/trileds.service

## change raspberry hostname 

1) sudo nano /etc/hosts
1) sudo nano /etc/hostname
1) sudo /etc/init.d/hostname.sh
1) sudo reboot

=> acces with XXXX.local

## NEED to buy

| number | Description |
| --- | ----------- |
|1 |Base du triangle|
|1 |Diffuseur|
|1 |Pogopin male|
|1 |Pogopin femelle|
|3| Ruban de 10 LEDs WS2815|
|3| Aimants 5x1mm (N35)|
|3| Aimants 10x1mm (N35)|
|3| Aimants 5x2mm (N35)|
|1| 60 cm de câble|
|1 |Colle Loctite super glue-3|
|1| 20 cm de gaine thermorétractable|


