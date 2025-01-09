# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.

Pour démarer ce projet :

1. Installation :

   ```bash
   # Clonez ce dépôt
   git clone https://github.com/AbdrrahimDahmani/learning-platform-nosql.git

   cd learning-platform-nosql

   # Installation des dépendances
   npm install
   ```

2. Démarage :
   ```bash
   npm start
   ```

# Questions :

### Question 1: Quelles sont les informations sensibles à ne jamais commiter ?

- Réponse : les mots de passe, les API tokens, les clés privées du SSH

### Question 2: Pourquoi utiliser des variables d'environnement ?

- Réponse : Les variables d'environnement permettent de gérer les configurations sensibles et spécifiques à l'environnement sans les inclure directement dans le code source.

### Question 3: Pourquoi est-il important de valider les variables d'environnement au démarrage ?

- Réponse : Pour éviter les erreurs et garantir la sécurité et le bon fonctionnement de l'application.

### Question 4: Que se passe-t-il si une variable requise est manquante ?

- Réponse : L'application ne fonctionnera pas correctement ou plantera.

### Question 5: Pourquoi créer un module séparé pour les connexions aux bases de données ?

- Réponse : Pour centraliser la logique de connexion et faciliter la réutilisation du code.

### Question 6: Comment gérer proprement la fermeture des connexions ?

- Réponse : En utilisant des blocs "try...finally" pour s'assurer que les connexions sont fermées même en cas d'erreur.

### Question 7: Pourquoi créer des services séparés ?

- Réponse : Pour organiser le code de manière modulaire et permettre la réutilisation des fonctionnalités dans différentes parties de l'application.
