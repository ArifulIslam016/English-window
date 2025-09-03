//All levels brins here
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// word load and word related other functionality here

const wordLoad = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((datas) => displayWord(datas.data));
};
// id: 90;
// level: 1;
// meaning: "পানি";
// pronunciation: "ওয়াটার";
// word: "Water";
// display words dynamicaly
const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if(words.length==0){
    wordContainer.innerHTML = `
    <div class="text-center mx-auto mt-10 p-16 col-span-3 space-y-3">
        <img class=" mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla text-sm text[#79716B] ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bold text-4xl text-[#292524]">নেক্সট Lesson এ যান।</h1>
       </div>
    `;                          
  }
  words.forEach((word) => {
    const wordCard= document.createElement("div")
    wordCard.innerHTML = `
         <div class="text-center mt-16 p-15 space-y-5 bg-white rounded-lg shadow-md">
                <h1 class="font-bold  text-3xl">${word.word? word.word:"Word Not found"}</h1>
                <p class="font-medium text-xl"> Meaning/pronunciation </p>
                <h1 class="font-semibold text-3xl text-[#18181B]">${word.meaning? word.meaning:"Meaning Not Found"}/${word.pronunciation? word.pronunciation: "Pronunciation Not Found"}</h1>
                <div class="flex justify-between mt-9">
                    <button class=" bg-[#1A91FF10] hover:bg-[#1A91FF80] p-4 rounded-sm"><i class="fa-solid fa-circle-info"></i></button>
                    <button class=" bg-[#1A91FF10] hover:bg-[#1A91FF80] p-4 rounded-sm"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
    `;
    console.log(word);
     wordContainer.append(wordCard);
  });
 
};

// lessong Load and lesson related other functionality here
const displayLesson = (lessons) => {
  const lessonContainer = document.getElementById("lesson-container");
  for (let lesson of lessons) {
    // console.log(lesson)
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
    <button onclick="wordLoad(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    `;
    lessonContainer.append(lessonBtn);
  }
};
loadLesson();
