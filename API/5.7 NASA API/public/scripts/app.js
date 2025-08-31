console.log("app.js is loaded and running");

const sel = (q, el = document) => el.querySelector(q);
const selAll = (q, el = document) => Array.from(el.querySelectorAll(q));

document.addEventListener("DOMContentLoaded", () => {
  initDateForm();
  initMonthForm();
});

function initDateForm() {
  const form = sel("#dateForm");
  if (!form) return;

  //Date Selected
  const sectionThree = sel("#three");
  const sdTitle = sel("#sdTitle");
  const sdDate = sel("#sdDate");
  const sdExplanation = sel("#sdExplanation");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); //progressive enhancement: skip reload
    const formData = new FormData(form);
    const date = formData.get("date");
    if (!date) return;

    try {
      const res = await fetch(`/date/?date=${encodeURIComponent(date)}`);
      if (!res.ok) throw new Error("APOD failed");
      const data = await res.json();

      sdTitle.textContent = data.title || "";
      sdDate.textContent = data.date || "";
      sdExplanation.textContent = data.explanation || "";

      //show section 3
      sectionThree.style.display = "block";

      if (data.image) {
        //set background image for the whole section
        sectionThree.style.backgroundImage = `url('${data.image}')`;
        sectionThree.style.backgroundRepeat = "no-repeat";
        sectionThree.style.backgroundSize = "cover";
        sectionThree.style.backgroundPosition = "center";
      } else {
        sectionThree.style.backgroundImage = "";
      }
    } catch (err) {
      console.error(err);
      sdTitle.textContent = "No data";
      sdDate.textContent = "";
      sdExplanation.textContent = "";
      sectionThree.style.backgroundImage = "";
    }
  });
}

function initMonthForm() {
  const form = sel("#pastDays");
  const buttons = selAll('button[name="month"]', form);
  if (!form) return;
  const gridImages = sel("#gridImages");

  async function loadMonth(month) {
    try {
      const res = await fetch(`/month?month=${encodeURIComponent(month)}`);
      if (!res.ok) throw new Error("APOD failed");
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        gridImages.innerHTML = `<p>No images for this month.</p>`;
        return;
      }

      // Render images (use hdurl or fallback to url)
      const html = data
        .map((p) => {
          const src = p.hdurl || p.url;
          const title = escapeHtml(p.title || "");
          //const date = escapeHtml(p.date || "");
          
          return `
            <figure class="apod-item p-1">
              <img src="${src}" alt="${title}" loading="lazy" />
              <figcaption> ${title}</figcaption>
            </figure>
          `;
        })
        .join("");
      gridImages.innerHTML = html;
    } catch (err) {
      console.error(err);
      gridImages.innerHTML = `<p>Error loading month.</p>`;
    }
  }

  //pre-load first month
  const firstBtn = sel("#buttonOne");
  if (firstBtn) {
    loadMonth(firstBtn.value);
    setActiveButton(firstBtn);
  }

  //other month for clicking on other buttons
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let month = e.submitter?.value;
    const clickedBtn = e.submitter;
    if (!month) {
      month = firstBtn.value;
    }
    loadMonth(month);
    setActiveButton(clickedBtn);
  });

  //active buttons
function setActiveButton(activeBtn){
    buttons.forEach(btn=>btn.classList.remove('active'));
    if (activeBtn){
        activeBtn.classList.add('active');
    }
};
}


// Simple escaper for captions
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
