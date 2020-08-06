
document
.querySelector("#add-time")
.addEventListener('click', cloneField);


function cloneField() {
    
    const newScheduleItem = document
    .querySelector(".schedule-item")
    .cloneNode(true);

    const fields = newScheduleItem.querySelectorAll('input');
    
    fields.forEach((element) => {element.value = ""})

    document.querySelector("#schedule-itens").appendChild(newScheduleItem);
    
}