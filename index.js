





let obj = ""


function createDiv(i){
    let div = document.createElement('div')
    let a = document.createElement('a')
    let img = document.createElement('img')
    img.src = obj.data.children.at(i).data.thumbnail;
    a.href = obj.data.children.at(i).data.url;
    div.append(a)
    a.append(img)
    return div
    }

