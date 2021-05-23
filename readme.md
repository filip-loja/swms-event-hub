# Http
* GET http://swms-event-hub.westeurope.azurecontainer.io:3000/
* POST http://swms-event-hub.westeurope.azurecontainer.io:3000/alert
* POST http://swms-event-hub.westeurope.azurecontainer.io:3000/telemetry

# Ws
* http://swms-event-hub.westeurope.azurecontainer.io:3001
* alert
* telemetry

# Docker build
```
docker build -t swms-event-hub .
docker tag swms-event-hub:latest filip1997/swms-event-hub:latest
docker push filip1997/swms-event-hub:latest
```
