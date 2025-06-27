# Variables
COMPOSE = docker compose
APP_SERVICE = app
SCHEDULER_SERVICE = scheduler

# Commandes de base
up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f

build:
	$(COMPOSE) build

rebuild:
	$(COMPOSE) down -v
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d

# Prisma
migrate-dev:
	$(COMPOSE) exec $(SCHEDULER_SERVICE) npx prisma migrate dev --name init

db-push:
	$(COMPOSE) exec $(SCHEDULER_SERVICE) npx prisma db push

generate:
	$(COMPOSE) exec $(SCHEDULER_SERVICE) npx prisma generate

studio:
	$(COMPOSE) exec $(SCHEDULER_SERVICE) npx prisma studio

# Accès shell
app-sh:
	$(COMPOSE) exec $(APP_SERVICE) sh

scheduler-sh:
	$(COMPOSE) exec $(SCHEDULER_SERVICE) sh

# Nettoyage
clean:
	$(COMPOSE) down -v
	docker volume prune -f

