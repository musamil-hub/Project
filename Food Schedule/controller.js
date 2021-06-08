// Storing object into array
const recipeStorage = [];
const wrking = {};

///////////////////////////////////////////////////////////
const reset = document.querySelector('.button-reset');
const sun = document.querySelector('#sunday');
const mon = document.querySelector('#monday');
const tues = document.querySelector('#tuesday');
const wed = document.querySelector('#wednesday');
const thur = document.querySelector('#thursday');
const fri = document.querySelector('#friday');
const sat = document.querySelector('#saturday');

reset.addEventListener('click', function(){
    let input=prompt('Do you want to reset data!\n yes\n no');
    if(input==='yes'){
        recipelist(); 
    }
    else{
        alert('Operation is cancelled..!');
    }
});


// fa38e056-a316-4f3e-bcbf-e42849ca5553
const KEY = '36fdfdf1-f677-4d7b-bd27-b89ec34164c0';
sun.addEventListener('click', getRecipeView);
mon.addEventListener('click', getRecipeView);
tues.addEventListener('click', getRecipeView);
wed.addEventListener('click', getRecipeView);
thur.addEventListener('click', getRecipeView);
fri.addEventListener('click', getRecipeView);
sat.addEventListener('click', getRecipeView);

async function recipelist(){
    return await fetch(getRecipeList('pasta',sun))
    .then(await getRecipeList('grape',mon))
    .then(await getRecipeList('seafood',tues))
    .then(await getRecipeList('watermelon',wed))
    .then(await getRecipeList('donuts',thur))
    .then(await getRecipeList('pomegranate',fri))
    .then(await getRecipeList('pizza',sat))
    .then(await ingnt());

}


async function getRecipeList(item, day){
    // console.log("test getrecipe");
    await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${item}&key=${KEY}`)
    .then(response => response.json())
    .then(data => markup(data.data.recipes,day));    
}

/////////////////////////////////////////////////////////////////////////////
// let recipeing;
function markup(datarecipe, day){

    let html="";
    if(datarecipe){
        const length = datarecipe.length;
        for(let i=0;i<3;i++){
            let start = Math.floor((Math.random() * length)); 
            const abc=datarecipe[start];
            const bcd = abc;
                
            let recipe = {
                id: bcd.id,
                title: bcd.title,
                publisher: bcd.publisher,
                sourceUrl: bcd.source_url,
                image: bcd.image_url,
                servings: bcd.servings,
                cookingTime: bcd.cooking_time,
                ingredients: bcd.ingredients
            }

            recipeStorage.push(bcd);
            html += `<div class="recipe-item" data-id="${recipe.id}">
                    <div class="recipe-img">
                        <img src="${recipe.image}" alt="Recipe Image" class="item-img">
                    </div>
                    <div class="recipe-detail">
                        <h3 class="recipe-title">${recipe.title}</h3>
                        <p>${recipe.publisher}</p>
                        <a href="#" class="recipe-btn"></a>
                    </div>
                </div>`;
            }
        }
        day.innerHTML = html; 
}


// ingredients--------------------------------------------
async function ingnt(){
    console.log("Test ingnt");
    console.log(recipeStorage);
    recipeStorage.forEach(wrk => {
        markingred(wrk);
    });

}

async function markingred(wrk){
    await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${wrk.id}?key=${KEY}`)
            .then(response => response.json())
            .then(data => {
                data.data.recipe.ingredients.forEach(wrk => {
                    renderIngrd(wrk);
                });
                console.log(wrking);
            });
}
const ingredient = document.querySelector('#ingredient');
let i=0;
async function renderIngrd(wrk){
    let description = wrking[wrk.description];
    let quantity = 0;
    if(wrking[wrk.description]  == undefined) {
        wrking[wrk.description] = wrk.quantity;
        quantity = wrk.quantity;
        console.log("if");
    } else {
        console.log("else");
        quantity =  wrking[wrk.description] + wrk.quantity;
        wrking[wrk.description] =  quantity;
    }
    i=i++;
    // id="priority' + i + '"
    let htmling = "";
    htmling += `<div class="recipe__ingredients">
    <input type="checkbox" id="${quantity}+${wrk.description}" class="inputing" value="true">
    <div class="labeling">        
    <label class="labling" for="${quantity}+${wrk.description}" >   
    ${wrk.description}<br/>
    <span class="title-ing">${quantity ? quantity : '0'} - ${wrk.unit ? wrk.unit : ''}</span>
    </label>
    </div>
    
    </div>`;
    ingredient.insertAdjacentHTML('beforebegin', htmling);
}

function getRecipeView(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let recipeItem = e.target.parentElement.parentElement;
        console.log(e.target);
            window.scrollTo(0, 0);
        // fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeItem.dataset.id}`)
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeItem.dataset.id}?key=${KEY}`)
        .then(response => response.json())
        .then(data =>recipeModal(data.data.recipe))
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const modal = document.querySelector('.model');
const btnOpenModal=document.querySelector('#show-modal');

function recipeModal(item){
    console.log(item);
    item = item;    
    let html1= `
    <button class="close-modal">❌</button>
    <figure class="modelrecipe-fig">
        <img src="${item.image_url}" alt="Tomato" class="modelrecipe-imgg" />
        <h1 class="modelrecipe-title">
            <span>${item.title}</span><br/>
            <a href="${item.source_url}" target="_blank" class="source">Source</a>
        </h1>
        <div class="modelrecipe__ingredientsm">
          <h2>Recipe ingredients</h2>
          <ul class="modelrecipe-ingredient-list">
          ${item.ingredients.map(ing => {
            return `<li class="modelrecipe__ingredient">
            <div class="modelrecipe__quantity">${ing.quantity ? ing.quantity : ' '}</div>
            <div class="modelrecipe__description">
              <span class="modelrecipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>`
          }).join('')}
        </div>
    </figure>
    `;
    
    modal.innerHTML = html1;

    document.addEventListener('keydown', function (e) {
        console.log(e);
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            recipemodal.parentElement.classList.add('hidden');
            overlay.parentElement.classList.add('hidden');
        }
    });

    const btnCloseModal = document.querySelector('.close-modal');
    const overlay = document.querySelector('.overlay');

        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        btnCloseModal.addEventListener('click', function () {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
          });
          
        overlay.addEventListener('click', function () {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
          });
}

function init() {
    recipelist();
}
init();

/////////////////////////////////////////////////////////////////////////////////////////////