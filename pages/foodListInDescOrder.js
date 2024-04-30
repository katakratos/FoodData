function foodinDescOrder () {
    const foodDescOrder=`
    
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX food: <http://www.semanticweb.org/paulinio/ontologiesFood#>
    SELECT  ?name_of_dish ?image_of_dish ?descript_of_dish  WHERE {
   
    ?dish rdf:type food:Dish .
    ?dish food:name_of_dish ?name_of_dish .
    ?dish food:image_of_dish ?image_of_dish .
    ?dish food:descript_of_dish ?descript_of_dish .
  
   
  } 
    ORDER By Desc (?name_of_dish)`;
          // fetch of food in descending order
  
  fetch('http://localhost:3030/foodData/query', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json'
    },
    body: 'query='  + encodeURIComponent(foodDescOrder),
  })
  .then(response => response.json())
  .then(data => { console.log(data);
    //  const foodItem = document.querySelector('#food-container1');
  
    //  var listFood = ``;
  
    //  data.results.bindings.forEach(binding => {
  
    //          console.log(binding.name_of_dish.value);
  
    //          listFood += `<Div>${binding.name_of_dish.value}
             
    //          <img src = '${binding.image_of_dish.value}'/>
    //          </Div>`;
  
  
    const foodItem = document.querySelector('#food-container1');
  
    // Improved variable naming for clarity
    let mealList = ''; // Stores the HTML content for all meals
    
    data.results.bindings.forEach(binding => {
      // Create a div element for each meal item
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal-item'); // Add a CSS class for styling
    
      // Create a paragraph element for the meal name
      const mealName = document.createElement('h3');
      mealName.textContent = binding.name_of_dish.value;
      mealDiv.appendChild(mealName);
    
      // Create an image element for the meal's image
      const mealImage = document.createElement('img');
      mealImage.src = binding.image_of_dish.value;
      mealImage.alt = binding.name_of_dish.value; // Add alt text for accessibility
      mealImage.style.width = '150px'; // Set image width
      mealImage.style.height = '100px'; // Set image height
      mealDiv.appendChild(mealImage);
       
      const descriptionTitle = document.createElement('h4');
      descriptionTitle.textContent = 'Description';
      mealDiv.appendChild(descriptionTitle);
  
      // Optionally, include a description paragraph (if available in your data)
      if (binding.descript_of_dish) {
      
        const mealDescription = document.createElement('p');
        mealDescription.textContent = binding.descript_of_dish.value;
        mealDiv.appendChild(mealDescription);
      }
    
      // Add the constructed meal div to the meal list string
      mealList += mealDiv.outerHTML; // Use outerHTML to include styling
     
  });
  
  
  console.log(mealList);
  foodItem.innerHTML = mealList;
  
  
  
  })
  .catch(error => {
  console.error('Error fetching data:', error);
  });
}
