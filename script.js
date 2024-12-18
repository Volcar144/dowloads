
document.addEventListener("DOMContentLoaded", () => {
  const baseFolder = "downloads/uploads/";
  const fileList = document.getElementById("file-list");
  const searchInput = document.getElementById("search");

  // Simulate files, replace with actual file names
  const files = {
    jar: ["ChatFilter.jar", "DiscordSRV-Build-1.28.0.jar", "Fadah-Bukkit-2.7.4.jar", "InsaneAnnouncer-1.4.4.jar", "PocketHorses-1.9.6.jar"],
    image: ["download.jpg", "steamuserimages-a.akamaihd.gif"],
    text: ["readme.txt"]
  };

  // Combine all file arrays into one for easier filtering
  const allFiles = Object.values(files).flat();

  // Display files
  function displayFiles(fileArray) {
    fileList.innerHTML = ''; // Clear existing list
    fileArray.forEach((file) => {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = `${baseFolder}${file}`;
      link.download = file;

      const fileType = file.split(".").pop().toLowerCase(); // Get the file type

      // Add file preview for images or text files
      if (fileType === 'png' || fileType === 'jpg' || fileType === 'gif') {
        const preview = document.createElement("div");
        preview.classList.add("file-preview");
        const img = document.createElement("img");
        img.src = `${baseFolder}${file}`;
        img.alt = file;
        preview.appendChild(img);
        listItem.appendChild(preview);
      }

      link.textContent = `Download ${file}`;
      listItem.appendChild(link);
      fileList.appendChild(listItem);
    });
  }

  // Function to filter files based on search
  function filterFiles(query) {
    const filteredFiles = allFiles.filter((file) =>
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
