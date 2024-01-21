var nameInput = document.getElementById('bookmark_name');
var urlInput = document.getElementById('bookmark_url');
var siteList = [];

if (localStorage.getItem('Sites')) {
   siteList = JSON.parse(localStorage.getItem('Sites'));
   showSites();
}

function main() {
   addSite();
   showSites();
   clearInput();
}

function addSite() {
   if (checkURL() && checkName()) {
      nameInput.value = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1);
      var site = {
         name: nameInput.value,
         url: urlInput.value
      };
      siteList.push(site);
      localStorage.setItem('Sites', JSON.stringify(siteList));
   } else {
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
   }
}

function showSites() {
   var items = ``;
   for (var i = 0; i < siteList.length; ++i) {
      items += `
         <tr>
            <td>${i + 1}</td>
            <td>${siteList[i].name}</td>
            <td>
               <a id="visit_btn" class="btn btn_visit" href="${siteList[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a>
            </td>
            <td>
               <button id="delete_btn" class="btn btn_delete" onclick="deleteSite(${i})"><i class="fa-regular fa-trash-can"></i> Delete</button>
            </td>
         </tr>
      `;
   }
   document.getElementById('sitesTable').innerHTML = items;
}

function clearInput() {
   if (checkName() && checkURL()) {
      nameInput.value = "";
      urlInput.value = "";
      nameInput.classList.remove("is-valid");
      urlInput.classList.remove("is-valid");
   }
}

function deleteSite(index) {
   siteList.splice(index, 1);
   localStorage.setItem('Sites', JSON.stringify(siteList));
   showSites();
}

function checkName() {
   var regex = /^(?!undefined$)[a-zA-Z0-9]{3,}$/;
   var test = regex.test(nameInput.value);
   if (nameInput.value == "") {
      nameInput.classList.remove("is-invalid");
      nameInput.classList.remove("is-valid");
      return false;
   }
   else if (test) {
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
      return test;
   } else {
      nameInput.classList.remove("is-valid");
      nameInput.classList.add("is-invalid");
      return test;
   }
}

function checkURL() {
   var regex = /^https:\/\/(www\.)?[a-zA-Z0-9]{1,}\.[a-z]{2,}$/;
   var test = regex.test(urlInput.value);
   if (urlInput.value == "") {
      urlInput.classList.remove("is-invalid");
      urlInput.classList.remove("is-valid");
      return false;
   }
   else if (test) {
      urlInput.classList.add("is-valid");
      urlInput.classList.remove("is-invalid");
      return test;
   } else {
      urlInput.classList.remove("is-valid");
      urlInput.classList.add("is-invalid");
      return test;
   }
}

