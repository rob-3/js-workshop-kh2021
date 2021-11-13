const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const image = document.querySelector("#image");
const loading = document.querySelector("#loading");

const images = [];
let currentIndex = -1;

const nextImage = async () => {
  currentIndex++;
  if (images[currentIndex] !== undefined) {
    const { url, message } = images[currentIndex];
    image.src = url;
    loading.innerHTML = message;
  } else {
    image.src = "";
    loading.innerHTML = "Loading..."
    const imagePromise = fetch("https://foodish-api.herokuapp.com/api/").then(blob => blob.json());
    const messagePromise = fetch("http://localhost:3000/random-comment").then(blob => blob.json());
    const [imageJSON, messageJSON] = await Promise.all([imagePromise, messagePromise]);
    images.push({ url: imageJSON.image, message: messageJSON.data });
    const { url, message } = images[currentIndex];
    console.log(url);
    image.src = url;
    loading.innerHTML = message;
  }
};

const previousImage = () => {
  currentIndex = Math.max(0, currentIndex - 1);
  const { url, message } = images[currentIndex];
  image.src = url;
  loading.innerHTML = message;
};

button1.addEventListener("click", previousImage);
button2.addEventListener("click", nextImage);

// set up initial food image
nextImage();
