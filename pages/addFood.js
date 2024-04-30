// fonction pour ajouter un repas dans l'ontologie via le serveur jena-fuseki
  
  var imageFoodFile = document.querySelector("#food-image");
  
  var lienImage;
  
  imageFoodFile.addEventListener("change", () => {
    if (imageFoodFile.files && imageFoodFile.files[0]) {
      let reader = new FileReader();
  
      reader.onload = (e) => {
        lienImage = e.target.result;
        // alert(lienImage);
      };
  
      reader.readAsDataURL(imageFoodFile.files[0]);
    }
  });


function addDishToFuseki() {

    var foodName = document.getElementById('food-name').value;
     var descriptionFood = document.getElementById('food-description').value;

    if (foodName && lienImage) {
        // alert("ok")

        const query =
        `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         PREFIX owl: <http://www.w3.org/2002/07/owl#>
         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX food: <http://www.semanticweb.org/paulinio/ontologiesFood#>
         
         INSERT DATA{
            food:${foodName} rdf:type food:Dish ;
            food:name_of_dish "${foodName}"^^xsd:String ;
            food:image_of_dish "${lienImage}"^^xsd:String ;
            food:descript_of_dish "${descriptionFood}"^^xsd:String .
         }
         `
         ;
         const endpointURL= 'http://localhost:3030/foodData/update';
         const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type' :  'application/x-www-form-urlencoded',
                'Accept': 'application/sparql-results+json'
            },
            body: 'update='+ encodeURIComponent(query),
            mode:'no-cors'
         };

         fetch(endpointURL, requestOptions).then(response => {
              if(response.ok) {
                alert ("Dish save successfully");
                // Vider les champs du formulaire
                document.getElementById('food-name').value = '';
                imageFoodFile.value = '';
                document.getElementById('food-description').value = '';
                // Effacer l'image preview (si la fonctionnalité est implémentée)
                // document.getElementById('food-image-preview').src = '';
      
              }else {
                alert ("Dish  not save successfully");
              }
         })
         .then (error => console.error('Erreur lors de l\'exécution de la requête sparQl :', error));

    console.log (imageFoodFile.files)
} else {
  alert("Enter the name of dish and select his image");
}

}