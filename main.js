// Firebase config (PASTE YOUR REAL CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyDOKWOP9qn20XJ56m6VDDpbHKjpd7VK8oU",
  authDomain: "gym-management-system-25d7e.firebaseapp.com",
  projectId: "gym-management-system-25d7e",
  storageBucket: "gym-management-system-25d7e.firebasestorage.app",
  messagingSenderId: "166833671528",
  appId: "1:166833671528:web:4d6593b8da7b43afacdadd"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// AUTH FUNCTIONS
function signup() {
  auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  ).then(() => alert("Signup successful"))
   .catch(err => alert(err.message));
}

function login() {
  auth.signInWithEmailAndPassword(
    email.value,
    password.value
  ).catch(err => alert(err.message));
}

function logout() {
  auth.signOut();
}

// AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadMembers();
  } else {
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
  }
});

// FIRESTORE FUNCTIONS
function addMember() {
  db.collection("members").add({
    name: memberName.value,
    age: memberAge.value,
    plan: memberPlan.value,
    fee: memberFee.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(loadMembers);
}

function loadMembers() {
  const table = document.getElementById("membersTable");
  table.innerHTML = "";

  db.collection("members").orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const m = doc.data();
        table.innerHTML += `
          <tr>
            <td>${m.name}</td>
            <td>${m.age}</td>
            <td>${m.plan}</td>
            <td>${m.fee}</td>
          </tr>
        `;
      });
    });
}
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function addMember(name, email, phone) {
  try {
    await addDoc(collection(db, "members"), {
      name: name,
      email: email,
      phone: phone,
      createdAt: new Date()
    });
    alert("Member added successfully!");
  } catch (error) {
    console.error("Error adding member:", error);
  }
}

document.getElementById("memberForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addMember(
    document.getElementById("name").value,
    document.getElementById("email").value,
    document.getElementById("phone").value
  );
});
