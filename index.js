const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

let myLeads = [];

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabUrl = tabs[0].url;
    if (isValidUrl(tabUrl)) {
      myLeads.push(tabUrl);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    } else {
      alert("Invalid URL");
    }
  });
});

function render(leads) {
  let listItems = "";
  for (i = 0; i < leads.length; i++) {
    listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  const inputValue = inputEl.value.trim();
  if (isValidUrl(inputValue)) {
    myLeads.push(inputValue);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  } else {
    myLeads.push("https://" + inputValue);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
