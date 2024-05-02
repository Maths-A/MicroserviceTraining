# Utiliser l'image officielle de Node.js en tant que base
FROM node:latest

# Créer un répertoire de travail dans l'image
WORKDIR /usr/src

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail de l'image
COPY ./package*.json /usr/src

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail de l'image
COPY . /usr/src

# Commande pour démarrer l'application
CMD ["node", "index.js"]