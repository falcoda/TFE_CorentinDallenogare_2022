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
