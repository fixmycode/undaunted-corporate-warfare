let app = new Vue({
    el: '#app',
    data: {
        selected: 'resistance',
        kind: 'deck',
        assets: null,
        item: 'back',
        ctx: null,
        style: null
    },
    created: function() {
        this.style = document.createElement('link')
        this.style.rel = 'stylesheet'
        this.selectedChanged(this.selected)
        document.head.appendChild(this.style)
    },
    methods: {
        savePng: function() {
            console.log(this.ctx)
            saveSvgAsPng(this.ctx.node, this.fileName).then((result) => {
                console.log('downloaded');
            });
        },
        loadData(value) {
            let file = `/data/${value}.json`
            fetch(file)
            .then(response => response.json())
            .then((data) => {
                this.assets = data
                console.log('assets loaded:', file)
            })
            .catch((err) => {
                this.assets = null
                console.log('error loading data:', file)
            })
        },
        generateAsset: function(config) {
            let result = document.querySelector('#result')
            if (!result) return
            result.innerHTML = ''
            this.ctx = drawAsset('#result', config)
        },
        selectedChanged(value) {
            let path = `/${value}.css`
            this.style.href = path
            console.log('stylesheet changed: ', path)
            this.loadData(value)
        }
    },
    computed: {
        notSingle() {
            return !['token', 'other'].includes(this.kind)
        },
        factionSpecific() {
            return !['terrain', 'objectives'].includes(this.selected)
        },
        assetList() {
            if (!this.assets) return []
            if (this.factionSpecific) {
                if (this.kind == 'deck') {
                    let list = Array.from(this.assets.characters)
                    list.push(this.assets.fog)
                    return list
                } else if (this.kind == 'vehicle') return this.assets.vehicles
                else if (this.kind == 'token') {
                    return this.assets.vehicles.concat(this.assets.characters.filter(c => !c.rank || c.rank == 0))
                }
            } else {
                const kind = ['front', 'back'].includes(this.kind) ? this.kind : 'front'
                return this.assets[kind]
            }
            return []
        },
        computedConfig() {
            let list = []
            if (this.item == 'all') list = this.assetList
            else if (this.item != 'back') {
                if (this.assetList[this.item]) list = [this.assetList[this.item]]
                else this.item = 0
            } else if (this.kind == 'token') {
                this.item = 0
            }
            const config = {
                kind: this.kind,
                selected: this.selected,
                back: this.item == 'back',
                list: list
            }
            this.generateAsset(config)
            return config
        },
        fileName() {
            let title = [this.selected, this.kind]
            switch(this.kind) {
                case 'deck': 
                case 'vehicle':
                    switch(this.item) {
                        case 'back': title.push('back'); break
                        case 'all': break
                        default: title.push(this.assetList[this.item].name)
                    }
                    break
                case 'token': title.push(this.assetList[this.item].name)
            }
            return title.join(' ').replaceAll(' ', '_') + '.png'
        }
    },
    watch: {
        selected(value, old) {
            this.selectedChanged(value)
        }
    }
})