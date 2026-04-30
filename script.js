// Initialize map centered on Simcoe County, Ontario
const map = L.map("map").setView([44.4, -79.7], 9);

// Base layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Load GeoJSON data
async function loadTrees() {
  try {
    const response = await fetch("trees.json");
    const data = await response.json();

    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties;

        const popupContent = `
          <div>
            <h3>${props.tree_name}</h3>
            <p><strong>Fruit Taste:</strong> ${props.fruit_taste}</p>

            <div>
              <strong>Tree Image:</strong><br/>
              <img class="popup-img" src="${props.tree_picture_url}" alt="tree image"/>
            </div>

            <div>
              <strong>Flower:</strong> ${props.flowering_colour} (${props.flowering_time})<br/>
              <img class="popup-img" src="${props.flower_picture_url}" alt="flower image"/>
            </div>

            <div>
              <strong>Fruit:</strong> ${props.fruit_time}<br/>
              <img class="popup-img" src="${props.fruit_picture_url}" alt="fruit image"/>
            </div>

            <p><em>${props.misc_info}</em></p>
          </div>
        `;

        layer.bindPopup(popupContent);
      }
    }).addTo(map);

  } catch (error) {
    console.error("Error loading trees.json:", error);
  }
}

loadTrees();