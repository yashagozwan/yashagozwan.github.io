const card = document.querySelector('.chart');
const btnBG1 = document.getElementById('btn-bg1');
const btnBG2 = document.getElementById('btn-bg2');

// dom
btnBG1.addEventListener('click', () => {
  document.querySelector('body').style.background = '#fff';
  btnBG1.style.display = 'none'
  btnBG2.style.display = 'block'

});

btnBG2.addEventListener('click', () => {
  document.querySelector('body').style.background = '';
  btnBG1.style.display = 'block'
  btnBG2.style.display = 'none'
});

// data skill
const dataSkill = new Promise((resolve) => {
  resolve([
    {nama: 'HTML', percen: 80},
    {nama: 'CSS / SASS', percen: 80},
    {nama: 'Javascript', percen: 75},
    {nama: 'PHP', percen: 60},
    {nama: 'MySQL', percen: 75},
    {nama: 'MongoDB', percen: 50},
    {nama: 'Adobe Illustrator', percen: 80},
  ])
});

// fetch data
dataSkill.then((data) => {
  let cardTemplate = '';
  data.map((dataObject) => {
    cardTemplate += cards(dataObject);
    card.innerHTML = cardTemplate;
  });
}).catch((err) => console.log(err))

// card template
function cards(data){
  const { nama, percen } = data;
  return `<div class="chart-box">
            <div class="text">
              <h3>${nama}</h3>
              <h3>${percen}%</h3>
            </div>
            <div class="line">
              <div class="grafik" style="width: ${percen}%;"></div>
            </div>
          </div>`;
}