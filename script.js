const subjectsList = document.getElementById("subjectsList");
const searchInput = document.getElementById("searchInput");
let subjects = [];

// Učitavanje skripti iz lokalnog JSON fajla
async function loadSubjects() {
  try {
    const response = await fetch("data/skripte.json");
    const data = await response.json();

    subjects = Object.keys(data).map(name => ({
      name,
      type: name.includes("Toksikološka") || name.includes("Izborni") ? "izborni" : "obavezni",
      resources: data[name]
    }));

    displaySubjects(subjects);
  } catch (error) {
    subjectsList.innerHTML = "<p style='color:red;'>Greška pri učitavanju skripti.</p>";
  }
}

// Prikaz predmeta i skripti
function displaySubjects(filteredSubjects) {
  subjectsList.innerHTML = "";
  filteredSubjects.forEach(subject => {
    const div = document.createElement("div");
    div.className = "subject";
    div.innerHTML = `<strong>${subject.name}</strong>`;

    if (subject.resources && subject.resources.length > 0) {
      const ul = document.createElement("ul");
      subject.resources.forEach(resource => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${resource.link}" target="_blank">${resource.label}</a>`;
        ul.appendChild(li);
      });
      div.appendChild(ul);
    }

    subjectsList.appendChild(div);
  });
}

// Filtriranje po tipu
function filterSubjects(type) {
  if (type === "all") {
    displaySubjects(subjects);
  } else {
    const filtered = subjects.filter(s => s.type === type);
    displaySubjects(filtered);
  }
}

// Pretraga po nazivu
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = subjects.filter(s => s.name.toLowerCase().includes(query));
  displaySubjects(filtered);
});

// Pokretanje
loadSubjects();
