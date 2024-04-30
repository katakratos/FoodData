    function executeQuery() {
        const text = document.getElementById("textarea").value; // Optional chaining and trim
        const result = document.getElementById("result");
        const divTable = document.querySelector(".table-results");
        console.log(text);
       
        const endpointUrl = 'http://localhost:3030/foodData/query';
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/sparql-results+json'
          },
          body: 'query=' + encodeURIComponent(text)
        };
      
        if (text) {
          fetch(endpointUrl, requestOptions)
          .then(response => response.json())
                  .then(data => {
                    if (data.results.bindings.length > 0) {
                      // Create the table HTML
                      let tableHTML = '<table border="2">';
                      // Add the table header
                      tableHTML += '<tr>';
                      for (let key in data.results.bindings[0]) {
                        tableHTML += `<th>${key}</th>`;
                      }
                      tableHTML += '</tr>';
                      // Add table rows with data
                      data.results.bindings.forEach(row => {
                        tableHTML += '<tr>';
                        for (let key in row) {
                          tableHTML += `<td style="padding: 3px 6px; max-width: 550px; overflow: hidden; text-overflow: ellipsis;">${row[key].value}</td>`;
                        }
                        tableHTML += '</tr>';
                      });
                      tableHTML += '</table>';
                      // Display the table
                      divTable.innerHTML = tableHTML;
                      divTable.style.color = "black";
                    } else {
                      divTable.innerHTML = "No results found.";
                      divTable.style.color = "black";
                    }
                  })
                  .catch(error => {
                    console.error('Error executing SPARQL query:', error);
                    divTable.innerHTML = "An error occurred. Please try again.";
                    divTable.style.color = "red";
                  });
        } else {
          alert("Please enter a SPARQL query.");
        }
      }
      
      document.addEventListener('DOMContentLoaded', function() {
        // No need to call executeQuery() here, it's triggered on form submit
      });