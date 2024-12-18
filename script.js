document.addEventListener("DOMContentLoaded", () => {
  const baseFolder = "uploads/";
  const fileList = document.getElementById("file-list");
  const searchInput = document.getElementById("search");

  // Simulate files, replace with actual file names
  const files = {
    jar: ["ChatFilter.jar", "DiscordSRV-Build-1.28.0.jar", "Fadah-Bukkit-2.7.4.jar", "InsaneAnnouncer-1.4.4.jar", "PocketHorses-1.9.6.jar","ProAntiTab-1.9.0.jar","Simple Codes.jar","Socialismus-PAPER-1.3.8.jar","TerraformGenerator-18.0.0.jar"],
    image: ["download.jpg", "steamuserimages-a.akamaihd.gif"],
    text: ["readme.txt"]
  };

  // Combine all files into a single array for easier filtering
  const allFiles = Object.entries(files).flatMap(([type, fileArray]) =>
    fileArray.map(file => ({ type, file }))
  );

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Display files
  function displayFiles(fileArray) {
    fileList.innerHTML = ''; // Clear existing list
    fileArray.forEach(({ type, file }) => {
      const listItem = document.createElement("li");

      const filePath = `${baseFolder}${type}/${file}`;

      // Create the download link
      const link = document.createElement("a");
      link.href = filePath;
      link.download = file;
      link.textContent = `Download ${file}`;

      // Create the favorite button
      const favButton = document.createElement("button");
      favButton.textContent = favorites.includes(file) ? "★" : "☆"; // Star if favorited
      favButton.title = "Add to favorites";
      favButton.classList.add("fav-button");
      favButton.addEventListener("click", () => toggleFavorite(file, favButton));

      // Create the QR code button
      const qrButton = document.createElement("button");
      qrButton.textContent = "QR";
      qrButton.title = "Generate QR Code";
      qrButton.classList.add("qr-button");
      qrButton.addEventListener("click", () => generateQRCode(filePath));

      // Add file preview for images
      if (type === 'image') {
        const preview = document.createElement("div");
        preview.classList.add("file-preview");
        const img = document.createElement("img");
        img.src = filePath;
        img.alt = file;
        preview.appendChild(img);
        listItem.appendChild(preview);
      }

      listItem.appendChild(link);
      listItem.appendChild(favButton);
      listItem.appendChild(qrButton);
      fileList.appendChild(listItem);
    });
  }

  // Function to toggle favorites
  function toggleFavorite(file, button) {
    const index = favorites.indexOf(file);
    if (index > -1) {
      favorites.splice(index, 1);
      button.textContent = "☆";
    } else {
      favorites.push(file);
      button.textContent = "★";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Function to generate QR Code
  function generateQRCode(url) {
    const qrModal = document.createElement("div");
    qrModal.classList.add("qr-modal");
    qrModal.innerHTML = `
      <div class="qr-container">
        <div id="qr-code"></div>
        <button id="close-qr">Close</button>
      </div>
    `;
    document.body.appendChild(qrModal);

    // Generate the QR Code
    const qrCode = new QRCode(document.getElementById("qr-code"), {
      text: url,
      width: 200,
      height: 200
    });

    // Close button functionality
    document.getElementById("close-qr").addEventListener("click", () => {
      qrModal.remove();
    });
  }

  // Function to filter files based on search
  function filterFiles(query) {
    const filteredFiles = allFiles.filter(({ file }) =>
      file.toLowerCase().includes(query.toLowerCase())
    );
    displayFiles(filteredFiles);
  }

  // Event listener for search input
  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    filterFiles(query);
  });

  // Initially display all files
  displayFiles(allFiles);
});
