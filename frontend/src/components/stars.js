import React from 'react';
import '../App.css'

let type = 0;
let starAmount = 1;

function setStar(num){
    
    if(type > 1){
        type = 0;
        starAmount = num;
    }

    let tmp;
    if(type == 0){
        starAmount = num;
        switch(num) {
            case 1:
            tmp = document.getElementById('one');
            tmp.innerHTML = "&#9733;"
            break;
            case 2:
            tmp = document.getElementById('one');
            tmp.innerHTML = "&#9733;"
            tmp = document.getElementById('two');
            tmp.innerHTML = "&#9733;"
            break;
            case 3:
                tmp = document.getElementById('one');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('two');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('three');
                tmp.innerHTML = "&#9733;"
                break;
            case 4:
                tmp = document.getElementById('one');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('two');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('three');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('four');
                tmp.innerHTML = "&#9733;"
            break;
            case 5:
                tmp = document.getElementById('one');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('two');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('three');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('four');
                tmp.innerHTML = "&#9733;"
                tmp = document.getElementById('five');
                tmp.innerHTML = "&#9733;"
            break;
            default:
            // code block
        }
    }
    else{
        tmp = document.getElementById('one');
        tmp.innerHTML = "&#9734;"
        tmp = document.getElementById('two');
        tmp.innerHTML = "&#9734;"
        tmp = document.getElementById('three');
        tmp.innerHTML = "&#9734;"
        tmp = document.getElementById('four');
        tmp.innerHTML = "&#9734;"
        tmp = document.getElementById('five');
        tmp.innerHTML = "&#9734;"
    }

      type++;

}

function submitMessage(){
    let character = document.getElementById('displayCharacter');
    let peng = document.getElementById('peng');
   
    switch(starAmount) {
        case 1:
            character.innerHTML = "His day is ruined";
            peng.src = "/assets/sadpeng.gif";
        break;
        case 2:
            character.innerHTML = "He no longer has the confidence to full send his kickflip";
            peng.src = "/assets/skatepeng.gif";
        break;
        case 3:
            character.innerHTML = "";
            peng.src = "";
        break;
        case 4:
            character.innerHTML = "";
            peng.src = "";
        break;
        case 5:
            character.innerHTML = "Thank you!";
            peng.src = "/assets/cartpeng.gif";
        break;
        default:
        
    }

}

function stars(){
    // Filled in stars, change with css
   // <h1>&#9733;&#9733;&#9733;&#9733;&#9733;</h1>

   
    return(
        <div className ="center">
        <br /><br />
        <h1>Rate Us</h1>
        <h3> You are more than just a number to us!</h3>

        <div >
            <h1 id="one" className="star" onClick={() => setStar(1)}>&#9734;</h1>
            <h1 id="two" className="star" onClick={() => setStar(2)}>&#9734;</h1>
            <h1 id="three" className="star" onClick={() => setStar(3)}>&#9734;</h1>
            <h1 id="four"className="star" onClick={() => setStar(4)}>&#9734;</h1>
            <h1 id="five" className="star" onClick={() => setStar(5)}>&#9734;</h1>
        </div>

        <div><h1 className = 'submit-button' onClick={() => submitMessage()} >Submit</h1></div>

        <div  className="rateMessage" id="displayCharacter"> </div>
        <img className="imageSize" id ="peng" src="" />

        </div>

        
    )
}
export default stars;