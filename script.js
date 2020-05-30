const button = document.getElementsByTagName('button')[0];
let activeBlock = document.getElementsByClassName('active-block')[0];

button.addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = activeBlock.getElementsByTagName('input');
    inputs.forEach = [].forEach;
    let isError = false;

    inputs.forEach((input) => {
        if (!input.value) {
            input.parentElement.classList.add('red');
            isError = true;
        } else {
            input.parentElement.classList.remove('red');
        }
    });

    if (!isError) {
        activeBlock.classList.remove('active-block');
        activeBlock.nextElementSibling.classList.add('active-block');
        activeBlock = activeBlock.nextElementsSibling;
    }
});


const box = document.getElementsByClassName('results')[0];
const inputFilter = document.getElementsByClassName('filter')[0];
const namesList = [];



for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');

    div.innerText = faker.name.findName();
    div.style.background = '#F6F6F6';
    // div.classList.add('hidden');
    namesList.push(div);
}

box.append(...namesList);

inputFilter.addEventListener('input', (event) => {
    for (let i = 0; i < namesList.length; i++) {
        if (inputFilter.value === '') {
            namesList[i].style.display = 'block';
        } else {
            if (inputFilter.value && namesList[i].innerText.toLowerCase().startsWith(inputFilter.value.toLowerCase())) {
                namesList[i].style.display = 'block';
            } else {
                namesList[i].style.display = 'none';
            }
        }
    }
})