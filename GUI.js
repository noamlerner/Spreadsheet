(function(){
    var i, j, elem, div,curRow, grid = document.getElementById("grid");
    curRow = document.createElement("div");
    grid.appendChild(curRow);
    for(i = 0; i < 50; i++){
        div = document.createElement("div");
        div.setAttribute("class","box label");
        div.innerHTML = i;
        curRow.appendChild(div);
    }
    for(j = 1; j < 50; j++){
        curRow = document.createElement("div");
        div = document.createElement("div");
        div.setAttribute("class","box label");
        div.innerHTML = j;
        curRow.appendChild(div);
        for(i = 1; i < 50; i++){
            elem = new APP.CellElem();
            elem.setAttribute("cell-id",i+":"+j);
            elem.setAttribute("class","box")
            curRow.appendChild(elem);
        }
        grid.appendChild(curRow);
    }
})();