(function(){
    var cellProto = Object.create(HTMLElement.prototype);
    cellProto.createdCallback = function() {
        this.setAttribute("contenteditable","true");
        this.onblur = function(){
            this.innerHTML = APP.sheetGrid.updateCell(this);
        };
        this.onclick = function(){
            var c = APP.sheetGrid.getCell(this.getAttribute('cell-id'));
            if (typeof c!== 'undefined') {
                this.innerHTML = c.getContents();
            }
        };
        this.onkeydown = function(){
            var c = APP.sheetGrid.getCell(this.getAttribute('cell-id'));
            if(typeof c === 'undefined'){
                this.innerHTML = APP.sheetGrid.updateCell(this);
            }
            APP.sheetGrid.getCell(this.getAttribute('cell-id')).storeContents(this.innerHTML);
        }
    };
    APP.CellElem = document.registerElement("cell-element", {prototype: cellProto});
})();