docker-compose down --volumes
docker network rm iotexNetwork
docker image rm iotex-queue
docker image rm iotex-webapp
cp .env.example queue/.env.example
docker build --tag=iotex-queue queue
cp .env.symfony webapp/.env
docker image rm iotex-webapp
docker build --tag=iotex-webapp webapp
docker-compose up -d