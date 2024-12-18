document.addEventListener("DOMContentLoaded", () => {
  const baseFolder = "downloads/";
  const fileList = document.getElementById("file-list");

  // Define your subfolders
  const subFolders = ["uploads/jar"];

  subFolders.forEach((folder) => {
    // For each subfolder, create a base URL
    const folderUrl = `${baseFolder}${folder}/`;

    // Simulate files since GitHub Pages cannot fetch directory contents
    // Replace this array with the actual file names for each subfolder
    const files = {
      jars: ["ChatFilter.jar", "DiscordSRV-Build-1.28.0.jar","Fadah-Bukkit-2.7.4.jar","InsaneAnnouncer-1.4.4.jar","PocketHorses-1.9.6.jar","ProAntiTab-1.9.0.jar","Simple Codes.jar","Socialismus-PAPER-1.3.8.jar","TerraformGenerator-18.0.0.jar"]
    };

    // Add each file as a link
    files[folder].forEach((file) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `${folderUrl}${file}`;
      link.download = file; // Optional: trigger download
      link.textContent = `Download ${file} (${folder})`;
      listItem.appendChild(link);
      fileList.appendChild(listItem);
    });
  });
});
