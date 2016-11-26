cd db-services
cd db-robot-store-service
mvn exec:java &
cd ../db-user-service
mvn exec:java &
cd ../db-diagram-service
mvn exec:java &
cd ../..
cd deployment/allintomcat
mvn tomcat7:run-war-only &
cd ../..