/* script.js - interactivity for PharmaElevate */

/* ====== Lightbox for gallery images ====== */
document.addEventListener('click', function(e){
  if(e.target.matches('.gallery img')){
    const src = e.target.getAttribute('src');
    openLightbox(src);
  }
});
function openLightbox(src){
  let lb = document.createElement('div');
  lb.style = `position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;`;
  lb.innerHTML = `<div style="max-width:90%;max-height:90%"><img src="${src}" style="max-width:100%;max-height:90vh;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.6)"></div>`;
  lb.addEventListener('click', ()=> lb.remove());
  document.body.appendChild(lb);
}

/* ====== Drug Search ====== */
const drugs = [
  {name:"Paracetamol", uses:"Fever, mild pain", dose:"500 mg every 4-6 hours (adult)", side:"Nausea, liver risk in overdose"},
  {name:"Ibuprofen", uses:"Pain, inflammation", dose:"200-400 mg every 4-6 hours", side:"Gastric irritation"},
  {name:"Cetirizine", uses:"Allergy", dose:"10 mg once daily", side:"Drowsiness"},
  {name:"Amoxicillin", uses:"Bacterial infections", dose:"Depends on infection; consult doctor", side:"Allergic reactions possible"},
  {name:"Omeprazole", uses:"Acid reflux", dose:"20-40 mg once daily", side:"Headache, abdominal pain"}
];
function renderDrugs(list){
  const container = document.getElementById('drug-list');
  if(!container) return;
  container.innerHTML = '';
  list.forEach(d=>{
    const el = document.createElement('div');
    el.className = 'drug';
    el.innerHTML = `<h4>${d.name}</h4><small>${d.uses}</small><p style="margin:10px 0 0"><strong>Typical dose:</strong> ${d.dose}<br/><strong>Side effects:</strong> ${d.side}</p>`;
    container.appendChild(el);
  });
}
document.addEventListener('DOMContentLoaded', ()=> {
  renderDrugs(drugs);
  const search = document.getElementById('drug-search');
  if(search){
    search.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase().trim();
      const filtered = drugs.filter(d => d.name.toLowerCase().includes(q) || d.uses.toLowerCase().includes(q));
      renderDrugs(filtered);
    });
  }
});

/* ====== Simple Quiz ====== */
const quizData = [
  {q:"Paracetamol is mainly used for:", a:["Allergy","Fever","Infection"], correct:1},
  {q:"Which is an anti-inflammatory drug?", a:["Cetirizine","Ibuprofen","Omeprazole"], correct:1},
  {q:"Pharmacovigilance deals with:", a:["Drug promotion","Drug safety monitoring","Drug manufacturing"], correct:1},
];
function startQuiz(){
  const qbox = document.getElementById('quiz-box');
  if(!qbox) return;
  qbox.innerHTML = '';
  let score=0;
  quizData.forEach((item, idx)=>{
    const div = document.createElement('div');
    div.className='quiz';
    div.innerHTML = `<p><strong>Q${idx+1}.</strong> ${item.q}</p>`;
    item.a.forEach((opt,i)=>{
      const id = `q${idx}_opt${i}`;
      div.innerHTML += `<div style="margin:6px 0"><input type="radio" name="q${idx}" id="${id}" value="${i}"> <label for="${id}">${opt}</label></div>`;
    });
    qbox.appendChild(div);
  });
  const btn = document.createElement('button');
  btn.textContent='Submit Quiz';
  btn.addEventListener('click', ()=>{
    quizData.forEach((item, idx)=>{
      const radios = document.getElementsByName(`q${idx}`);
      for(const r of radios){
        if(r.checked && parseInt(r.value)===item.correct) score++;
      }
    });
    const res = document.getElementById('quiz-result');
    res.textContent = `You scored ${score} out of ${quizData.length}`;
  });
  qbox.appendChild(btn);
}

/* Run on pages with startQuiz container */
document.addEventListener('DOMContentLoaded', ()=> startQuiz());
