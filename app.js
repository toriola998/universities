const inputBox = document.querySelector('#input-box')
const searchBar = document.querySelector('#search')
const displayUniversities = document.querySelector('.elements')
const showHide = document.querySelector('.show-hide')
const closeIcon = document.querySelector('.close-icon')
const overlay = document.querySelector('.overlay')
const alertBox = document.querySelector('.details')


function getAll(e){
    //const axios = require('axios');
    // Make a request for a user with a given ID
    e.preventDefault();
    let inputValue = inputBox.value;
    let html = "";

    axios.get(`http://universities.hipolabs.com/search?name=${inputValue}`)
        .then(function (response) {
        // handle success
        //console.log(response);

        let results = response.data
        //console.log(results)
        
        if(results.length >= 1) { 
            results.forEach(element => { 
            html += `
            <div>
              <h4 class="school-name">${element.name}</h4>
              <p class="school-country">${element.country}</p> 
              <a class="school-site" href = "${element.web_pages[0]}">${element.web_pages[0]}</a> 
            </div>
        `;
        displayUniversities.innerHTML = html;  
        }) } else if(results.length === 0){
            showHide.style.display = "block";
            overlay.style.display = "block";

            html += `
            <div>
                <img src="./assets/not-found.png"  id="not-found-photo"/>
                <h2 class="oops">Oops! <br>Sorry the word you requested is not found</h2>
            </div>
            `;

            alertBox.innerHTML = html
        }
        }).catch(function (error) {
             // handle error
            if(error){
                showHide.style.display = "block";
            overlay.style.display = "block";
           
            html += `
            <div>
                <img src="./assets/error.png"  id="error-photo"/>
                <h2 class="oops">Oops! <br>Unable to connect to the internet</h2>
            </div>
            `;
            alertBox.innerHTML = html
            }

            console.log(error);
        })
        .then(function () {
        // always executed
        }); 
    } 
    
    searchBar.addEventListener('click', getAll)

    function closeModal(){ 
        showHide.style.display = "none";
        overlay.style.display = "none";
    }
    closeIcon.addEventListener('click', closeModal)
   
    /**
     clearResult();
    function clearResult(){
    if (inputValue = "") {
        displayUniversities.innerHTML = null;
    }*
    }*/
