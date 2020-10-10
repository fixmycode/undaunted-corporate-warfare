let app = new Vue({
    el: '#app',
    data: {
        selected: sessionStorage.getItem('selected') || 'resistance',
        horizontal: sessionStorage.getItem('horizontal') || 5,
        kind: sessionStorage.getItem('kind') || 'deck',
        back: JSON.parse(sessionStorage.getItem('back')) || false,
        cards: [{}],
        card: sessionStorage.getItem("card") || -1,
        ctx: null,
        style: null
    },
    created: function() {
        this.style = document.createElement('link')
        this.style.rel = 'stylesheet'
        document.head.appendChild(this.style)
        this.generateCards(this.selected)
    },
    methods: {
        savePng: function() {
            console.log(this.ctx)
            saveSvgAsPng(this.ctx.node, `${this.selected}_${this.kind}${this.back ? '_back':''}${this.kind == 'token' ? '_'+this.cards[this.card].name.replace(' ', '_'): ''}.png`);
        },
        generateCards: function() {
            fetch('/data/'+this.selected+'.json')
            .then(response => response.json())
            .then((doc) => {
                this.cards = Array.from(deckGenerator(doc, 'token'))
                const horizontal = this.horizontal
                if (this.ctx) this.ctx.node.parentNode.removeChild(this.ctx.node)
                let {width, height} = getDocumentSize(this.kind, doc, horizontal, this.back)
                this.ctx = SVG().addTo('#result').size(width, height)
                console.log(`generating document: ${width}x${height}px`)
                this.style.href = '/'+this.selected+'.css'
                if (this.kind == 'token') drawToken(this.ctx, this.cards[this.card], this.selected, width, height)
                else drawCardList(this.ctx, doc, this.selected, this.kind, width, height, this.back)
            })
        }
    },
    watch: {
        selected: function(newValue) {
            this.generateCards()
            sessionStorage.setItem('selected', newValue)
        },
        horizontal: function(newValue) {
            this.generateCards()
            sessionStorage.setItem('horizontal', newValue)
        },
        kind: function(newValue) {
            this.generateCards()
            sessionStorage.setItem('kind', newValue)
        },
        back: function(newValue) {
            this.generateCards()
            sessionStorage.setItem('back', newValue)
        },
        card: function(newValue) {
            this.generateCards()
            sessionStorage.setItem('card', newValue)
        }
    }
})