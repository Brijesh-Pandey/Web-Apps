let list = document.querySelectorAll("td[data-ns-test]");
let table = document.querySelector("table");
let sum = 0;
list.forEach(el=>{
    sum += Number(el.childNodes[0].nodeValue);
})
let tr = document.createElement("tr");
let td = document.createElement("td");
let text = document.createTextNode("");
td.appendChild(text);
tr.appendChild(td);
table.appendChild(tr);
td.setAttribute("data-ns-test" , "grandTotal");
td.innerHTML=`${sum}`;

