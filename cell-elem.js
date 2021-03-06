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
            APP.cellMethods.revealCellContents.apply(this);
            APP.sheetGrid.keepFocused(this);
            APP.cellMethods.suggestionToggleOff.apply(this);
        };
        this.addEventListener("keydown",function(){
        });

        this.addEventListener("mouseenter", function () {
            APP.sheetGrid.highlightLocation(this);
        });
        this.addEventListener("mouseleave", function () {
            APP.sheetGrid.removeHighlightLocation(this);
        });

        this.onkeydown = function () {
            APP.cellMethods.createBox.apply(this);
            this.suggestionBox.updateSuggestions();
            APP.cellMethods.storeButDontProcess.apply(this);
        }
    };
    APP.CellElem = document.registerElement("cell-element", {prototype: cellProto});
})();