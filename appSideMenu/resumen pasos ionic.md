### Pasos para compilar o depurar en el telefono

> 1) Configurar las variables de entorno de Java que apunte a jdk 1.8
JAVA_HOME

> 2)Instalar SDK, Android


//// instalacion del plugin de mensajeria SMS
ref: https://ionicframework.com/docs/native/sms
> 1)ionic cordova plugin add cordova-sms-plugin
> 2)npm install @ionic-native/sms


// Conexion-sincronizacion con DevApp de Ionic
> 1) ionic login
> 2) ionic link
#### ionic hub (dashboard)

/// Comandos utilizados para el ambiente android
> 1)ionic cordova platform add android
> 2)ionic build android
> 3)ionic cordova run android (contruye o recompila )


Instalado android aceptar los terminos para licencia
https://stackoverflow.com/questions/39760172/you-have-not-accepted-the-license-agreements-of-the-following-sdk-components

/// estableciendo variables de entorno
Android sdk home y root

// creando imagen avd para la compilacion
Se crea un perfil del telefono con todos las caracteristicas del mismo
