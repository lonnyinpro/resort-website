```javascript
let currentUser = null
let selectedRoom = null

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.add("hidden")
})

document.getElementById(page).classList.remove("hidden")

if(page==="dashboard"){
loadBookings()
}

}

function signup(){

let name = document.getElementById("signupName").value
let email = document.getElementById("signupEmail").value
let password = document.getElementById("signupPassword").value

let users = JSON.parse(localStorage.getItem("users")) || []

users.push({name,email,password})

localStorage.setItem("users",JSON.stringify(users))

document.getElementById("signupMsg").innerText="Account Created!"

}

function login(){

let email=document.getElementById("loginEmail").value
let password=document.getElementById("loginPassword").value

let users=JSON.parse(localStorage.getItem("users"))||[]

let user=users.find(u=>u.email===email && u.password===password)

if(user){

currentUser=user
document.getElementById("loginMsg").innerText="Login Successful"

showPage("dashboard")

}else{

document.getElementById("loginMsg").innerText="Invalid login"

}

}

function selectRoom(name,price){

selectedRoom={name,price}

document.getElementById("selectedRoom").innerText=
"Selected Room: "+name+" ($"+price+")"

showPage("booking")

}

function confirmBooking(){

if(!currentUser){

alert("Please login first")
return

}

let checkin=document.getElementById("checkin").value
let checkout=document.getElementById("checkout").value

let bookings=JSON.parse(localStorage.getItem("bookings"))||[]

bookings.push({

user:currentUser.email,
room:selectedRoom.name,
price:selectedRoom.price,
checkin,
checkout

})

localStorage.setItem("bookings",JSON.stringify(bookings))

alert("Booking Confirmed!")

showPage("dashboard")

}

function loadBookings(){

let bookings=JSON.parse(localStorage.getItem("bookings"))||[]

let container=document.getElementById("bookingList")

container.innerHTML=""

bookings.forEach(b=>{

if(currentUser && b.user===currentUser.email){

let div=document.createElement("div")

div.innerHTML=`
Room: ${b.room} <br>
Check-in: ${b.checkin} <br>
Check-out: ${b.checkout} <hr>
`

container.appendChild(div)

}

})

}
```
