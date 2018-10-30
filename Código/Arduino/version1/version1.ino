
#include <Ethernet.h>
#include <SPI.h>

#include "pitches.h"
int melody[] = {
  NOTE_C4, NOTE_G3, NOTE_G3, NOTE_A3, NOTE_G3, 0, NOTE_B3, NOTE_C4
};

// note durations: 4 = quarter note, 8 = eighth note, etc.:
int noteDurations[] = {
  4, 8, 8, 4, 4, 4, 4, 4
};

byte mac[] = { 0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x01 }; // RESERVED MAC ADDRESS
  byte ip[] = { 192, 168, 1, 111 };
  byte gateway[] = { 192, 168, 1, 1 };
  byte subnet[] = { 255, 255, 255, 0 };


EthernetClient client;

const int LEDPIN_IP = 8; // LED DE DHCP
const int LEDPIN_SENSOR = 12; // LED DE BOTON
const int LEDPIN_SENSORGAS = 22; // LED DE BOTON
const int BOTONPIN_SENSOR = 2;
const int BOTONPIN_SENSORGAS = 26;

int buttonState = 0;	
int buttonStateGas = 0;
int ultimoEstado=0;
int ultimoEstadoGas=0;

String data;

void setup() { 

  pinMode(LEDPIN_IP, OUTPUT);
  pinMode(LEDPIN_SENSOR, OUTPUT);
  pinMode(BOTONPIN_SENSOR, INPUT);
  pinMode(LEDPIN_SENSORGAS, OUTPUT);
  pinMode(BOTONPIN_SENSORGAS, INPUT);
   pinMode(7, OUTPUT);
	Serial.begin(115200);
 //   Ethernet.begin(mac,ip,gateway,gateway,subnet);
  	if (   Ethernet.begin(mac) == 0) {
		Serial.println("Fallo la configuración por DHCP"); 
	}
 else{
  
    Serial.println("Configuración correcta por DHCP"); 
    imprimirIP();
    musica();
    digitalWrite(LEDPIN_IP, HIGH);
  }
 
	client.setTimeout(10000);
 
}

void loop(){
   buttonState = digitalRead(BOTONPIN_SENSOR);
	 if (buttonState != ultimoEstado) {
    delay(2000);
      buttonState = digitalRead(BOTONPIN_SENSOR);
       if (buttonState != ultimoEstado) {
            if(buttonState == 1){              
             ultimoEstado=1;
             digitalWrite(LEDPIN_SENSOR, HIGH);
             enviarDato("1","3");
            } else {
             ultimoEstado=0;
             digitalWrite(LEDPIN_SENSOR, LOW);
             enviarDato("0","3");
            }
       }     
    }

      buttonStateGas = digitalRead(BOTONPIN_SENSORGAS);
   if (buttonStateGas != ultimoEstadoGas) {
    delay(2000);
      buttonStateGas = digitalRead(BOTONPIN_SENSORGAS);
       if (buttonStateGas != ultimoEstadoGas) {
            if(buttonStateGas == 1){              
             ultimoEstadoGas=1;
             digitalWrite(LEDPIN_SENSORGAS, HIGH);
            
             enviarDato("1","1");
            } else {
             ultimoEstadoGas=0;
             digitalWrite(LEDPIN_SENSORGAS, LOW);
       
             enviarDato("0","1");
            }
       }     
    }

    
  

}

void imprimirIP()
{
  Serial.print("Mi dirección ip es: ");
  for (byte thisByte = 0; thisByte < 4; thisByte++) {
    // print the value of each byte of the IP address:
    Serial.print(Ethernet.localIP()[thisByte], DEC);
    if(thisByte != 3) { Serial.print(".");}
  }

  Serial.println();
}

void enviarDato(String parametroValor, String parametroSenal){
Serial.print("Llamo a enviarDato(), valor a guardar:");
Serial.println(parametroValor);

//if ((parametro == "1" && digitalRead(BOTONPIN_SENSOR) == 0) || (parametro == "0" && digitalRead(BOTONPIN_SENSOR) == 1) ){
//  Serial.println("El evento no se mantuvo por al menos 2 segundos, no se enviará al servidor");
//  return;
//  }
// data = "{\"Id_Arduino\":234,\"Id_Senal\":2,\"N_Valor\":"+parametro+"}";
data="{";
data+="\"Id\":0,";
data+="\"idsenial\":"+parametroSenal+",";
data+="\"iddispositivo\":2,";
data+="\"valor\":"+parametroValor;
data+="}";

 
   if (client.connected()) { 
    client.stop();  // DISCONNECT FROM THE SERVER
  }
if (client.connect("proyectofinal2018.ddns.net",8080)) { // REPLACE WITH YOUR SERVER ADDRESS
 
    client.println("POST /api/Eventos HTTP/1.1"); 
    client.println("HOST: proyectofinal2018.ddns.net"); // SERVER ADDRESS HERE TOO
    client.println("Content-Type: application/json"); 
    //client.println("Cache-Control: no-cache");
   
    client.print("Content-Length: "); 
    client.println(data.length()); 
    client.println(); 
    client.println(data); 
    client.println(); 
    delay(100);
    Serial.println("Conexión con server exitosa");
    Serial.println("CUERPO ENVIADO:");
    Serial.println(data);
  } 
  else{
     Serial.println("Fallo la conexión con el servidor");
    }
  if (client.connected()) { 
    client.stop();  // DISCONNECT FROM THE SERVER
  }
}

void musica(){
    for (int thisNote = 0; thisNote < 8; thisNote++) {

    // to calculate the note duration, take one second divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(7, melody[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    // stop the tone playing:
    noTone(7);
  }
}
