window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // timer
let deadline = '2021-10-27';

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
        };
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

    // search
    let res = '';
    const getResource = async(url) =>{
        res = await fetch (url);
        if(!res.ok){
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }
    return await res.json();
    };

    const btn = document.getElementById('basic-addon2');

    btn.addEventListener('click', ()=>{
        getResource('https://fakestoreapi.com/products')
        // .then(res => console.log(res))
        .then(createCards(res))
        .catch(error => console.log('error'));
    });

    function createCards(response) {
        response.forEach(element => console.log(element.id));
        
        // response.forEach(({image, title, price}) => {
        //     let card = document.createElement('div');

        //     card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        
        //     card.innerHTML = `
        //         <div class="styles-block">
        //             <img src=${image} alt="style">
        //             <h4>${title}</h4>
        //             <a href="#">${price}</a>
        //         </div>
        //     `;
        //     document.getElementById(wrapper).appendChild(card);
        // });
    };
});