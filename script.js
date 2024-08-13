let page = 1; // Initial page number
const gallery = document.getElementById("gallery");

// Fetch images from the API
async function fetchImages() {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=60`
    );
    const images = await response.json();
    displayImages(images);
    page++; // Increment the page number for the next request
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Display images in the gallery
function displayImages(images) {
  images.forEach((image) => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";
    // imgContainer.className.add("flex");
    imgContainer.innerHTML = `
            <img src="${image.download_url}" alt="Image by ${image.author}">
        `;
    gallery.appendChild(imgContainer);
  });
}

// Initial fetch of images
fetchImages();

// Infinite scrolling logic
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    console.log("Reached the bottom");
    fetchImages(); // Fetch more images
  }
});
