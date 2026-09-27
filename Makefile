.PHONY: all clean

all: build

clean:
	cd sonar-plugin && mvn clean

build: clean
	cd sonar-plugin && mvn package

compile: clean
	cd sonar-plugin && mvn compile

docker-clean:
	docker compose down --volumes

docker-init:
	docker compose up --build -d

docker-logs:
	docker compose logs -f

docker-check-plugin:
	./docker-check-plugin.sh

start:
	docker compose start

stop:
	docker compose stop
