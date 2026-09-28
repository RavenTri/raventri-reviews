"use strict";
let hubDropped = false;

//since the header (nav) and footer are the same on almost every page, they'll likely get their own JS file
function createNav(){
    let nav = document.querySelector("#nav");

    let moviesDropdown = moviesTVDropdown("movies");
    let tvDropdown = moviesTVDropdown("tv");

    let seriesDropdown = `<div id="seriesDrop" class="dropdown">
        <a href="../hubs/marvel-marathon.html" class="navElem ddElem">Marvel Marathon</a>
        <a href="../hubs/dcu.html" class="navElem ddElem">DCU</a>
        <a href="../hubs/glitch.html" class="navElem ddElem">GLITCH</a>
        <a href="../hubs/series.html" class="navElem ddElem">All...</a>
    </div>`;

    let logo = `<div id="logoElems"><a href="../index.html" ><img id="siteLogo" src="../raven treye box.png" alt="Raven Tri logo. Click to return to main page."></a></div>`;

    //NAV
    //create HTML structure
    nav.innerHTML = `
        <div id="navElems">
            ${logo}
            <div id="ddElems">
                <p id="hubDropper" class="navElem">HUBS ↓</p>
                <div id="dropperWrapper">
                    <div id="moviesDropper"><a href="../hubs/movies.html" class="navElem dropper">Movies ↓</a>${moviesDropdown}</div>
                    <div id="tvDropper"><a href="../hubs/tv.html" class="navElem dropper">TV ↓</a>${tvDropdown}</div>
                    <div id="seriesDropper"><a href="../hubs/series.html" class="navElem dropper">Series ↓</a>${seriesDropdown}</div>
                </div>
                <div id="searchElems"></div>
            </div>
        </div>`;

    //set up js events
    let movies = document.querySelector("#moviesDropper");
    let tv = document.querySelector("#tvDropper");
    let series = document.querySelector("#seriesDropper");

    movies.onmouseover = function(){
        setDropdownEvent("#moviesDrop", "flex");
    }
    movies.onmouseout = function(){
        setDropdownEvent("#moviesDrop", "none");
    }

    tv.onmouseover = function(){
        setDropdownEvent("#tvDrop", "flex");
    }
    tv.onmouseout = function(){
        setDropdownEvent("#tvDrop", "none");
    }

    series.onmouseover = function(){
        setDropdownEvent("#seriesDrop", "flex");
    }
    series.onmouseout = function(){
        setDropdownEvent("#seriesDrop", "none");
    }


    document.querySelector("#hubDropper").onclick = function(event){
        let dds = document.querySelectorAll(".hubDrop");
        if (!hubDropped){
            moviesDropper.style.display = "flex";
            tvDropper.style.display = "flex";
            seriesDropper.style.display = "flex";
            moviesDrop.style.display = "flex";
            tvDrop.style.display = "flex";
            seriesDrop.style.display = "flex";
            hubDropped = true;
            event.preventDefault();
        }
        else{
            moviesDropper.style.display = "none";
            tvDropper.style.display = "none";
            seriesDropper.style.display = "none";
            moviesDrop.style.display = "none";
            tvDrop.style.display = "none";
            seriesDrop.style.display = "none";
            hubDropped = false;
            event.preventDefault();
        }
    }

    document.querySelector("#core").onclick = function(){
        let dds = document.querySelectorAll(".hubDrop");
        if (hubDropped){
            moviesDropper.style.display = "none";
            tvDropper.style.display = "none";
            seriesDropper.style.display = "none";
            moviesDrop.style.display = "none";
            tvDrop.style.display = "none";
            seriesDrop.style.display = "none";
            hubDropped = false;
        }
    }

    window.onresize = () => {
        moviesDropper.style.display = "";
        tvDropper.style.display = "";
        seriesDropper.style.display = "";
        moviesDrop.style.display = "";
        tvDrop.style.display = "";
        seriesDrop.style.display = "";
        hubDropped = false;
    }

}

function setDropdownEvent(dropdown, displayType){
    if(hubDropped == false){
        document.querySelector(dropdown).style.display = displayType;
    }
    
}

function moviesTVDropdown(type){
    return `<div id="${type}Drop" class="dropdown">
        <a href="../hubs/live-action-${type}.html" class="navElem ddElem">Live Action</a>
        <a href="../hubs/animated-${type}.html" class="navElem ddElem">Animated</a>
        <a href="../hubs/anime-${type}.html" class="navElem ddElem">Anime</a>
    </div>`;
}

function createFooter(){
    let footer = document.querySelector("#footer");
    footer.innerHTML = `
    <p class="footerItem">Contact me at: <a href="mailto:hrafnagud99@gmail.com">hrafnagud99@gmail.com</a></p>
    <p class="footerItem">Tumblr: <a href="https://www.tumblr.com/raventri-reviews">raventri-reviews</a></p>
    <p class="footerItem">Letterboxd: <a href="https://letterboxd.com/RavenTri/">RavenTri</a></p>`;
}

//search bar and functions
function createSearch(data){
    let nav = document.querySelector("#searchElems");
    let searchBar = `<div id="searchDropper">
        <input name="search" id="search" autocomplete="off" placeholder="Search Reviews"></input>
        <div id="searchDrop" class="dropdown"></div>
    </div>`;
    nav.innerHTML += searchBar;
    document.querySelector("#search").addEventListener("input", function(){searchReviews(data);});
    document.querySelector("#search").addEventListener("focus", function(){searchReviews(data);});
    document.querySelector("#core").addEventListener("click", function(){
        document.querySelector("#searchDrop").innerHTML = "";
        document.querySelector("#searchDrop").style.display = "none";
    });
}

function searchReviews(data){
    let search = document.querySelector("#search").value;
    let dropdown = document.querySelector("#searchDrop");
    if (search == ""){
        dropdown.innerHTML = "";
        dropdown.style.display = "none";
    }
    else{
        search = search.toLowerCase();
        let matches = [];
        for(let i = 0; i < data.length; i++){
            if (data[i].title.toLowerCase().includes(search)){
                matches.push(data[i]);
            }
        }

        dropdown.innerHTML = "";
        dropdown.style.display = "flex";
        if(matches.length > 0){
            matches.sort(searchPriotity(search));
            let sizeLimit = 5;
            if (sizeLimit > matches.length){
                sizeLimit = matches.length;
            }
            for(let i = 0; i < sizeLimit; i++){
                let title = matches[i].title;
                dropdown.innerHTML += `<a href="../reviews/${formatLink(title)}.html" class="navElem ddElem"><img src="../images/${formatLink(title)}.png" alt="${title} thumbnail." class="searchImg">${title}</a>`;
            }
        }
        else{
            dropdown.innerHTML = "No matches found";
        }
        
    }

}

function searchPriotity(search){
    return function sortSearch(objA, objB){
        let titleA = objA.title.toLowerCase();
        let titleB = objB.title.toLowerCase();
        let lenA = titleA.length;
        let lenB = titleB.length;
        let valA = 0;
        let valB = 0;
        let mult = 100;
        //find best
        if(titleA.indexOf(search) > valA){
            valA = titleA.indexOf(search);
            if((titleA.indexOf(` ${search}`))/mult < valA && titleA.indexOf(` ${search}`) > -1){
                valA = (titleA.indexOf(` ${search}`))/mult;
            }
            if((titleA.indexOf(`-${search}`))/mult < valA && titleA.indexOf(`-${search}`) > -1){
                valA = (titleA.indexOf(`-${search}`))/mult;
            }
        }
        if(titleB.indexOf(search) > valB){
            valB = titleB.indexOf(search);
            if((titleB.indexOf(` ${search}`))/mult < valB && titleB.indexOf(` ${search}`) > -1){
                valB = (titleB.indexOf(` ${search}`))/mult;
            }
            if((titleB.indexOf(`-${search}`))/mult < valB && titleB.indexOf(`-${search}`) > -1){
                valB = (titleB.indexOf(`-${search}`))/mult;
            }
        }
        //return
        if(valA > valB){
            return 1;
        }
        else if(valA < valB){
            return -1;
        }
        else{
            return 0;
        }
    }

}

function formatLink(title){
    let link = title.toLowerCase();
    link = link.replaceAll(" ", "-");
    link = link.replaceAll("/", "-");
    let finalLink = "";
    for(let i = 0; i < link.length; i++){
        if(link[i] != "&" && link[i] != ":"){
            finalLink += link[i];
        }
    }
    return finalLink;
}



export {createNav, createFooter, createSearch, formatLink};

//will need to do something for the Chronologies
//IDEA: create separate js files for the separate categories (TV, comics, anime, etc) to make SQL pulling easier
//IDEA contd: and then can import the create functions and populate functions from this file