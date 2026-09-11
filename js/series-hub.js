import { createNav, createFooter, createSearch, formatLink } from "./main.js";

window.onload = function(){
    document.querySelector("body").innerHTML += `        
    <div id="nav"></div>
    <div id="core">
        <div id="intro"><h1>LIST OF SERIES</h1></div>
        <div id="reviews"></div>
    </div>
    <div id="footer"></div>
    `;

    let series = []
    let dataObj;
    let data;
    const xmlhttp = new XMLHttpRequest();
    //once the json is received, organize the data and populate the divs
    xmlhttp.onload = function() {
        //gets the reviews obj from our json file and converts it into an array
        //the keys are lost upon conversion, but we just need the values so it doesn't matter
        dataObj = JSON.parse(this.responseText).reviews;
        data = Object.values(dataObj);
        //sorts the data (by date by default)
        for(let i = 0; i < data.length; i++){
            if(data[i].series.length > 0){
                for(let j = 0; j < data[i].series.length; j++){
                    if(series.includes(data[i].series[j]) == false){
                        series.push(data[i].series[j]);
                    }
                }
            }
        }
        series.sort(sortByName);
        //populate the core of the page
        for(let i = 0; i < series.length; i++){
            document.querySelector("#reviews").innerHTML += createThumbnail(series[i], formatLink(series[i]));
        }
        createSearch(Object.values(dataObj));
    };
    //send the request
    xmlhttp.open("GET", "../test-reviews.json");
    xmlhttp.send();
    
    createNav();
    createFooter();
}

//sorts data by name (A to Z)
//for array.sort method
function sortByName(a, b){
    if (a > b){
        return 1;
    }
    else if (a < b){
        return -1;
    }
    else{
        return 0;
    }
}

function createThumbnail(title, img){

    let titleHTML = `<h2 class="reviewtitle">${title}</h2>`;
    let imgHTML = `<div class="reviewimgdiv"><img class="reviewimg" src="../images/${img}.png" alt="${title} logo."></img></div>`;
    //return the thumbnail to be used in the html div 
    return `<a href="../hubs/${formatLink(title)}.html" class="thumbnail"><div class="review"><div class="reviewalltext seriesHub">${titleHTML}</div>${imgHTML}</div></a>`;
}