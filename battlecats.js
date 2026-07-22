/* 検索ボタン */
const button = document.getElementById("searchButton");
button.addEventListener("click", searchStage);

/* クリアボタン */
const clearButtons = document.querySelectorAll(".clearbutton");

for (const clearButton of clearButtons) {
  clearButton.addEventListener("click", clearSearch);
}

function clearSearch(event) {
  const box = event.target.previousElementSibling;
  box.selectedIndex = 0;
}

/* 検索 */
function searchStage() {
  const searchbox1 = document.getElementById("searchbox1").value.trim();
  const searchbox2 = document.getElementById("searchbox2").value.trim();
  const searchbox3 = document.getElementById("searchbox3").value.trim();
  const result = document.getElementById("result");

  result.innerHTML = "";

  const selectedEnemies = [...new Set([
    searchbox1,
    searchbox2,
    searchbox3
  ])].filter(enemy => enemy !== "");

  const searchMode = document.querySelector(
    'input[name="searchMode"]:checked'
  ).value;

  let found = false;

  if (selectedEnemies.length === 0) {
    result.innerHTML = "<p class='result'>敵を選択してください。</p>";
    return;
  }

  for (const [chapterIndex, chapter] of chapters.entries()) {
    for (const [stageIndex, stage] of chapter.stages.entries()) {
      let match;

      if (searchMode === "AND") {
        match = selectedEnemies.every(enemy =>
          stage.enemies.includes(enemy)
        );
      } else {
        match = selectedEnemies.some(enemy =>
          stage.enemies.includes(enemy)
        );
      }

      if (match) {
        found = true;

        result.innerHTML += `
          <div class="result">
            <div class="result-stage">
              第<span class="chapter-number">${chapterIndex + 1}</span>章 :
              ${chapter.name}<br>
              <span class="stage-number">${stageIndex + 1}</span>ステージ目 :
              ${stage.stage}
              <div class="energy">統率力  :  ${stage.energy}</div>
            </div>
            <div class="enemieslist">
              <ul>
                ${stage.enemies
                  .map(enemy => `
                    <li class="${selectedEnemies.includes(enemy) ? "selected-enemy" : ""}">
                       ${enemy}
                    </li>
                    `)
                    .join("")}
              </ul>
            </div>
          </div>`;
      }
    }
  }

  if (!found) {
    result.innerHTML = "<p class='result'>該当するステージはありません。</p>";
  }
}