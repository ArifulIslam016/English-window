//All levels brins here
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const spinbar = (situation) => {
  // const spinElemnet=
  if (situation == true) {
    document.getElementById("spining").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spining").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadWordDetails = async (id) => {
  const urlOfWordDetails = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(urlOfWordDetails);
  const data = await response.json();
  displayWordDetails(data.data);
};

const synonames = (sNames) => {
  const sName = sNames.map((x) => `<span class="btn">${x}</span>`);
  // console.log(sName.join(""));
  return sName.join(" ");
};
// id: 5;
// level: 1;
// meaning: "আগ্রহী";
// partsOfSpeech: "adjective";
// points: 1;
// pronunciation: "ইগার";
// sentence: "The kids were eager to open their gifts.";
// synonyms: (3)[("enthusiastic", "excited", "keen")];
// word: "Eager";
const displayWordDetails = (datas) => {
  const wordMOdalContainer = document.getElementById("my_modal_5");

  wordMOdalContainer.innerHTML = ` 
    
<div class="modal-box space-y-3">
    <div class="">
        <h1 class="font-semibold text-3xl">(  <i class="fa-solid fa-microphone-lines"></i>   :${
          datas.pronunciation
        })</h1>
    </div>
    <div>
        <h1 class="font-semibold text-2xl">Meaning</h1>
        <p class="font-bangla font-medium text-2xl">${datas.meaning}</p>
    </div>
    <div>
        <h1 class="font-semibold text-2xl">Example</h1>
        <p class="font-bangla font-medium text-2xl">${datas.sentence}</p>
    </div>
    <div>
        <h1 class="font-semibold font-bangla text-2xl">সমার্থক শব্দ গুলো</h1>
        
    </div>
    <div id="snameid">
    ${synonames(datas.synonyms)}
       
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
   `;
  document.getElementById("my_modal_5").showModal();
};
// word load and word related other functionality here
const lessongBtnremove = () => {
  const lessonbtns = document.querySelectorAll(".lessongBtnRemove");
  lessonbtns.forEach((lessonbtn) => {
    lessonbtn.classList.remove("activeBtn");
  });
};

const wordLoad = (id) => {
  spinbar(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((datas) => {
      displayWord(datas.data);
      const lessonBtn = document.getElementById(`lessonbtn${id}`);

      lessongBtnremove();
      lessonBtn.classList.add("activeBtn");
    });
};

const displayWord = (words) => {
  // spinbar(true);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center mx-auto mt-10 p-16 col-span-3 space-y-3">
        <img class=" mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla text-sm text[#79716B] ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bold text-4xl text-[#292524]">নেক্সট Lesson এ যান।</h1>
       </div>
    `;
  }
  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
         <div class="text-center mt-16 p-15 space-y-5 bg-white rounded-lg shadow-md">
                <h1 class="font-bold  text-3xl">${
                  word.word ? word.word : "Word Not found"
                }</h1>
                <p class="font-medium text-xl"> Meaning/pronunciation </p>
                <h1 class="font-semibold text-3xl text-[#18181B]">${
                  word.meaning ? word.meaning : "Meaning Not Found"
                }/${
      word.pronunciation ? word.pronunciation : "Pronunciation Not Found"
    }</h1>
                <div class="flex justify-between mt-9">
                    <button onclick="loadWordDetails(${
                      word.id
                    })" class=" bg-[#1A91FF10] hover:bg-[#1A91FF80] p-4 rounded-sm"><i class="fa-solid fa-circle-info"></i></button>
                    <button class=" bg-[#1A91FF10] hover:bg-[#1A91FF80] p-4 rounded-sm"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
    `;
    // console.log(word);
    wordContainer.append(wordCard);
  });
  spinbar(false);
};

// lessong Load and lesson related other functionality here
const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  for (let lesson of lessons) {
    // console.log(lesson)
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
    <button id="lessonbtn${lesson.level_no}" onclick="wordLoad(${lesson.level_no})" class="btn btn-outline btn-primary lessongBtnRemove"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    `;
    lessonContainer.append(lessonBtn);
  }
};
loadLesson();

document.getElementById("search-btn").addEventListener("click", () => {
  const inputValue = document.getElementById("search-input").value;
  fetch("")

});
