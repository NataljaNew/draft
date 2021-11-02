window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // timer
    let deadline = '2021-11-05';
    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));
        // hours = Math.floor((t/1000/60/60)%24),
        // days = Math.floor((t/(1000+60+60+24)));
        return{
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getTimeRemaining(endtime);
            if(t.total <= 0){
                clearInterval(timeInterval);
                hours.textContent = '00'
                minutes.textContent = '00';
                seconds.textContent = '00';
            }else {
                if(t.hours <10){
                    hours.textContent = '0' + t.hours;
                } else{
                    hours.textContent = t.hours;
                }
                if(t.minutes <10){
                    minutes.textContent = '0' + t.minutes;
                } else{
                    minutes.textContent = t.minutes;
                }
                if(t.seconds <10){
                    seconds.textContent = '0' + t.seconds; 
                }else{
                    seconds.textContent = t.seconds; 
                }
            } 
        }
    }

    setClock('timer', deadline);

    // modal window
    let trigger = document.getElementsByClassName('register')[0],
    modal = document.querySelector('.popup_modal'),
    close = document.querySelector('.popup_close');

    function bindModal(trigger, modal, close){
        trigger.addEventListener('click', function(e){
            if(e.target){
                e.preventDefault();
            }
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        });

        modal.addEventListener('click', (e)=>{
            if(e.target === modal){
                modal.style.display = "none";
                document.body.style.overflow = "";
            }
        });
    }
   
bindModal(trigger,modal,close);

//reklama
// function showAdv(selector, time){
//     setTimeout(function(){
//         document.querySelector(selector).style.display = "block";
//         document.body.style.overflow = "hidden";
//     },time)

//     }

// showAdv('.adv', 3000);

    // addElement

const addElement = (trigger, wrapperSelector) => {
    let btn = document.querySelector(trigger);

    const getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };


    btn.addEventListener('click', ()=>{
        getResource('https://fakestoreapi.com/products')
            .then(res => createCards(res))
            .catch(error => console.log(error));
    });

    function createCards(response) {
        response.forEach((item) => {
            let card = document.createElement('div');

            card.classList.add('col-lg-3', 'm-2');
        
            card.innerHTML = `
            <div class="card">
            <img src=${item.image} class="card-img-top mx-auto" alt="item-img">
            <div class="card-body">
            <h4>${item.title}</h4>
            <p class="card-text text-ellipsis text-center text-danger fw-bold">Price now: ${item.price} $</p>
          </div>
          </div>
            `;

            document.getElementById(wrapperSelector).appendChild(card);
        });
    }
}
addElement('.showAll', 'wrapper');

//filter
    
    let allCards = document.querySelectorAll(".col-lg-3"),
        btn_products = document.querySelector(".document.querySelector"),
        men = document.querySelectorAll(".men"),
        women = document.querySelectorAll(".women"),
        jewelery = document.querySelectorAll(".jewelery"),
        electronics = document.querySelectorAll(".electronics"),
        input_men = document.getElementsByClassName("input_men")[0],
        input_women = document.getElementsByClassName("input_women")[0],
        input_jewelery = document.getElementsByClassName("input_jewelery")[0],
        input_electronics = document.getElementsByClassName("input_electronics")[0];

        input_men.addEventListener('click', function(){
            makeAllVisible();
            makeUnvisible(jewelery);
            makeUnvisible(electronics);
            makeUnvisible(women);
            input_men.classList.add('bg-info');
            input_women.classList.remove('bg-info');
            input_jewelery.classList.remove('bg-info');
            input_electronics.classList.remove('bg-info');
            input_products.classList.remove('bg-info');
        });
        input_women.addEventListener('click', function(){
            makeAllVisible();
            makeUnvisible(jewelery);
            makeUnvisible(men);
            makeUnvisible(electronics);
            input_men.classList.remove('bg-info');
            input_women.classList.add('bg-info');
            input_jewelery.classList.remove('bg-info');
            input_electronics.classList.remove('bg-info');
            input_products.classList.remove('bg-info');
        });
        input_jewelery.addEventListener('click', function(){
            makeAllVisible();
            makeUnvisible(women);
            makeUnvisible(men);
            makeUnvisible(electronics);
            input_men.classList.remove('bg-info');
            input_women.classList.remove('bg-info');
            input_jewelery.classList.add('bg-info');
            input_electronics.classList.remove('bg-info');
            input_products.classList.remove('bg-info');
        });
        input_electronics.addEventListener('click', function(){
            makeAllVisible();
            makeUnvisible(women);
            makeUnvisible(men);
            makeUnvisible(jewelery);
            input_men.classList.remove('bg-info');
            input_women.classList.remove('bg-info');
            input_jewelery.classList.remove('bg-info');
            input_electronics.classList.add('bg-info');
            input_products.classList.remove('bg-info');
        });

        input_products.addEventListener('click', function(){
            makeAllVisible();
            input_men.classList.remove('bg-info');
            input_women.classList.remove('bg-info');
            input_jewelery.classList.remove('bg-info');
            input_electronics.classList.remove('bg-info');
            input_products.classList.add('bg-info');
        });


        function makeUnvisible(item){
            item.forEach((element) => {
                element.classList.add("visually-hidden");
            });
        }
        
        function makeAllVisible(){
            allCards.forEach((item) => {
                item.classList.remove("visually-hidden");
            });
        }
});