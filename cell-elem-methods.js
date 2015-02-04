(function () {
    APP.cellMethods = {
        removeBox: function () {
            this.suggestionBox.destroyBox();
            this.suggestionBox = undefined;
        },
        createBox:function(){
            this.suggestionBox = new APP.SuggestionBox();
            this.suggestionBox.createBox(this);
        },
        suggestionBox:function(){
            if(this.suggestionBox === undefined) {
                APP.cellMethods.createBox.apply(this);
            }else{
                APP.cellMethods.removeBox.apply(this);
            }
        },
        storeButDontProcess:function(){
            var c = APP.sheetGrid.getCell(this.getAttribute('cell-id'));
            if (typeof c === 'undefined') {
                this.innerHTML = APP.sheetGrid.updateCell(this);
            }
            APP.sheetGrid.getCell(this.getAttribute('cell-id')).storeContents(this.innerHTML);
        },
        revealCell:function(){
            var c = APP.sheetGrid.createCell(this);
            this.innerHTML = c.getContents();
        }
    };
})();

