let app = new Vue({
    el: '#app',
    data: {
        selected: 'resistance',
        kind: 'deck',
        assets: {},
        item: 'back',
        ctx: null,
        style: null
    },
    created: function() {
        this.loadStyle().then((link) => {
            this.style = link
        })
        this.loadData()
    },
    methods: {
        savePng: function() {
            console.log(this.ctx)
            saveSvgAsPng(this.ctx.node, this.fileName).then((result) => {
                console.log('downloaded');
            });
        },
        async loadData() {
            let file = `/data/${this.selected}.json`
            if (this.assets[this.selected]) return this.assets[this.selected]
            try {
                const response = await fetch(file)
                const data = await response.json()
                this.$set(this.assets, this.selected, data)
                console.log('assets loaded:', file)
                return data
            } catch (err) {
                this.$set(this.assets, this.selected, null)
                console.log('error loading data:', file)
                return err
            }
        },
        async generateAsset() {
            const config = this.config
            await this.loadStyle()
            await this.loadData()
            let result = document.querySelector('#result')
            if (result) result.innerHTML = ''
            for (const key in config) {
                if (config[key] === null) return
            }
            this.ctx = drawAsset('#result', config)
            console.log('assets generated')
        },
        loadStyle() {
            return new Promise((resolve, reject) => {
                let path = `/style/${this.selected}.css`
                let style = this.style || document.createElement('link')
                style.type = 'text/css'
                style.rel = 'stylesheet'
                style.addEventListener('load', (ev) => {
                    console.log('stylesheet changed: ', path)
                    resolve(style)
                })
                style.addEventListener('error', (ev) => {
                    reject(ev)
                })
                style.href = path
                document.head.appendChild(style)
            })
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
            if (!this.assets[this.selected]) return []
            const assetObject = this.assets[this.selected]
            if (this.factionSpecific) {
                if (this.kind == 'deck') {
                    let list = Array.from(assetObject.characters)
                    list.push(assetObject.fog)
                    return list
                } else if (this.kind == 'vehicle') return assetObject.vehicles
                else if (this.kind == 'token') {
                    return assetObject.vehicles.concat(assetObject.characters.filter(c => !c.rank || c.rank == 0))
                }
            } else {
                const kind = ['front', 'back'].includes(this.kind) ? this.kind : 'front'
                return assetObject[kind]
            }
            return []
        },
        config() {
            let list = []
            if (this.item == 'all') list = this.assetList
            else if (this.item != 'back') {
                if (this.assetList[this.item]) {
                    let elem = this.assetList[this.item]
                    elem.index = this.item
                    list = [elem]
                }
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
    }
})