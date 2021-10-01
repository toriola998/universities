const inputBox = document.querySelector('#input-box')
const searchBar = document.querySelector('#search')
const displayUniversities = document.querySelector('.elements')

function getAll(e){
    //const axios = require('axios');
    // Make a request for a user with a given ID
    e.preventDefault();
    let inputValue = inputBox.value;

    axios.get(`http://universities.hipolabs.com/search?name=${inputValue}`)
        .then(function (response) {
        // handle success
        //console.log(response);

        let results = response.data
        //console.log(results)
        
        let html = "";
        results.forEach(element => {

          html += `
          <div>
            <h4 class="school-name">${element.name}</h4>
            <p class="school-country">${element.country}</p> 
            <a class="school-site" href = "${element.web_pages[0]}">${element.web_pages[0]}</a> 
          </div>
      `;

      displayUniversities.innerHTML = html;  
      });
    
    }).catch(function (error) {
        // handle error
        console.log(error);
         })
        .then(function () {
        // always executed
        }); 
} 

searchBar.addEventListener('click', getAll)