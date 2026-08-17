import {createNav, createFooter, formatLink} from "./main.js";
"use strict";

let dataObj;
let data;
let selected = [];
let hubType = document.title.split(" Hub")[0];

//populate the divs when the window loads
window.onload = () => {
    onload(sortByNewestReview);
}

function onload(sort){
    document.querySelector("body").innerHTML += `        
    <div id="nav"></div>
    <div id="core">
        <div id="intro"></div>
        <div id="headline"></div>
        <div id="reviews"></div>
    </div>
    <div id="footer"></div>
    `;

    if(document.title == "Raven Tri Reviews"){
        document.querySelector("#intro").innerHTML += `                
        <p style="font-weight:bold;">
            Hello and welcome to Raven Tri Reviews! As an avid enjoyer of all things fiction from movies to games to comics, I decided to start my own review 
            blog to share my experiences with all of you. 
        </p>
        <p>My current project is a <a href="./marvel-movies.html">Marvel Marathon,</a> watching every Marvel movie before 
            they start concluding their Multiverse Saga with Avengers: Secret Wars next December. And I do mean every Marvel 
            movie, starting with 1998's Blade (see the full list 
            <a href="https://docs.google.com/spreadsheets/d/1KloVhC4sq42WFlLswKACAA2ge_vjNu8tzacP42z5NNM/edit?usp=sharing">here</a>, 
            with an updated order for the Multiverse Saga). I've seen many 
            of these movies before, but not for a long time, so I think this will be a lot of fun, and I hope you'll 
            join me for the ride.
        </p>
        <p>
            Uploads for my Marvel Marathon will resume on a weekly basis in late September, and I will continue to upload every Sunday until then. 
            You can also check out my <a href="https://www.tumblr.com/raventri-reviews">Tumblr</a> and 
            <a href="https://letterboxd.com/RavenTri/">Letterboxd</a> for additional reviews that may not have made it 
            onto the site for one reason or another. Thanks for joining me, and happy readings!
            <br><b>All reviews contain Spoilers!</b>
        </p>
        `;
    }
    else{
        document.querySelector("#intro").innerHTML += `<h1>${hubType}</h1>`;
    }
    //create the header and footer while the data loads
    createNav();
    createFooter();
    //send out a request for json
    const xmlhttp = new XMLHttpRequest();
    //once the json is received, organize the data and populate the divs
    xmlhttp.onload = function() {
        //gets the reviews obj from our json file and converts it into an array
        //the keys are lost upon conversion, but we just need the values so it doesn't matter
        dataObj = JSON.parse(this.responseText).reviews;
        data = Object.values(dataObj);
        //sorts the data (by date by default)
        if(document.title != "Raven Tri Reviews"){
            let hubTypes;
             
            if(hubType.includes(": ")){
                hubTypes = hubType.split(": ");
            }
            else{
                hubTypes = [hubType];
            }

            for(let i = 0; i < data.length; i++){
                let valid = true;
                for(let j = 0; j < hubTypes.length; j++){
                    if(!(data[i].medType.includes(hubTypes[j]) || data[i].series.includes(hubTypes[j]))){
                        valid = false;
                    }
                }
                if(valid == true){
                    selected.push(data[i]);
                }
            }
           
            
        }
        else{
            selected = data;
        }
        selected.sort(sort);
        //populate the core of the page
        populateReviews(selected);
    };
    //send the request
    xmlhttp.open("GET", "../test-reviews.json");
    xmlhttp.send();
}

function select(type){
    for(let i = 0; i < data.length; i++){
        if(data[i].medType.includes(type) || data[i].series.includes(type)){
            selected.push(data[i]);
        }
    }
}

//sorts data by date (newest to oldest)
//for array.sort method
function sortByNewestReview(objA, objB){
    let a = Date.parse(objA.date);
    let b = Date.parse(objB.date);
    if (a < b){
        return 1;
    }
    else if (a > b){
        return -1;
    }
    else{
        return 0;
    }
}

//gets the specified div from the doc and populates it with the data
function populateReviews(data){
    //get the div to populate
    let reviewDiv = document.querySelector("#reviews");
    //populate the div with the data
    for(let i = 1; i < data.length; i++){
        reviewDiv.innerHTML += createThumbnail(data[i].title, data[i].release, data[i].date, data[i].blurb, formatLink(data[i].title), data[i].medType, data[i].series, "review");
    }

    //populate the headline with the newest review
    let featureDiv = document.querySelector("#headline");
    featureDiv.innerHTML += createThumbnail(data[0].title, data[0].release, data[0].date, data[0].blurb, formatLink(data[0].title), data[0].medType, data[0].series, "headline");
    document.querySelector(".headline").onclick = function(){
        return 0;
    }
}

//will need to add populate functions for the other divs

//for the thumbnails on the hub pages
//revType: determines whether the thumbnail is a normal review ("review") or a headliner ("headline")
function createThumbnail(title, release, date, text, img, medType, series, revType){
    //build the review thumbnail
    let typeHTML = `<h3 class="reviewtype">`;
    for(let i = 0; i < medType.length; i++){
        typeHTML += `<p class="medType">${medType[i].toUpperCase()}</p> `;
    }
    for(let i = 0; i < series.length; i++){
        typeHTML += `<p class="series">${series[i].toUpperCase()}</p> `;
    }
    typeHTML += `</h3>`;
    let titleHTML = `<h2 class="reviewtitle">${title} (${release})</h2>`;
    let dateHTML = `<p class="reviewdate">Reviewed: ${date}</p>`;
    let textHTML = `<p class="reviewtext">${text}</p>`;
    let imgHTML = `<div class="reviewimgdiv"><img class="reviewimg" src="../images/${img}.png" alt="${title} thumbnail."></img></div>`;
    //return the thumbnail to be used in the html div 
    return `<a href="../reviews/${formatLink(title)}.html" class="thumbnail"><div class="${revType}"><div class="reviewalltext">${typeHTML}${titleHTML}${dateHTML}${textHTML}</div>${imgHTML}</div></a>`;
}

export {onload};