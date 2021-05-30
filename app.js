

document.querySelector('#startBTN').addEventListener('click' , (e)=>{

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let container = document.querySelector('.container')
    let p = document.createElement('p')

    let span = document.createElement('span')

    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR'
    recognition.interimResults = true;

    recognition.start();

    recognition.addEventListener('end' , ()=>{

        recognition.start();

    })

    recognition.addEventListener('result' , (e)=>{

        container.appendChild(p);



        let text = Array.from(e.results).map((result)=>{

            return result[0];

        }).map((result)=>{

            return result.transcript

        })

        .join(' ');

        if(text.includes('علامت سوال')){

            text = text.replace('علامت سوال' , '؟');

        }

        if(text.includes('برو خط بعدی') && e.results[0].isFinal){

            text = ''
            p = document.createElement('p')

            container.appendChild(p);

        }


        span.textContent = " " + text;

        p.appendChild(span);

        if(e.results[0].isFinal == true){

            span = document.createElement('span');

            p.appendChild(span);

        }

        if(text.includes('صفحه پاک شود') && e.results[0].isFinal ){

            container.innerHTML = '';
            p.innerHTML = '';

        }

        if(text.includes('انگلیسی تایپ کن') && e.results[0].isFinal){

            recognition.stop();
            recognition.lang = 'en-US';

            text = ' ';
            p = document.createElement('p');

            p.setAttribute('dir' , 'ltr')

            container.appendChild(p);

        }

        if(text.includes('type in Persian') && e.results[0].isFinal){

            recognition.stop();
            recognition.lang = 'fa-IR';

            text = '';
            p = document.createElement('p');

            p.setAttribute('dir' , 'rtl')

            container.appendChild(p);

        }
        
        console.log(text)

    })

    document.querySelector('#stopBTN').addEventListener('click' , (e)=>{

        recognition.stop();
    
    })



})

