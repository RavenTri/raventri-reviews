import {onload} from "./hub.js"

window.onload = () => {
    onload(sortByOldestReview);
}

//sorts data by date (newest to oldest)
//for array.sort method
function sortByOldestReview(objA, objB){
    let a = Date.parse(objA.date);
    let b = Date.parse(objB.date);
    if (a < b){
        return -1;
    }
    else if (a > b){
        return 1;
    }
    else{
        return 0;
    }
}