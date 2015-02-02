(function(){
    var cellProto = Object.create(HTMLElement.prototype);
    cellProto.createdCallback = function() {
        this.setAttribute("contenteditable","true");
        this.onblur = function(){
            this.innerHTML = APP.sheetGrid.updateCell(this);
        };
        this.onclick = function(){
            this.innerHTML = APP.sheetGrid.getCellHidden(this.getAttribute("cell-id"));
        };
    };
    APP.CellElem = document.registerElement("cell-element", {prototype: cellProto});
})();