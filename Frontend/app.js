const dropzone = document.getElementById("dropzone");
const resultDiv = document.getElementById("result");
const imageDiv = document.getElementById("imagediv");

const refreshBtn = document.getElementById("refresh-btn");

dropzone.style.height = "439px"

refreshBtn.addEventListener("click", () => {
  location.reload();
});

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropzone.style.border = "2px dashed #6B6B6B";
});

dropzone.addEventListener("dragleave", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropzone.style.border = "2px dashed #ccc";
});

dropzone.addEventListener("drop", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropzone.style.border = "2px dashed #ccc";
  dropzone.style.height = "50px";

  const files = event.dataTransfer.files;
  if (dropzone.hasChildNodes()) {
    dropzone.removeChild(dropzone.firstChild);
  }

  const formData = new FormData();
  formData.append("image", files[0], files[0].name);

  try {
    const response = await fetch("http://localhost:8000/face", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const items = await response.json();

      resultDiv.innerHTML = `1위 : ${items[0]} 2위 : ${items[1]} 3위 : ${items[2]}`
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        imageDiv.innerHTML = "";
        imageDiv.appendChild(img);
      };
      reader.readAsDataURL(files[0]);
    } else {
      console.log("Prediction failed");
    }
  } catch (error) {
    console.log(error);
  }
});

dropzone.addEventListener("click", () => {
  dropzone.style.height = "50px"
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("image", files[0], files[0].name);

    try {
      const response = await fetch("http://localhost:8000/face", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const items = await response.json();

        resultDiv.innerHTML = `1위 : ${items[0]} 2위 : ${items[1]} 3위 : ${items[2]}`
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          imageDiv.innerHTML = "";
          imageDiv.appendChild(img);
        };
        reader.readAsDataURL(files[0]);
      } else {
        console.log("Prediction failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  input.click();
});
