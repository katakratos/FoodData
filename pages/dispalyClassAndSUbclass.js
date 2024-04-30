// function classAndSubClasses (){
//     const query1=`PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
//     PREFIX owl: <http://www.w3.org/2002/07/owl#>
//     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
//     PREFIX food: <http://www.semanticweb.org/paulinio/ontologiesFood#>
//     SELECT DISTINCT ?class ?subClass WHERE {
//         ?class a owl:Class .
//         FILTER NOT EXISTS {
//               ?class rdfs:subClassOf ?superClass .
//              }
//         OPTIONAL { 
//             ?subClass rdfs:subClassOf ?class .
//         }
//     }`;

//     fetch('http://localhost:3030/foodData/query', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: 'query=' + encodeURIComponent(query1),
//     })
//     .then(response => response.json())
//     .then(data => {
//         const tableBody = document.querySelector('.table-item tbody');
//         let lineNumber = 1;

//         data.results.bindings.forEach(binding => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td><span class="text-muted">${lineNumber++}</span></td>
//                 <td>${binding.class.value}</td>
//                 <td>${binding.subClass ? binding.subClass.value : ''}</td>
//             `;
//             tableBody.appendChild(row);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
// }

// // Appeler la fonction pour charger les classes et sous-classes
// window.onload = function() {
//     classAndSubClasses();



// autre methode  
const query2=`PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX food: <http://www.semanticweb.org/paulinio/ontologiesFood#>
    SELECT DISTINCT ?class ?subClass WHERE {
        ?class a owl:Class .
        FILTER NOT EXISTS {
              ?class rdfs:subClassOf ?superClass .
             }
        OPTIONAL { 
            ?subClass rdfs:subClassOf ?class .
        }
    }`;

    const query3=`PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX food: <http://www.semanticweb.org/paulinio/ontologiesFood#>
      
           SELECT ?dish
            WHERE {
                 ?dish rdf:type food:Dish
           } 
    `;

 // URL de votre endpoint Fuseki
 const endpointUrl = 'http://localhost:3030/foodData/query';

 // Options pour les différentes requêtes fetch
 const requestOptions = {
     method: 'POST',
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept': 'application/sparql-results+json'
     },
     body: 'query=' + encodeURIComponent(query3) // Encodez la requête SPARQL
 };

 const requestOptionsClass = {
     method: 'POST',
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept': 'application/sparql-results+json'
     },
     body: 'query=' + encodeURIComponent(query2) // Encodez la requête SPARQL
 };

 // Exécution des différentes requêtes SPARQL
 fetch(endpointUrl, requestOptions)
     .then(response => response.json()) // Convertir la réponse en JSON
     .then(data => {

         // Initialisation du tableau pour stocker les valeurs des classes
         const classesArray = [];

         // Parcourir les résultats et extraire les valeurs des classes
         data.results.bindings.forEach(binding => {
             if (binding.dish && binding.dish.value) {
                 for (let i=binding.dish.value.length; i > 0; i--) {
                     if(binding.dish.value[i] == "#") {
                         let food = "";
                         for (let j=i+1; j < binding.dish.value.length; j++) {
                             food = food + binding.dish.value[j];
                         }
                         classesArray.push(food);
                     }
                 }
             }
         });

         // Afficher le tableau de valeurs des classes
         console.log(classesArray[2]);

         for (let food of classesArray) {
             var element = document.createElement("span");
             element.textContent = food;
             document.querySelector(".infos").append(element);

         }

     })
     .catch(error => console.error('Erreur lors de l\'exécution de la requête SPARQL :', error));


     fetch(endpointUrl, requestOptionsClass)
     .then(response => response.json()) // Convertir la réponse en JSON
     .then(data => {

         console.log(data);

         const classesArray = [];

         // Parcourir les résultats et extraire les valeurs des classes
            data.results.bindings.forEach(binding => {
             let obj = {
                 class: "",
                 subclass: []
             };

             if (binding.class && binding.class.value) {
                 const classValue = binding.class.value.split('#').pop();
                 obj.class = classValue;
             }

             if (binding.subClass && binding.subClass.value) {
                 const subClassValue = binding.subClass.value.split('#').pop();
                 obj.subclass.push(subClassValue);
             }

             // Vérifier si la classe existe déjà dans classesArray
             const existingClassIndex = classesArray.findIndex(item => item.class === obj.class);

             if (existingClassIndex !== -1) {
                 // Si la classe existe, ajouter la sous-classe si elle n'existe pas déjà
                 const existingSubClassIndex = classesArray[existingClassIndex].subclass.indexOf(obj.subclass[0]);
                 if (existingSubClassIndex === -1) {
                     classesArray[existingClassIndex].subclass.push(obj.subclass[0]);
                 }
             } else {
                 // Si la classe n'existe pas, ajouter l'objet entier à classesArray
                 classesArray.push(obj);
             }
         });

         //console.log(classesArray);

         for (let food of classesArray) {
             var element = document.createElement("ul");
             let subclassHTML = '';
             
             if (food.subclass.length !== 0) {
                 for (let i = 0; i < food.subclass.length; i++) {
                     subclassHTML += `<li style="margin-left: 15px;" onclick="displayInstances('${food.subclass[i]}')">${food.subclass[i]}</li>`;
                 }
             }

             element.innerHTML = `
                 <li style="font-weight: bold;" onclick="displayInstances('${food.class}')">${food.class}</li>
                 <ul>
                     ${subclassHTML}
                 </ul>
             `;
             document.querySelector(".class-subclass").append(element);
         }


     })
     .catch(error => console.error('Erreur lors de l\'exécution de la requête SPARQL :', error));


     // variable tableau chargée de recupérer toutes les instances
     var tabInstances = [];

     // Function pour afficher les instances d'une classe ou d'une sous classe
     function displayInstances(param) {

         let searchQuery = document.getElementById("researchValue").value;

         document.querySelector(".instances").innerHTML = `<p style="text-align: center;">All Instances</p>`;

         const query = `
         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         PREFIX owl: <http://www.w3.org/2002/07/owl#>
         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
         PREFIX food: <http://www.semanticweb.org/paulinio/ontologiesFood#>
            

             SELECT ?dish
             WHERE {
                 ?dish rdf:type food:${param} .
             } ORDER By ASC (?dish)

         `;

         const requestOptions1 = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'Accept': 'application/sparql-results+json'
             },
             body: 'query=' + encodeURIComponent(query)
         };

         fetch(endpointUrl, requestOptions1)
             .then(response => response.json())
             .then(data => {
                 const classesArray = [];

                 // Parcourir les résultats et extraire les valeurs des classes
                 data.results.bindings.forEach(binding => {
                     if (binding.dish && binding.dish.value) {
                         const dishValue = binding.dish.value.split('#').pop();
                         classesArray.push(dishValue);
                     }
                 });

                 // Afficher le tableau de valeurs des classes
                 console.log(classesArray);
                 tabInstances = classesArray;
                 
                 if(classesArray.length == 0) {
                         var element = document.createElement("em");
                         element.textContent = "No instance about this class";
                         element.style["font-size"] = 25+"px";
                         element.style["font-weight"] = "bold";
                         element.style["color"] = "gray";
                         document.querySelector(".instances").append(element);
                     }else{
                             for (let food of classesArray) {
                                     var element = document.createElement("ul");
                                     let subclassHTML = '';
                                     
                                     if(food.toLowerCase().includes(searchQuery.toLowerCase())) {
                                         subclassHTML += `<li style="margin-left: 15px;" onclick="displayInfos('${food}')">${food}</li>`;
                                     }
                                         
                                     element.innerHTML = `
                                             ${subclassHTML}
                                     `;
                                     
                                     document.querySelector(".instances").appendChild(element);
                             }
                     }

             })
             .catch(error => console.error('Erreur lors de l\'exécution de la requête SPARQL :', error));
     }


                // Function chargée d'afficher les instances en fonction de la recherche de l'utilisateur
                function displayByQuery(searchQuery) {

                    document.querySelector(".instances").innerHTML = `<p style="text-align: center;">All Instances</p>`;

                    if(tabInstances.length == 0) {
                                var element = document.createElement("em");
                                element.textContent = "No instance about this class";
                                element.style["font-size"] = 25+"px";
                                element.style["font-weight"] = "bold";
                                element.style["color"] = "gray";
                                document.querySelector(".instances").append(element);
                            }else{
                                    for (let food of tabInstances) {
                                            var element = document.createElement("ul");
                                            let subclassHTML = '';
                                            
                                            if(food.toLowerCase().includes(searchQuery.toLowerCase())) {
                                                subclassHTML += `<li style="margin-left: 15px;" onclick="displayInfos('${food}')">${food}</li>`;
                                            }
                                                
                                            element.innerHTML = `
                                                    ${subclassHTML}
                                            `;
                                            
                                            document.querySelector(".instances").appendChild(element);
                                    }
                            }
               }









// };
