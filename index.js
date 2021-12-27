const sub = document.querySelector('#subreddit')
const search = document.querySelector('#search')
const number = document.querySelector('#number')
const mehet = document.querySelector('#mehet')
const links = document.querySelector("#links")


let resp= ""
let obj = ""

async function genobj(afterstr){

    if(search.value.length>0)
        resp = await fetch(`https://www.reddit.com/r/${sub.value}/search.json?q=${search.value}&restrict_sr=1&sr_nsfw=1&limit=100&include_over_18=on&`+afterstr)
    else
        resp = await fetch(`https://www.reddit.com/r/${sub.value}.json?sort=top&limit=100&`+afterstr)
    
    obj = await resp.json()

    return 1
}





function createDiv(i){
    let div = document.createElement('div')
    
    let img = document.createElement('img')
    img.src = obj.data.children.at(i).data.thumbnail;
    //a.innerHTML=`<div style="position:relative; padding-bottom: 55.54%"><iframe src="${obj.data.children.at(i).data.url}" 
    //frameborder="0" scrolling="no" width="100%" height="100%" style="position:absolute; top:0; left:0;" allowfullscreen=""></iframe></div>`
    if(links.checked){
    let a = document.createElement('a')
    a.href = obj.data.children.at(i).data.url;
    a.append(img)
    div.append(a)
    }
    else{

        div.append(img)
        img.addEventListener('click',function(){generateVid(obj.data.children.at(i).data.media_embed.content, div, div.innerHTML)})
    }

    return div
    }


    function createDivRandom(i){
        let div = document.createElement('div')
        
        let img = document.createElement('img')
        img.src = obj.at(0).data.children.at(i).data.thumbnail;
        //a.innerHTML=`<div style="position:relative; padding-bottom: 55.54%"><iframe src="${obj.data.children.at(i).data.url}" 
        //frameborder="0" scrolling="no" width="100%" height="100%" style="position:absolute; top:0; left:0;" allowfullscreen=""></iframe></div>`
        if(links.checked){
        let a = document.createElement('a')
        a.href = obj.at(0).data.children.at(i).data.url;
        a.append(img)
        div.append(a)
        }
        else{
    
            div.append(img)
            let href = obj.at(0).data.children.at(i).data.media_embed.content;
            img.addEventListener('click',function(){generateVid(href, div, div.innerHTML)})
        }
    
        return div
        }


    function htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes[0].nodeValue;
      }

    function generateVid(url, div, prev){
        //a.innerHTML=`<div style="position:relative; padding-bottom: 55.54%"><iframe src="${obj.data.children.at(i).data.url}" 
        //frameborder="0" scrolling="no" width="100%" height="100%" style="position:absolute; top:0; left:0;" allowfullscreen=""></iframe></div>`
        div.innerHTML=`<div style='position:relative; padding-bottom: 56.31%'>
        ${htmlDecode(url)}</div>`
        let btn = document.createElement('button')
        btn.innerText="back"
        btn.addEventListener('click',function(){div.innerHTML=prev})
        div.append(btn)
        return div
        }
    

let astr=""
const body=document.querySelector('body')

async function handleclick(){
    //body.innerHTML=''
    astr=""
    for(let j=0;j<number.value;j++){
    await genobj(astr)
    for(let i=0;i<100;i++){
        body.append(createDiv(i))
    }
    astr="after="+obj.data.after;
}

}

mehet.addEventListener('click', handleclick)

const rand = document.querySelector('#random')
rand.addEventListener('click',async function(){
    resp = await fetch(`https://www.reddit.com/r/${sub.value}/random.json`)
    obj = await resp.json()
    body.append(createDivRandom(0))


})
