
var render = (() => {
    function fragment(elements) {
        return elements.reduce(
            (fragment, option) => fragment.appendChild(option) && fragment,
            document.createDocumentFragment()
        );

    }
    return {
        option: (value, text) => {
            var option = document.createElement("option");
            option.value = value;
            option.textContent = text;
            return option;
        },
        boardSelect: (select, boards) => {
            var options = boards.map(board => render.option(board.id, board.name))
            select.appendChild(fragment(options));
        },
        lists: (container, lists) => {
            var listElements = lists.map(list => {
                listElement = document.createElement("div");
                listElement.className = "list";
                listElement.dataset.id = list.id;

                title = document.createElement("h2");
                title.textContent = list.name;
                listElement.appendChild(title);

                var cards = render.cards(list.cards)
                listElement.appendChild(fragment(cards));
                return listElement;
            });

            container.appendChild(fragment(listElements));
        },
        cards: (cards) => {
            return cards.map(card => {
                var cardElement = document.createElement("div");
                cardElement.className = "card";
                cardElement.dataset.id = card.id;
                cardElement.textContent = card.name;
                return cardElement;
            })
        }
    }
})();
