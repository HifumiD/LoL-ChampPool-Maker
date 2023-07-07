// Define your API key
const apiKey = 'RGAPI-a2b25d7e-5721-4189-80f1-61cc8a13ca48';

// Make an API request
fetch(`https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json`)
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
    // Extract the champion data
    const champions = Object.values(data.data);

    // Display the splash arts
    const championImagesContainer = document.getElementById('championImages');

    champions.forEach(champion => {
      const imageElement = document.createElement('img');
      const championName = champion.name.replace(/\s/g, ''); // Remove spaces from the champion name
      imageElement.src = `https://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${champion.image.full}`;
      imageElement.alt = champion.name;
      imageElement.classList.add('champion-image');
      imageElement.id = championName; // Set a unique id for each image

      championImagesContainer.appendChild(imageElement);
    });

    const championImages = document.querySelectorAll('.champion-image');
    const dragAreas = document.querySelectorAll('.drag-area');

    championImages.forEach(championImage => {
      championImage.addEventListener('dragstart', dragStart);
      championImage.addEventListener('dragend', dragEnd);
    });

    dragAreas.forEach(dragArea => {
      dragArea.addEventListener('dragover', dragOver);
      dragArea.addEventListener('dragenter', dragEnter);
      dragArea.addEventListener('dragleave', dragLeave);
      dragArea.addEventListener('drop', dragDrop);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function dragStart(event) {
  this.classList.add('dragging');
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter() {
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function dragDrop(event) {
  event.preventDefault();
  const draggedImageId = event.dataTransfer.getData('text/plain');
  const draggedImage = document.getElementById(draggedImageId);
  this.appendChild(draggedImage);
  this.classList.remove('drag-over');
}




