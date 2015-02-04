(function () {
    var cellProto = Object.create(HTMLElement.prototype);
    cellProto.createdCallback = function () {
        suggestionBox:undefined;
        this.setAttribute("contenteditable", "true");
        this.onblur = function () {
            this.innerHTML = APP.sheetGrid.updateCell(this);
            APP.sheetGrid.removeFocus(this);
            APP.cellMethods.removeBox.apply(this);
        };
        this.onclick = function (e) {
            APP.cellMethods.revealCell.apply(this);
            APP.sheetGrid.keepFocused(this);
            APP.cellMethods.suggestionBox.apply(this);
        };
        this.addEventListener("keydown",function(){
            this.suggestionBox.updateSuggestions();
        });

        this.addEventListener("mouseenter", function () {
            APP.sheetGrid.highlightLocation(this);
        });
        this.addEventListener("mouseleave", function () {
            APP.sheetGrid.removeHighlightLocation(this);
        });

        this.onkeydown = function () {
            APP.cellMethods.storeButDontProcess.apply(this);
        }
    };
    APP.CellElem = document.registerElement("cell-element", {prototype: cellProto});
})();