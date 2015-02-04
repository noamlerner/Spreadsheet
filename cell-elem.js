(function () {
    var cellProto = Object.create(HTMLElement.prototype);
    cellProto.createdCallback = function () {
        suggestionBox:{};
        this.setAttribute("contenteditable", "true");
        this.onblur = function () {
            this.innerHTML = APP.sheetGrid.updateCell(this);
            APP.sheetGrid.removeFocus(this);
            this.suggestionBox.destroyBox();
            this.suggestionBox = {};
        };
        this.onclick = function (e) {
            APP.sheetGrid.createCell(this);
            var c = APP.sheetGrid.getCell(this.getAttribute('cell-id'));
            this.innerHTML = c.getContents();
            APP.sheetGrid.keepFocused(this);
            this.suggestionBox = new APP.SuggestionBox();
            this.suggestionBox.createBox(this);
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
            var c = APP.sheetGrid.getCell(this.getAttribute('cell-id'));
            if (typeof c === 'undefined') {
                this.innerHTML = APP.sheetGrid.updateCell(this);
            }
            APP.sheetGrid.getCell(this.getAttribute('cell-id')).storeContents(this.innerHTML);
        }
    };
    APP.CellElem = document.registerElement("cell-element", {prototype: cellProto});
})();