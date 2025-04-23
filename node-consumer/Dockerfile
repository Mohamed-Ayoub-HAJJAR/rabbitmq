FROM node:16

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration et dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'app
COPY . .

# Commande à exécuter
CMD ["node", "index.js"]

