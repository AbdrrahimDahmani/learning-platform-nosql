# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.

# video

![](video/demonstration.mp4)
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

3. Accéder aux swagger en navigant à : `http://localhost:3000/api-docs`

# Questions :

#### Question 1: Quelles sont les informations sensibles à ne jamais commiter ?

- Réponse : les mots de passe, les API tokens, les clés privées du SSH

#### Question 2: Pourquoi utiliser des variables d'environnement ?

- Réponse : Les variables d'environnement permettent de gérer les configurations sensibles et spécifiques à l'environnement sans les inclure directement dans le code source.

#### Question 3: Pourquoi est-il important de valider les variables d'environnement au démarrage ?

- Réponse : Pour éviter les erreurs et garantir la sécurité et le bon fonctionnement de l'application.

#### Question 4: Que se passe-t-il si une variable requise est manquante ?

- Réponse : L'application ne fonctionnera pas correctement ou plantera.

#### Question 5: Pourquoi créer un module séparé pour les connexions aux bases de données ?

- Réponse : Pour centraliser la logique de connexion et faciliter la réutilisation du code.

#### Question 6: Comment gérer proprement la fermeture des connexions ?

- Réponse : En utilisant des blocs "try...finally" pour s'assurer que les connexions sont fermées même en cas d'erreur.

#### Question 7: Pourquoi créer des services séparés ?

- Réponse : Pour organiser le code de manière modulaire et permettre la réutilisation des fonctionnalités dans différentes parties de l'application.

#### Question : Comment gérer efficacement le cache avec Redis ?

- Réponse : en stockant les données fréquemment consultées pour réduire la charge sur la base de données principale. Configurer les dates d'expiration pour les clés afin de libérer de l'espace mémoire.

#### Question: Quelles sont les bonnes pratiques pour les clés Redis ?

- Réponse : on utilise des noms de clés descriptifs et structurés pour faciliter la gestion et la recherche. En évitant les clés trop longues et en utilisant des préfixes pour regrouper les clés par fonctionnalité ou module.

#### Question: Comment organiser le point d'entrée de l'application ?

- Réponse : on doit initialiser les configurations nécessaires, charger les modules essentiels, et démarrer le serveur et utiliser un fichier principal `app.js` pour centraliser ces opérations.

#### Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

- Réponse : En utilisant un outil comme `nodemon` pour redémarrer automatiquement l'application en cas de changement de code pendant le développement.

#### Question: Quelle est la différence entre un contrôleur et une route ?

- Réponse : Un contrôleur gère la logique métier et les opérations, tandis qu'une route définit les points d'accès de l'API et les associe aux contrôleurs correspondants.

#### Question : Pourquoi séparer la logique métier des routes ?

- Réponse : Pour maintenir un code propre et modulaire, facilitant la maintenance et les tests.
