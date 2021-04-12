function doctorDescription(event){
    const targ = event.currentTarget.parentNode.querySelector('.details');
    targ.classList.remove('invisible');
    event.currentTarget.textContent="Meno dettagli";
    event.currentTarget.removeEventListener('click',doctorDescription);
    event.currentTarget.addEventListener('click',hideDoctorDescription);
}

function hideDoctorDescription(event) {
    const targ = event.currentTarget.parentNode.querySelector('.details');
    targ.classList.add('invisible');
    event.currentTarget.textContent="Più dettagli";
    event.currentTarget.removeEventListener('click',hideDoctorDescription);
    event.currentTarget.addEventListener('click',doctorDescription);
}


function showContent(event)
{
    let sezione=event.currentTarget.parentNode.querySelector('.content');
    sezione.classList.remove("invisible");
    event.currentTarget.parentNode.querySelector('h1').classList.remove("invisible");
    event.currentTarget.removeEventListener('click',showContent);
    event.currentTarget.textContent="Mosta meno";
    event.currentTarget.addEventListener('click',hideContent);
    event.currentTarget.parentNode.querySelector('.button2').classList.remove("invisible");
    
    for( const rep of REPARTI_MAP){
        if(rep.reparto === sezione.id){
            const tag= document.createElement('div');
            tag.classList.add('dottore');
            tag.textContent=rep.Nome;
            const imagedott= document.createElement('img');
            imagedott.classList.add('.dottore');
            imagedott.src=rep.image;
            sezione.appendChild(tag);
            tag.appendChild(imagedott);
            const Dettagli=document.createElement('div');
            Dettagli.classList.add('invisible');
            Dettagli.classList.add('details');
            Dettagli.textContent= rep.Specializzazione;
            tag.appendChild(Dettagli);
            const buttonDettagli=document.createElement('div');
            buttonDettagli.classList.add('button');
            buttonDettagli.textContent ='Più dettagli';
            tag.appendChild(buttonDettagli);
            buttonDettagli.addEventListener('click',doctorDescription);
        }
    }
}

function hideContent(event){
    const sezione=event.currentTarget.parentNode.querySelector('.content');
    sezione.classList.add("invisible");
    event.currentTarget.parentNode.querySelector('h1').classList.add("invisible");
    event.currentTarget.parentNode.querySelector('.button2').classList.add("invisible");
    event.currentTarget.textContent="Scopri di più";
    event.currentTarget.addEventListener('click',showContent);
    sezione.innerHTML = '';   
}


function showService(event){
    let sezione=event.currentTarget.parentNode.querySelector('.servizi');
    sezione.classList.remove("invisible");
    event.currentTarget.parentNode.querySelector('.servizi h1').classList.remove("invisible");
    event.currentTarget.removeEventListener('click',showService);
    event.currentTarget.textContent="Non mostare";
    event.currentTarget.addEventListener('click',hideService);
    const button= event.currentTarget.parentNode.querySelector('.descrizione .button');
    button.addEventListener('click',hideService);

    for( const serv of SERVIZI_MAP){
        if(serv.reparto === (sezione.parentNode.querySelector('.content').id)){
            createDivService(sezione,serv);
        }
    }
}

function createDivService(sezione, serv) {
    const tag = document.createElement('div');
    tag.classList.add('servizio');
    const title = document.createElement('h1');
    title.textContent = serv.Nome;
    tag.appendChild(title);
    const imageEsame = document.createElement('img');
    imageEsame.src = serv.image;
    tag.appendChild(imageEsame);
    sezione.appendChild(tag);
    const Dettagli = document.createElement('div');
    Dettagli.textContent = serv.Descrizione;
    tag.appendChild(Dettagli);
    const buttonPreferiti = document.createElement('div');
    buttonPreferiti.classList.add('button');
    buttonPreferiti.textContent = 'Aggiungi ai Preferiti';
    tag.appendChild(buttonPreferiti);
    buttonPreferiti.addEventListener('click', addFavorites);
    return buttonPreferiti;
}

function hideService(event){
    const sezione=event.currentTarget.parentNode.querySelector('.servizi');
    sezione.classList.add("invisible");
    event.currentTarget.parentNode.querySelector('.servizi h1').classList.add("invisible");
    event.currentTarget.textContent="Scopri di più";
    event.currentTarget.addEventListener('click',showService);
    sezione.innerHTML = '';
    const titolo= document.createElement('h1');
    titolo.classList.add('invisible');
    titolo.textContent='I Servizi Di Questo Reparto';
    sezione.appendChild(titolo); 
    const button= event.currentTarget.parentNode.querySelector('.descrizione .button');
    button.removeEventListener('click',hideService);
}

function addFavorites(event){
    const favorites = document.querySelectorAll('.preferiti .servizio');
    console.log(favorites.length);
    if(favorites.length === 0){
        document.querySelector('.preferiti').classList.remove('invisible');
    }
    for( const serv of SERVIZI_MAP){
        if(serv.Nome === (event.currentTarget.parentNode.querySelector('h1').textContent)){
            const bottone=createDivService(document.querySelector('.preferiti'),serv);
            bottone.removeEventListener('click',addFavorites);
            bottone.addEventListener('click',removeFavorites);
            bottone.textContent='Rimuovi dai preferiti';
        }
    }
    event.currentTarget.classList.add('invisible');
}

function removeFavorites(event){
    event.currentTarget.textContent='Aggiungi ai preferiti';
    event.currentTarget.removeEventListener('click',removeFavorites);
    const servizi= document.querySelectorAll('.servizio');
    
    for(const servizio of servizi){
        if(servizio.querySelector('h1').textContent=== event.currentTarget.parentNode.querySelector('h1').textContent){
            servizio.querySelector('.button').classList.remove('invisible');
        }
    }
    event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);
    const favorites = document.querySelectorAll('.preferiti .servizio');
    console.log(favorites.length);
    if(favorites.length === 0){
        document.querySelector('.preferiti').classList.add('invisible');
    }
}

function ricerca(event){
    event.preventDefault();
    const sezione=document.getElementById('risultati');
    const input= document.getElementById('search');
    console.log(input.value);
    sezione.innerHTML='';
    for( const serv of SERVIZI_MAP){
       
        if((serv.Nome.toLowerCase().indexOf(input.value.toLowerCase()))>=0){
            console.log(serv.Nome.toLowerCase());
            createDivService(sezione,serv);
        }
    }
    if(input.value===''){
        sezione.innerHTML='';
    }
}
const search = document.querySelector('#search');
search.addEventListener('keyup',ricerca);
const submit= document.querySelector('#submit');
search.addEventListener('sumbit',ricerca);
let bottoni = document.querySelectorAll('.button');

for (const bottone of bottoni){
    bottone.addEventListener('click', showContent);
}
let bottoni2 = document.querySelectorAll('.button2');

for (const bottone2 of bottoni2){
    bottone2.addEventListener('click', showService);
}


