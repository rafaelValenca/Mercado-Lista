// ****** SELECT ITEMS **********

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option

let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

//submit form

form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener("click", clearItems);

// ****** FUNCTIONS **********

function addItem(e){

    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if(value && !editFlag){
        const elemnet = document.createElement('article');
        //add class
        elemnet.classList.add('grocery-item');
        //add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        elemnet.setAttributeNode(attr);
        elemnet.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
            </div>
        `;

        const deleteBtn = elemnet.querySelector('.delete-btn');
        const editBtn = elemnet.querySelector('.edit-btn')

        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        //append chield
        list.appendChild(elemnet);
        //display alert
        displayAlert(`${value} adicionado na lista`, 'success');
        //show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        //setBackToDefault
        setBackToDefault(id, value);
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('valor mudado', 'success');
        // edit local sotage
        editLocalSorage(editID,  value);
        setBackToDefault();
    }
    else {
        displayAlert('adicione um item', 'danger')
    } 
}

//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000)
}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0 ){
        items.forEach((item) => {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert('lista vazia', 'danger');
    setBackToDefault();

}

//edit  function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item, get p element
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set from value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Editar";
}

//delete  efunction
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0)
        container.classList.remove("show-container");
    displayAlert(`item removido`, 'danger')
    setBackToDefault();
    //remove from local storage
    // removeFromlocalStorage(id);
}

// set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Salvar";
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value){

}

function removeFromlocalStorage(id) {}

// ****** SETUP ITEMS **********

function editLocalSorage(id, value) {

}