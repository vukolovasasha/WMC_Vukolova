import persons from "./persons.json" with { type: "json" };

function renderPersons() {
    // persons in den tbody hineinrendern

    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    for (const person of persons) {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = person.id;
        tr.appendChild(tdId);
        const tdName = document.createElement("td");
        tdName.textContent = person.name;
        tr.appendChild(tdName);
        const tdAge = document.createElement("td");
        tdAge.textContent = person.alter;
        tr.appendChild(tdAge);
        const tdHeight = document.createElement("td");
        tdHeight.textContent = person.groesse;
        tr.appendChild(tdHeight);
        const tdBirthDate = document.createElement("td");
        tdBirthDate.textContent = person.geburtsdatum;
        tr.appendChild(tdBirthDate);
        const tdOrigin = document.createElement("td");
        tdOrigin.textContent = person.herkunft;
        tr.appendChild(tdOrigin);
        const tdWeight = document.createElement("td");
        tdWeight.textContent = person.gewicht;
        tr.appendChild(tdWeight);

        tbody.appendChild(tr);
    }
}
let currentSort = {
    field: null,
    direction: "asc"
};
// phase2
function sortBy(field, type = "number") {
    if (currentSort.field === field) {
        if (currentSort.direction === "asc") {
            currentSort.direction = "desc";
        } else {
            currentSort.direction = "asc";
        }
    } else {
        currentSort.field = field;
        currentSort.direction = "asc";
    }

    persons.sort((a, b) => {
        let result;

        if (type === "number") {
            result = a[field] - b[field];
        } else {
            result = a[field].localeCompare(b[field]);
        }

        if (currentSort.direction === "asc") {
            return result;
        } else {
            return -result;
        }
    });

    renderPersons();
}
// simple oneway sort by phase1
/*function sortBy(field, type = "number") {
    persons.sort((a, b) => {
        if (type === "number") {
            return a[field] - b[field];
        } else {
            return a[field].localeCompare(b[field]);
        }
    });

    renderPersons();
} */
document.getElementById("thid").addEventListener("click", () => sortBy("id"));
document.getElementById("thname").addEventListener("click", () => sortBy("name", "string"));
document.getElementById("thage").addEventListener("click", () => sortBy("alter"));
document.getElementById("thsize").addEventListener("click", () => sortBy("groesse"));
document.getElementById("thbirth").addEventListener("click", () => sortBy("geburtsdatum", "string"));
document.getElementById("thorigin").addEventListener("click", () => sortBy("herkunft", "string"));
document.getElementById("thweight").addEventListener("click", () => sortBy("gewicht"));

/*const thage = document.getElementById("thage");
thage.addEventListener("click", () => {
    console.log("thage was clicked");
    persons.sort((a, b) => {
        return a.alter - b.alter;
    });
    renderPersons();
}); */

// renderPersons();
window.renderPersons = renderPersons;
renderPersons(); 

