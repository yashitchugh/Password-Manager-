function maskPassword(pass){
  let str="" 
  for (let index = 0; index < pass.length; index++) {
   
    str+="*"
  }
  return str
}

function copyText(txt){
  navigator.clipboard.writeText(txt).then(
    ()=>{ 
      // alert("Copied the text: " + txt);
      document.querySelector(".alert").classList.remove("alert")
    },
    () => {
      alert("failed to copy")
    }
    )
  }
  


// Logic to fill the table
const deletePassword = (website)=>{
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e)=>{
    return e.website != website
  })
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`Successfully deleted ${website} password`)
  showPasswords()

}

const showPasswords = ()=>{
let tb = document.querySelector("table");
let data = localStorage.getItem("passwords");
if (data == null) {
  tb.innerHTML = "No Data To Store"
  
} else {
  tb.innerHTML = ` <tr>
              <th> Website</th>
              <th> Username</th>
              <th>Password</th>
              <th>Delete</th>
            </tr>`
  let arr = JSON.parse(data);
  let str = ""
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    str += `<tr>
    <td>${element.website}<img onclick="copyText('${element.website}')" src="./copy.svg" alt="copy icon" width="50" height="50" /></td>
    <td>${element.username}<img  onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Icon"  width="50" height="50" /></td>
    <td>${maskPassword(element.password)}<img  onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Icon"  width="50" height="50" /></td>
    <td><button  class="btnsm" onClick="deletePassword('${element.website}')">Delete</button></td>
  </tr>`
  }
  tb.innerHTML = tb.innerHTML + str;
}

website.value = ""
username.value = ""
password.value = ""

}

console.log("working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked...");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({ website: website.value, username: username.value, password: password.value });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({ website:website.value, username:username.value, password:password.value });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords()
});
