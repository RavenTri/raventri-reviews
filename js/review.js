import {createNav, createFooter, formatLink} from "../js/main.js";

"use strict";

let data;

let scoreText = [
    "Disasterpiece",
    "So Bad It's a Learning Tool",
    "Bad and Uninteresting",
    "Bad, but Could Be Worse",
    "The Bad Cancels Out The Good",
    "Serviceable",
    "Good",
    "Would Recommend",
    "A Must-Watch",
    "Masterpiece"
];

//populate the divs when the window loads
window.onload = () => {
    //establish the page structure
    document.querySelector("body").innerHTML += `        
    <div id="nav"></div>
    <div id="core">
        <div id="header"></div>
        <div id="review"></div>
    </div>
    <div id="footer"></div>`;

    createNav();
    createFooter();
    let title = document.title.split(" Review")[0];
    //fetch json
    //send out a request for json
    const xmlhttp = new XMLHttpRequest();
    //once the json is received, organize the data and populate the divs
    xmlhttp.onload = function() {
        //gets the reviews array from our json file
        let cur = JSON.parse(this.responseText).reviews[title];
        createReview(cur.title, cur.release, cur.date, cur.img, cur.medType, cur.series, cur.review);
        createReviewScore(cur.score);
    };
    //send the request
    xmlhttp.open("GET", "../test-reviews.json");
    xmlhttp.send();
}

//for the actual review pages
//will be filled out later
function createReview(title, release, date, img, medType, series, text){
    let header = document.querySelector("#header");
    header.innerHTML = createReviewHeader(title, release, date, formatLink(title), medType, series);
    
    let review = document.querySelector("#review");
    
    review.innerHTML = `${text}`;
}

function createReviewHeader(title, release, date, img, medType, series){
    let typeHTML = `<h3 class="reviewtype">`;
    for(let i = 0; i < medType.length; i++){
        typeHTML += `<a href="../hubs/${formatLink(medType[i])}.html" class="medType">${medType[i].toUpperCase()}</a> `;
    }
    for(let i = 0; i < series.length; i++){
        typeHTML += `<a href="../hubs/${formatLink(series[i])}.html" class="series">${series[i].toUpperCase()}</a> `;
    }
    typeHTML += `</h3>`;
    let titleHTML = `<h2 class="reviewtitle">${title} (${release})</h2>`;
    let dateHTML = `<p class="reviewdate">Reviewed: ${date}</p>`;
    let imgHTML = `<div class="reviewimgdiv"><img class="reviewimg" src="../images/${img}.png" alt="${title} thumbnail."></img></div>`;
    return `<div id="headertext">${typeHTML}${titleHTML}${dateHTML}</div>${imgHTML}`;
}

function createReviewScore(scoreNum){
    //let score = document.querySelector("#score");
    let score = `<div id="score">
    <p id="scoreNum">${scoreNum}<span style="font-size:1rem;">/10</span></p>
    <p id="scoreText">${scoreText[Math.trunc(scoreNum)-1]}</p>
    </div>
    `;
    document.querySelector("#review").innerHTML += score;
    //scoreText text will be replaced with text attached to the score via an array or dict
}