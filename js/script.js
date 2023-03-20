    document.getElementById('newyork').addEventListener('click',newyork)
    document.getElementById('crime').addEventListener('click',crime)
    document.getElementById('morbid').addEventListener('click',morbid)
    document.getElementById('lincoln').addEventListener('click',lincoln)

    let RSS_URL=''
    if(newyork){
        RSS_URL = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
        renderData()
    }
function newyork(){
    document.getElementById('crimel').classList.remove('active')
    document.getElementById('newyorkl').classList.add('active')
    document.getElementById('morbidl').classList.remove('active')
    document.getElementById('lincolnl').classList.remove('active')
   
    RSS_URL = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    renderData()
}
function crime(){
    document.getElementById('crimel').classList.add('active')
    document.getElementById('newyorkl').classList.remove('active')
    document.getElementById('morbidl').classList.remove('active')
    document.getElementById('lincolnl').classList.remove('active')
    RSS_URL = "https://feeds.simplecast.com/qm_9xx0g"
    renderData()
}
function morbid(){
    document.getElementById('crimel').classList.remove('active')
    document.getElementById('newyorkl').classList.remove('active')
    document.getElementById('morbidl').classList.add('active')
    document.getElementById('lincolnl').classList.remove('active')
    
   RSS_URL = "https://rss.art19.com/morbid-a-true-crime-podcast"
    renderData()
}
function lincoln(){
    document.getElementById('crimel').classList.remove('active')
    document.getElementById('newyorkl').classList.remove('active')
    document.getElementById('morbidl').classList.remove('active')
    document.getElementById('lincolnl').classList.add('active')
    
 RSS_URL = "https://lincolnproject.libsyn.com/rss"
    renderData()
}

// const  RSS_URL = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'

let feedData = []
let data = document.getElementById('item')
let total_records_li = document.getElementsByTagName('item')
const records_per_page = 5
let page_number = 1
const total_records = total_records_li.length
// const total_page = Math.ceil(total_records/records_per_page)
const total_page = 5


async function renderData(){
  await getData()
  let items = feedData.querySelectorAll("item");
  let start_index = (page_number - 1) * records_per_page
      let end_index = start_index + (records_per_page - 1)
      let statement = ''
    for(i=start_index; i<=end_index; i++){
      statement +=`<h3>
      ${items[i].querySelector("title").innerHTML}

       </h3>
       
       <h4>${moment(items[i].querySelector("pubDate").innerHTML).format("dddd, MMMM Do YYYY")}</h4>
       <h5>${items[i].querySelector('description').innerHTML.slice(0,250)}...</h5>
       `
    //    <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener">
    //    </a>
       
    }
    data.innerHTML = statement
    
    document.querySelectorAll('.dynamic-item').forEach(item =>{
      item.classList.remove('active')
    })
    document.getElementById(`page${page_number}`).classList.add('active')
    
    if(page_number == 1){
      document.getElementById('prebtn').parentElement.classList.add('disabled')
    }else{
      document.getElementById('prebtn').parentElement.classList.remove('disabled')
    }

    if(page_number == total_page){
      document.getElementById('nextbtn').parentElement.classList.add('disabled')
    }
    else{
      document.getElementById('nextbtn').parentElement.classList.remove('disabled')

    }
  }

async function getData(){
  const res = await fetch(RSS_URL)
  const data = await res.text()
  feedData = await new window.DOMParser().parseFromString(data, "application/xml") 

}      
generatePage()  
function generatePage(){
let prebtn = `<li onclick="prebtn()" id="prebtn" class="page-item"> <a class="page-link" href="javascript:void(0)">Previous</a></li>`
let nextbtn = `<li onclick="nextbtn()" id="nextbtn" class="page-item"> <a class="page-link" href="javascript:void(0)">Next</a></li>`
let button = '';
let activeClass = '';
for(let i=1;i<=total_page; i++){
if(i==1){
activeClass = "active"
}else{
activeClass = " "
}
button +=`<li class='${activeClass} page-item dynamic-item' id=page${i} ><a href="javascript:void(0)" class="page-link" onclick="page(${i})">${i}</a></li>`

}
document.getElementById('pagination').innerHTML = `${prebtn} ${button} ${nextbtn}`
}

function page(index){
page_number = parseInt(index)
renderData()
}
function nextbtn(){
page_number++;
renderData()
if(page_number == total_page + 1){
prebtn()
}
}
function prebtn(){
page_number--;
renderData()
if(page_number == 1 - 1){
nextbtn()
}
}
