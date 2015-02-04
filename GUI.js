(function(){
    var i, j, elem, div,curRow,ycoords,xcoords, sheet, grid = document.getElementById("grid");
    sheet =  document.getElementById("sheet");
    xcoords = document.createElement("div");
    xcoords.setAttribute('id','x-coords');
    sheet.addEventListener('scroll',function(e){
        xcoords.style.top = sheet.scrollTop + "px";
    });
    sheet.insertBefore(xcoords,grid);
    for(i = 0; i < 50; i++){
        div = document.createElement("div");
        div.setAttribute("class","box label");
        div.innerHTML = i;
        xcoords.appendChild(div);
    }
    ycoords = document.createElement("div");
    ycoords.setAttribute('id','y-coords');
    for(j = 1; j < 50; j++){
        curRow = document.createElement("div");
        div = document.createElement("div");
        div.setAttribute("class","box box-y label");
        div.innerHTML = j;
        ycoords.appendChild(div);
        for(i = 1; i < 50; i++){
            elem = new APP.CellElem();
            elem.setAttribute("cell-id",j+":"+i);
            elem.setAttribute("class","box")
            curRow.appendChild(elem);
        }
        sheet.insertBefore(ycoords,grid);
        grid.appendChild(curRow);
        ycoords.style.top = xcoords.offsetHeight + "px";
        grid.style.top = xcoords.offsetHeight + "px";
        grid.style.left = ycoords.offsetWidth + "px";
        sheet.addEventListener('scroll',function(e){
            ycoords.style.left = sheet.scrollLeft + "px";
        });
    }
})();