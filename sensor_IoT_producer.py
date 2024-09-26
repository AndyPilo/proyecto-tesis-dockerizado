import paho.mqtt.client as mqtt
import json
from random import uniform
import time

# mqtt_broker = "mqtt.eclipseprojects.io"
mqtt_client = mqtt.Client("MQTTProducer")
broker_ip = '192.168.164.65'
broker_port = 1883

# para cuando ingrese un usuario en mosquitto
#user = 'andy'
#password = 'andy'
#mqtt_client.username_pw_set(user,password)

try:
    mqtt_client.connect(broker_ip,broker_port,60)
except Exception as e:
    print("Error al conectar con el broker MQTT:", e)
    exit()

while True:
    try:
            randI = round(uniform(1, 3))
            randT = round(uniform(00.0, 60.0),2)
            randH = round(uniform(0, 100),2)
            randC = round(uniform(0.25, 0.7),2)
            
            # Obtener el timestamp actual
            timestamp = int(time.time())
            
            data_json = {
                'id':randI, 
                'temperature': randT, 
                'humidity': randH,
                'conductivity': randC,
                'timestamp': timestamp
            }
            
            json_str = json.dumps(data_json)
            
            # Enviar la cadena JSON a través de MQTT
            mqtt_client.publish("sensor_data", json_str)

            print(json.dumps(data_json))
            
            time.sleep(6)

    except Exception as e:
        print("Error al publicar mensaje:", e)
        mqtt_client.disconnect()
        break
