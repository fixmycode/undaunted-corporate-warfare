let app = new Vue({
    el: '#app',
    data: {
        selected: sessionStorage.getItem('selected') || 'resistance',
        ctx: null,
        style: null
    },
    created: function() {
        this.ctx = SVG().addTo('#result').size(WIDTH, HEIGHT)
        this.style = document.createElement('link')
        this.style.rel = 'stylesheet'
        document.head.appendChild(this.style)
        this.generateCards(this.selected)
    },
    methods: {
        savePng: function() {
            console.log(this.ctx)
            saveSvgAsPng(this.ctx.node, selected+'_deck.png');
        },
        generateCards: function(list) {
            fetch('/data/'+list+'.json')
            .then(response => response.json())
            .then((doc) => {
                this.style.href = '/'+list+'.css'
                readCardList(this.ctx, doc, list)
            })
        }
    },
    watch: {
        selected: function(newValue) {
            this.ctx.node.parentNode.removeChild(this.ctx.node)
            this.ctx = SVG().addTo('#result').size(WIDTH, HEIGHT)
            this.generateCards(newValue)
            sessionStorage.setItem('selected', newValue)
        }
    }
})