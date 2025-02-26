function btnfunc(id) {
  let cata3 = async (id) => {
    try {
      let catagor3 = await fetch(
        `https://openapi.programming-hero.com/api/peddy/category/${id}`
      );
      let fed = await catagor3.json();
      let pets = fed.data;
      document.getElementById("cards").innerHTML = "";
      if (pets && pets.length > 0) {
        displayCategoryCards(pets);
        currentPets = pets;
      } else {
        document.getElementById("cards").innerHTML =
          "<p>No pets found in this category.</p>";
        currentPets = [];
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  cata3(id);
  activeCategoryId = id;
}

let activeCategoryId = null;
let currentPets = [];

let cata = async () => {
  let catagor = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  let res = await catagor.json();
  catagotroy(res);
};
cata();

let catagotroy = (data) => {
  data?.categories?.forEach((element) => {
    const cata_contrainer = document.getElementById("cata-btn");
    const cata_btn = document.createElement("div");
    cata_btn.classList = "btn m-5 border border-gray-400 cataBtn";

    cata_btn.innerHTML = `<div onclick = btnfunc('${element.category}') class="flex items-center cursor-pointer">
      <div class="mx-2"><img class="w-8 butn" src ="${element.category_icon} " /></div>
      <div class="mx-2">${element.category}</div></div>`;
    cata_contrainer.append(cata_btn);
  });
};

const loadCatagory = async () => {
  let result = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  let data = await result.json();
  displayCard(data);
  currentPets = data.pets;
};

const displayCard = (data) => {
  displayCategoryCards(data.pets);
};

function displayCategoryCards(pets) {
  let cardContrainer = document.getElementById("cards");
  cardContrainer.innerHTML = "";
  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.classList = " petCard p-5 rounded-xl border my-5 ";
    petCard.innerHTML = `<img src="${pet.image}" class=" w-[25rem] rounded-xl"/>
  <div class="">
      <h1 class="text-2xl font-bold my-4">'${pet.pet_name}'</h1>
      <p> Breed: '${pet.breed || "Breed not available"}'</p>
      <p> Birth: '${pet.date_of_birth || "Birth date not available"}'</p>
      <p><i class="fa-solid fa-venus-mars"></i> '${
        pet.gender || "Gender not available"
      }'</p>
      <p> Price: '$ ${pet.price || "Price not available"}'</p>
      <hr class="border-gray-200 my-2"/>
  </div>
  <div class="flex gap-5 justify-around">
      <div class="p-5 border border-[#0E7A8126] my-5 rounded-lg cursor-pointer" onclick="likeBtn('${
        pet.image
      }')">
      <i class="fa-regular fa-thumbs-up"></i>
      </div>
      <div class="p-5 border border-[#0E7A8126] my-5 rounded-lg cursor-pointer text-[#0E7A81] font-bold" onclick="adoptBtn(this)">
      Adopt
      </div>
      <div class="p-5 border border-[#0E7A8126] my-5 rounded-lg cursor-pointer text-[#0E7A81] font-bold" onclick="detailBtn('${
        pet.petId
      }')" >
      Details
      </div>
  </div>`;
    cardContrainer.append(petCard);
  });
}

loadCatagory();

function likeBtn(imageUrl) {
  const imageContrainer = document.getElementById("imagecontrainer");
  const imageDiv = document.createElement("img");
  imageDiv.src = imageUrl;
  imageDiv.classList.add("w-20", "h-20", "m-2");
  imageContrainer.appendChild(imageDiv);
}

async function detailBtn(petId) {
  let result = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  let pet = await result.json();

  document.getElementById("modal-pet-name").textContent = pet.petData.pet_name;
  document.getElementById("modal-details").innerHTML = `
          <img src="${pet.petData.image}" class="w-full mb-4">
          <p>Breed: ${pet.petData.breed || "Not Available"}</p>
          <p>Birth: ${pet.petData.date_of_birth || "Not Available"}</p>
          <p>Gender: ${pet.petData.gender || "Not Available"}</p>
          <p>Price: $${pet.petData.price || "Not Available"}</p>
          <p>Details: ${pet.petData.pet_details || "Not Available"}</p>
      `;

  document.getElementById("pet-details-modal").classList.remove("hidden");
}

// Attach event listener after modal is made visible
document.getElementById("closeModel").addEventListener("click", function () {
  console.log("hit");
  document.getElementById("pet-details-modal").classList.add("hidden");
});

document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });

document
  .getElementById("view-more-button")
  .addEventListener("click", function () {
    document.getElementById("cata-btn").scrollIntoView({ behavior: "smooth" });
  });

function adoptBtn(button) {
  let countdown = 3;
  const interval = setInterval(() => {
    button.textContent = countdown;
    countdown--;
    if (countdown < 0) {
      clearInterval(interval);
      button.textContent = "Adopted";
    }
  }, 1000);
}

document.body.innerHTML += `
<div id="pet-details-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 justify-center items-center">
  <div class="bg-white p-8 rounded-lg w-1/2">
      <h2 id="modal-pet-name" class="text-2xl font-bold mb-4"></h2>
      <div id="modal-details"></div>
s  </div>
</div>`;

document.getElementById("Sortbutton").addEventListener("click", () => {
  let sortedPets = [...currentPets];
  sortedPets.sort((a, b) => b.price - a.price);
  displayCategoryCards(sortedPets);
});
