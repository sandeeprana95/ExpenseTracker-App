const wish = document.getElementById("wish");
const rupees = document.getElementById("rupees");
const btn = document.getElementById('btn');
const showList = document.getElementById("show-list");
const total = document.getElementById("total");
const Budget_Btn = document.getElementById("Budget_Btn");
const Budget = document.getElementById("Budget")
var TaskArr = [];
let count = 0;

setTimeout(LoadArr(), 1000)

Budget_Btn.addEventListener("click", () => {
    localStorage.setItem("Budget", JSON.stringify(Budget.value))
})

btn.addEventListener("click", HandleTask)

function HandleTask() {
    count += Number(rupees.value)
    console.log(count);
    if (wish.value && rupees.value) {
        if (localStorage.getItem("Data") && count <= Number(fetchBudget())) {
            console.log("I am one");
            const ParsedArr = JSON.parse(localStorage.getItem("Data"))
            ParsedArr.push({ wish: wish.value, rupees: rupees.value })
            localStorage.setItem("Data", JSON.stringify(ParsedArr))
            wish.value = ''
            rupees.value = ''
            LoadArr()
        }
        else if (Number(rupees.value) > Number(fetchBudget())) {
            console.log("I am two");
            alert("Your expense is greater than budget!")
            return;
        }

        else {
            console.log("I am three");
            if (Number(rupees.value) <= Number(fetchBudget()) && count <= Number(fetchBudget())) {
                TaskArr.push({ wish: wish.value, rupees: rupees.value })
                localStorage.setItem("Data", JSON.stringify(TaskArr))
            }

        }
        // count += Number(rupees.value);
    }

}
function fetchBudget() {

    return JSON.parse(localStorage.getItem("Budget"))
}
function LoadArr() {

    count = 0;
    if (localStorage.getItem("Data")) {
        const ParsedArr = JSON.parse(localStorage.getItem("Data"));
        showList.innerHTML = ""
        total.innerHTML = ""
        ParsedArr.map((elem) => {
            showList.innerHTML += `<div id="show-input">
            <p id='wish-value'>${elem.wish}</p> <p id='rupees-value'>${elem.rupees}</p> <i class="fa-solid fa-trash" id='input-icon' onclick="Delete('${elem.wish}')"></i>
            </div>
            ${count += Number(elem.rupees)}
           `
        })
        total.innerHTML = count
    }


}

function Delete(data) {
    const ParsedArr = JSON.parse(localStorage.getItem("Data"))
    const FilterArr = ParsedArr.filter((elem) => {
        return elem.wish !== data;
    })
    localStorage.setItem("Data", JSON.stringify(FilterArr))
    LoadArr()
}




btn.addEventListener('click', HandleTask);