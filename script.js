// get categories
const getCategory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories").then(
    (res) => res.json().then((data) => showCategories(data.categories))
  );
};
// get videos
const getVideos = (inputValue = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputValue}`
  ).then((res) =>
    res.json().then((data) => {
      showVideos(data.videos);
    })
  );
};

// get videos by category
const getVideosByCategory = (id) => {
  const urlToFetch = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(urlToFetch)
    .then((res) => res.json())
    .then((data) => {
      showVideos(data.category);
      removeActiveClass();
      const activeBtn = document.getElementById(`active-${id}`);
      activeBtn.classList.add("bg-red-500", "text-white");
    });
};

// get video details by id
const getVideoDetailsById = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

// remove active class
const removeActiveClass = () => {
  const activeBtns = document.querySelectorAll(
    "#categoryBtnsContainer .bg-red-500"
  );
  activeBtns.forEach((elem) => {
    elem.classList.remove("bg-red-500", "text-white");
  });
};

// display video details
const displayVideoDetails = (video) => {
  document.getElementById("video_details_container").showModal();
  const videoDetailsBox = document.getElementById("video-details");
  videoDetailsBox.innerHTML = `<div class="card bg-base-100">
          <figure>
            <img
              src="${video.thumbnail}"
              alt="Shoes"
              class="rounded-md w-full h-[250px] object-cover"
            />
          </figure>

          <div class="mt-4">
            <div class="flex items-center gap-4 mb-4">
              <img src="${video.authors[0].profile_picture}" class="w-12 h-12 rounded-full object-cover" alt="authors-profile"/>
              <div>
                <p class="text-base">${video.authors[0].profile_name}</p>
                <p class="text-xs">${video.others.views}  <span class="text-red-500 capitalize">subscribers</span></p>

              </div>
            </div>
            <h2 class="card-title">${video.title}</h2>
            <p class="mt-2">
              ${video.description}
            </p>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>`;
};

// display videos
const showVideos = (videos) => {
  removeActiveClass();
  const activeBtnAll = document.querySelector("#categoryBtnsContainer .all");
  activeBtnAll.classList.add("bg-red-500", "text-white");
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.innerHTML = `<div
        class="py-32 col-span-full flex flex-col justify-center items-center space-y-2"
      >
        <img src="assets/img/Icon.png" alt="no-video-icon" />
        <h2 class="font-bold text-3xl text-center">
          Oops!! Sorry, There is no <br />
          content here
        </h2>
      </div>`;
    return;
  }
  videos.forEach((elem) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="space-y-5">
        <!-- image -->
        <div class="w-full h-[200px] relative">
          <img
            src="${elem.thumbnail}"
            alt="${elem.thumbnail}"
            class="w-full h-full object-cover rounded-lg"
          />
          <span
            class="absolute bottom-1 right-1 text-xs bg-black text-white px-1 rounded"
            >3h 56m</span
          >
        </div>
        <!-- info -->
        <div class="flex gap-3">
          <!-- profile -->
          <div>
            <img
              src="${elem.authors[0].profile_picture}"
              alt="${elem.authors[0].profile_name}"
              class="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <!-- text -->
          <div class="space-y-1">
            <h2 class="text-xl font-semibold capitalize">${elem.title}</h2>
            <p class="text-xs capitalize text-gray-500">${
              elem.authors[0].profile_name
            }</p>
            <p class="text-xs capitalize text-gray-500 flex items-center gap-2">${
              elem.others.views
            } 
              ${
                elem.authors[0].verified === true
                  ? `<img src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"      alt="verified-badge" class="w-4 h-4" />`
                  : ""
              }
            </p>
          </div>
        </div>
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl w-full text-base capitalize border-none" onclick=getVideoDetailsById("${
          elem.video_id
        }")>show details</button>
      </div>`;
    videoContainer.append(div);
  });
};

// display categories
const showCategories = (data) => {
  const categoryBtnsContainer = document.getElementById(
    "categoryBtnsContainer"
  );
  data.forEach((elem) => {
    const div = document.createElement("div");
    div.innerHTML = `<button id="active-${elem.category_id}" onclick="getVideosByCategory(${elem.category_id})" class="btn btn-sm hover:bg-red-500 capitalize hover:text-white">${elem.category}</button>`;
    categoryBtnsContainer.append(div);
  });
};

// display videos by search values
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  const inputValue = e.target.value;
  getVideos(inputValue);
});

getCategory();
getVideos();
