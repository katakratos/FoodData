**** extrayez et exécutez l'image Docker à partir du hub Docker

 1. changez le répertoire en FoodData

    cd FoodData
    
 2. exécutez l'image
    
   docker run -d -p 3030:3030 -p 8082:80 foodondata

 3. Accédez à http://localhost:8082 (vous devez disposer d'Internet pour visualiser les images)


        OU


**** construire et exécuter l'image localement

 1. accédez au répertoire de l'application et exécutez
   
    cd FoodData

 2. Construisez l'image Docker localement

   docker build -t foodondata .

 3. exécutez l'image construite localement

   docker run -d -p 3030:3030 -p 8082:80 foodondata

 4. Accédez à http://localhost:8082 pour accéder à l'interface Web (vous devez disposer d'Internet pour afficher les images)

NB : vous devez exposer le 3030 pour ouvrir jena-fuseki  et le 8082 pour accéder à l'interface web


         interface et interaction avec  l'application

    Lorsque le projet est lancé la premiere page qui s'affiche provient du fichier index.html, dans cette page vous verrez dans la barre de navigation differents menu qui sont:

    "HOME": lorsque vous cliquer sur ce menu , cela ouvre la page d'accueil par defaut de l'application, cette page affiche les differents repas(nom,image et description) présent dans l'ontologie
    "service": lorsque vous cliquez sur ce menu qui est déroulant vous pouvez vous dirigé vers d'autre page comme "List od food","List of class and subClass" and "Add food",
     Si vous sélectionner "List of food" vous verrez les noms des repas, leurs images et description.
     Si vous sélectionner "List od class and subClass" une page contenant la liste des classes, sous-classes et instances présentent dans l'ontologie.
     Si vous sélectionner "Add food"  la page contenant un formulaires'affichera, vous donnant la possibilité d'entrer le nom, la description et l'image du repas que vous souhaitez ajouter, 
       et pour verifier si votre repas a bien été ajouté vous pouvez revenir sur la page "HOME" et regarder si votre repas s'affiche.
   En cliquant sur le boutton "Make Query": lorsque vous cliquez sur ce menu vous pouvez voir une zone de saisie vous permettant de saisir manuellement vos requetes SPARQL pour interroger 
   les données de l'ontologie(elle contient un exemple de requête commentée que vous pouvez décommentée et éxécuté pour voire comment ça fonctionne) et lorsque vous cliquez sur le bouton "submit"  avoir, 
   vous verrez les resultats de votre requête s'afficher sous forme de tableau juste en dessous de la zone de saisie.
   
   Vous verrez aussi un boutton "List of food in desc Order" qui lui au clique affiche les repas dans l'ordre décroissant( de Z-A).
     