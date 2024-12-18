document.addEventListener("DOMContentLoaded", () => {
  const baseFolder = "downloads/"; // Base folder for all downloads
  const fileList = document.getElementById("file-list"); // UL element where links will be added

  // Define your subfolders and their respective files
  const files = {
    jars: [
      "ChatFilter.jar",
      "DiscordSRV-Build-1.28.0.jar",
      "Fadah-Bukkit-2.7.4.jar",
      "InsaneAnnouncer-1.4.4.jar",
      "PocketHorses-1.9.6.jar",
      "ProAntiTab-1.9.0.jar",
      "Simple Codes.jar",
      "Socialismus-PAPER-1.3.8.jar",
      "TerraformGenerator-18.0.0.jar",
    ],
  };

  // Loop over subfolders
  Object.keys(files).forEach((folder) => {
    // Ensure the folder has files defined
    if (files[folder] && Array.isArray(files[folder])) {
      files[folder].forEach((file) => {
        // Create a list item and link for each file
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `${baseFolder}${folder}/${file}`; // Build file path
        link.download = file; // Trigger download
        link.textContent = `Download ${file}`; // Link text
        listItem.appendChild(link);
        fileList.appendChild(listItem); // Add the list item to the UL
      });
    }
  });
});
