let i = localStorage.getItem("id");
console.log(i);

let url = "https://jsonplaceholder.typicode.com/photos/" + i;

let xhr = new XMLHttpRequest();

let data;

xhr.open('GET', url);

xhr.onload = function () {
    if (xhr.status === 200) {
        console.log("done");
        data = JSON.parse(xhr.responseText);
        dataDisplay(data);
    } else {
        console.error("Error:", xhr.status, xhr.statusText);
    }
};

xhr.send();

function dataDisplay(data) {
    let container = document.getElementsByClassName('container')[0];
    let image = document.createElement("img");
    image.src = data.url;
    let form = document.createElement('form');

    let titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    form.appendChild(titleLabel);

    let br = document.createElement('br');
    form.appendChild(br);

    let titleInput = document.createElement('input');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('value', data.title);
    form.appendChild(titleInput);

    let br2 = document.createElement('br');
    form.appendChild(br2);

    let idLabel = document.createElement('label');
    idLabel.textContent = 'ID';
    form.appendChild(idLabel);

    let br3 = document.createElement('br');
    form.appendChild(br3);

    let idInput = document.createElement('input');
    idInput.setAttribute('type', 'text');
    idInput.setAttribute('name', 'id');
    idInput.setAttribute('value', data.id);
    form.appendChild(idInput);

    let button1 = document.createElement('button');
    button1.textContent = 'cancel';
    button1.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    let button2 = document.createElement('button');
    button2.textContent = 'save';
    button2.addEventListener('click',function(){
        if(valid(data)){

            edit(data);
        }
    });

    container.appendChild(image);
    container.appendChild(form);
    container.appendChild(button1);
    container.appendChild(button2);
}

function valid(data){
    if(document.forms[0]["title"].value == data.title && document.forms[0]["id"].value == data.id){
        return false;
    }
    else{
        return true;
    }
}

function edit(data) {
    let editedData = {
        title: document.forms[0]["title"].value,
        id: document.forms[0]["id"].value,
    };

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://jsonplaceholder.typicode.com/ photos /' + data.id);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Photo edited successfully!');
        } else {
            console.error('Error:', xhr.status, xhr.statusText);
            alert('Failed to edit photo. Please try again.');
        }
    };

    xhr.send(JSON.stringify(editedData));
}
