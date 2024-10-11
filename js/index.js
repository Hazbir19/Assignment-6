function btnfunc(id) {
  //alert(id);

  let cata3 = async () => {
    try {
      let catagor3 = await fetch(
        `https://openapi.programming-hero.com/api/peddy/category/${id}`
      );
      let fed = await catagor3.json();
      console.log(Array.isArray(fed.data));
    } catch (error) {
      console.log("error", error);
    }
  };
  cata3();
}
let cata = async () => {
  let catagor = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  let res = await catagor.json();
  catagotroy(res);
};
cata();

let catagotroy = (data) => {
  //console.log(data);
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
catagotroy();
const loadCatagory = async () => {
  let result = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  let data = await result.json();
  displayCard(data);
};
const displayCard = (data) => {
  data.pets.forEach((pet) => {
    let cardContrainer = document.getElementById("cards");
    const petCard = document.createElement("div");
    petCard.classList = " petCard p-5 rounded-xl border my-5 ";
    petCard.innerHTML = `<img src="${pet.image}" class=" w-[25rem] rounded-xl"/>
<div class="">
  <h1 class="text-2xl font-bold my-4">'${pet.pet_name}'</h1>
  <p> Breed: '${pet.breed}'</p>
  <p> Birth: '${pet.date_of_birth}'</p>
  <p><i class="fa-solid fa-venus-mars"></i> '${pet.gender}'</p>
  <p> Price: '$ ${pet.price}'</p>
  <hr class="border-gray-200 my-2"/>
</div>
<div class="flex gap-5 justify-around">
  <div class="p-5 border border-[#0E7A8126] my-5 rounded-lg cursor-pointer" onclick="likeBtn()">
  <i class="fa-regular fa-thumbs-up"></i>
  </div>
  <div class="p-5 border border-[#0E7A8126] my-5 rounded-lg cursor-pointer text-[#0E7A81] font-bold">
  Adopt
  </div>
  <div class="p-5 border border-[#0E7A8126] my-5 rounded-lg cursor-pointer text-[#0E7A81] font-bold" onclick="detailBtn()" >
  Details
  </div>
</div>`;
    cardContrainer.append(petCard);
  });
};

loadCatagory();

// {
//   "petId": 1,
//   "breed": "Golden Retriever",
//   "category": "Dog",
//   "date_of_birth": "2023-01-15",
//   "price": 1200,
//   "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   "gender": "Male",
//   "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   "vaccinated_status": "Fully",
//   "pet_name": "Sunny"
// },
const loadCatagory2 = async () => {
  let result = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  let data = await result.json();
  //console.log(data);
  likeBtn(data);
};
const likeBtn = (data) => {
  const imagecontrainer = document.getElementById("imagecontrainer");
  const imageDiv = document.createElement("img");
  data.pet.forEach((pet) => {
    console.log(pet);
  });
  imageDiv.src = data.pet.image;
  imagecontrainer.appendChild(imageDiv);
};
loadCatagory2();
likeBtn();
