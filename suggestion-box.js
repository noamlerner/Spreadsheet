(function () {
    APP.SuggestionBox = function () {
        var div, ul, storedElem;
        return {
            createBox:function (elem) {
                storedElem = elem;
                var rect = elem.getBoundingClientRect();
                div = document.createElement('div');
                document.body.appendChild(div);
                div.style.position = "fixed";
                div.style.top = (rect.top + rect.height) + 'px';
                div.style.left = rect.left + 'px';
                div.style.width = rect.width * 3 + 'px';
                div.style.backgroundColor = '#ecf0f1';

                var li, items, i;
                ul = document.createElement('ul');
                items = Object.keys(APP.math);
                for (i = 0; i < items.length; i++) {
                    if (!APP.math.isOperator(items[i])) {
                        li = document.createElement('li');
                        li.innerHTML = "=" + items[i] + "(";
                        ul.appendChild(li);
                    }
                }
                div.appendChild(ul);
            },
            destroyBox:function() {
                document.body.removeChild(div);
                div.innerHTML = "";
                ul.innerHTML = "";
                storedElem = undefined;
            },
            updateSuggestions:function () {
                var s = storedElem.innerHTML;
                var li, items, i;
                ul.innerHTML = "";
                items = Object.keys(APP.math);
                for (i = 0; i < items.length; i++) {
                    if (!APP.math.isOperator(items[i]) && items[i].toString().indexOf(s.replace("=", "")) > -1) {
                        li = document.createElement('li');
                        li.innerHTML = "=" + items[i] + "(";
                        ul.appendChild(li);
                    }
                }
                if(ul.innerHTML === ""){
                    div.style.height = 0;
                }else {
                    div.style.removeProperty('height');
                }
            }
        };
    }
})();