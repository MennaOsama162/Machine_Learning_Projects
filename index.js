const url = "https://jsonplaceholder.typicode.com/photos";

let xhr = new XMLHttpRequest();

xhr.open('GET', url);
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

let data = [];

xhr.onload = function () {
    if (xhr.status === 200) {
        console.log("done");
        data.push(...JSON.parse(xhr.responseText));
        dataDisplay(data);
    } else {
        console.log("error");
    }
};

xhr.send();


function dataDisplay(data) {

    let container = document.getElementsByClassName("container")[0];

    data.forEach(element => {

        let listItem = document.createElement("li");
        let image = document.createElement("img");
        image.src = element.url;
        image.alt = element.title;
        let title = document.createElement('p');
        title.textContent = element.title;
        let button1 = document.createElement('button')
        button1.textContent = 'Edit'
        button1.addEventListener('click', function () {

            window.location.href = `distination.html`;
            localStorage.setItem("id", element.id);
        });

        let button2 = document.createElement('button')
        button2.textContent = 'delete'
        button2.addEventListener('click', function () {

            if (confirm('Are you sure you want to delete this card?')) {
                deletePhoto(element.id);

                listItem.remove();
            }
        });

        let br = document.createElement('br')

        listItem.appendChild(image);
        listItem.appendChild(title);
        listItem.appendChild(button1);
        listItem.appendChild(button2);
        listItem.appendChild(br);
        listItem.appendChild(br);

        container.appendChild(listItem);
    });
}

function deletePhoto(photoId) {
    let deleteXhr = new XMLHttpRequest();
    deleteXhr.open('DELETE', `https://jsonplaceholder.typicode.com/photos/${photoId}`);

    deleteXhr.onload = function () {
        if (deleteXhr.status === 200) {
            console.log('Photo deleted successfully!');
        } else {
            console.error('Error:', deleteXhr.status, deleteXhr.statusText);
            alert('Failed to delete photo. Please try again.');
        }
    };

    deleteXhr.send();
}
