"use strict";


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

    //for nav

    let hubDropped = false;
    if(window.matchMedia("(max-width:780px)").matches){
        nav.innerHTML = `${logo}
        <div id="hubsDrop"><a href="./index.html" id="hubText" class="navElem">HUBS ↓</a>
        <div id="ddElemsWrapper">
        <div id="ddElems" class="dropdown">
                <a href="../hubs/movies.html" class="navElem ddElem" >Movies ↓</a>${moviesDropdown}
                <a href="../hubs/tv.html" class="navElem ddElem" >TV ↓</a>${tvDropdown}
                <a href="../hubs/series.html" class="navElem ddElem">Series ↓</a>${seriesDropdown}
            </div>
        </div>
        </div>`;

        document.querySelector("#hubText").onclick = function(event){
            let dds = document.querySelectorAll(".dropdown");
            if (!hubDropped){
                
                for(let i = 0; i < dds.length; i+=1){
                    dds[i].style.display = "flex";
                }
                hubDropped = true;
                event.preventDefault();
            }
            else{
                for(let i = 0; i < dds.length; i+=1){
                    dds[i].style.display = "none";
                }
                hubDropped = false;
                event.preventDefault();
            }
        }

        document.querySelector("#core").onclick = function(){
            let dds = document.querySelectorAll(".dropdown");
            if (hubDropped){
                for(let i = 0; i < dds.length; i+=1){
                    dds[i].style.display = "none";
                }
                hubDropped = false;
            }
        }
    }
    else{
        nav.innerHTML = `${logo}
            <div id="navElems">
                <div id="moviesDropper"><a href="../hubs/movies.html" class="navElem" >Movies ↓</a>${moviesDropdown}</div>
                <div id="tvDropper"><a href="../hubs/tv.html" class="navElem" >TV ↓</a>${tvDropdown}</div>
                <div id="seriesDropper"><a href="../hubs/series.html" class="navElem dropper">Series ↓</a>${seriesDropdown}</div>
            </div>`;

        let movies = document.querySelector("#moviesDropper");
        let tv = document.querySelector("#tvDropper");
        let series = document.querySelector("#seriesDropper");

        movies.onmouseover = function(){
            document.querySelector("#moviesDrop").style.display = "flex";
        }
        movies.onmouseout = function(){
            document.querySelector("#moviesDrop").style.display = "none";
        }

        tv.onmouseover = function(){
            document.querySelector("#tvDrop").style.display = "flex";
        }
        tv.onmouseout = function(){
            document.querySelector("#tvDrop").style.display = "none";
        }

        series.onmouseover = function(){
            document.querySelector("#seriesDrop").style.display = "flex";
        }
        series.onmouseout = function(){
            document.querySelector("#seriesDrop").style.display = "none";
        }
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

export {createNav, createFooter, formatLink};

//will need to do something for the Chronologies
//IDEA: create separate js files for the separate categories (TV, comics, anime, etc) to make SQL pulling easier
//IDEA contd: and then can import the create functions and populate functions from this file