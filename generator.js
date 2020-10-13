const DECK_RATIO = 88/63
const DECK_WIDTH = 512
const DECK_HEIGHT = Math.floor(DECK_WIDTH*DECK_RATIO)
const WIDTH = DECK_WIDTH*8
const HEIGHT = DECK_HEIGHT*6
const VEHICLE_RATIO = 80/120
const VEHICLE_WIDTH = 908
const VEHICLE_HEIGHT = Math.floor(VEHICLE_WIDTH*VEHICLE_RATIO)
const TOKEN_SIZE = 1024
const TERRAIN_SIZE = VEHICLE_HEIGHT

const ICONS = {
    pilot: 'm -28.551797,-22.194618 6.809166,27.7591082 7.001238,4.2009585 A 17.283831,17.283831 0 0 0 -0.26917456,17.610618 17.283831,17.283831 0 0 0 13.447939,10.806906 l 8.294692,-4.9768 6.809166,-27.758498 -7.332693,6.285131 -4.846759,11.30901 A 17.283831,17.283831 0 0 0 -0.26917456,-16.957018 17.283831,17.283831 0 0 0 -16.628622,-5.1985532 L -21.219104,-15.909469 Z M -14.180549,-1.3302344 -0.26917456,3.6043568 13.642754,-1.3302344 12.377833,5.249532 -0.26917456,10.184662 -12.494721,5.249532 Z',
    crew: 'm -14.405854,-21.187864 c -0.657995,0.01029 -1.311495,0.110481 -1.942354,0.297779 l 5.408815,5.408815 -0.771629,3.842699 -3.842699,0.771629 -5.535464,-5.534846 c -0.940863,2.626138 -0.285009,5.559323 1.684733,7.5346554 1.975318,1.9702046 4.908839,2.6263203 7.535274,1.6853509 l 6.8692894,6.86928772 4.61432808,-4.61494552 -6.99531898,-6.9953185 c 0.7534442,-2.537103 0.05865,-5.2831 -1.810764,-7.156564 -1.3816925,-1.37863 -3.2626075,-2.139242 -5.2142105,-2.108542 z m 29.005585,0.0068 a 7.2213895,7.2213885 0 0 0 -5.4168467,2.100511 7.2213895,7.2213885 0 0 0 -1.6853511,7.535273 L -11.862382,7.8152456 a 7.2213895,7.2213885 0 0 0 -7.53651,1.6859687 7.2213895,7.2213885 0 0 0 0,10.2128067 7.2213895,7.2213885 0 0 0 10.2128085,0 7.2213895,7.2213885 0 0 0 1.815089,-7.161506 L 12.23851,-7.056988 a 7.2213895,7.2213885 0 0 0 7.156564,-1.8107636 7.2213895,7.2213885 0 0 0 1.810764,-7.1565634 l -5.408816,5.408815 -3.842699,-0.771629 -0.771629,-3.842699 5.534846,-5.535464 a 7.2213895,7.2213885 0 0 0 -2.117809,-0.415777 z M 5.4946344,0.95275482 0.87968838,5.5670826 7.4913554,12.178749 c -0.9410751,2.626732 -0.2846975,5.560589 1.6859688,7.535891 2.8201528,2.820275 7.3926538,2.820275 10.2128068,0 2.819863,-2.820082 2.819863,-7.392107 0,-10.2121889 C 17.516706,7.6294549 14.768129,6.9325894 12.228625,7.686745 Z M 15.530752,10.988871 l 2.454508,2.454509 -0.772246,3.842081 -3.8427,0.772247 -2.45389,-2.453891 0.772246,-3.842699 z m -30.81882,0.251444 3.842699,0.772246 0.772247,3.842082 -2.454509,2.454508 -3.842081,-0.772246 -0.772247,-3.8427 z',
    gunner: 'm -1.1998563,-18.874072 v 1.816887 c -9.3429947,0.321453 -16.8479767,7.9581566 -16.9556147,17.35331793 h -2.214042 V 2.1925602 h 2.292492 c 0.834765,8.7012038 8.032952,15.5595588 16.8771647,15.8638508 V 21.36222 H 0.69657154 V 18.01991 C 9.2307129,17.400475 16.088866,10.671915 16.902553,2.1925602 h 2.963679 V 0.29613293 H 16.981005 C 16.875935,-8.8722742 9.7246026,-16.3654 0.69657154,-17.020684 v -1.853388 z m 0,3.713859 v 3.456717 c -6.3867031,0.316374 -11.4957297,5.5606675 -11.6019257,11.99962893 h -3.457265 C -16.15241,-8.0734809 -9.5160883,-14.841948 -1.1998563,-15.160213 Z m 0,5.3575061 V 0.29613293 h -9.7055007 c 0.104531,-5.41262173 4.3471312,-9.78731173 9.7055007,-10.09884303 z m 1.89642784,0.062651 C 5.7329253,-9.1176344 9.6286016,-4.8875533 9.7287085,0.29613631 H 0.69657154 Z M -10.770247,2.1925602 h 9.5703907 V 10.802481 C -6.0570309,10.520089 -9.9973873,6.899068 -10.770247,2.1925602 Z m 11.46681854,0 H 9.594145 C 8.8573535,6.6794711 5.2410522,10.178198 0.69657154,10.73983 Z m 10.81579146,0 h 3.482868 C 14.198003,9.6413983 8.2013778,15.511978 0.69657154,16.119124 V 12.649877 C 6.2729033,12.064268 10.743325,7.7129323 11.512363,2.1925602 Z',
    star: 'm 0.000 12.000 L 14.107 19.416 11.413 3.708 22.825 -7.416 7.053 -9.708 0.000 -24.000 -7.053 -9.708 -22.825 -7.416 -11.413 3.708 -14.107 19.416 0.000 12.000 z'
}

const symbols = {
    corporation: 'm 107.17491,51.646662 c -23.617378,4.3e-5 -42.763034,19.145699 -42.763078,42.763077 4.1e-5,23.617381 19.145699,42.763041 42.763078,42.763081 23.61753,1.7e-4 42.76343,-19.14555 42.76347,-42.763081 -4e-5,-23.617531 -19.14594,-42.76325 -42.76347,-42.763077 z m 0,6.784327 c 19.87055,-7.3e-5 35.97882,16.108205 35.97875,35.97875 -0.0129,10.038251 -4.21903,19.614641 -11.60216,26.415821 l -19.01416,-22.49 23.68452,-1.436208 2.97577,1.648083 3.3065,-4.449742 -8.92731,-7.086833 -1.98398,3.296165 -19.0722,1.509349 v -9.834429 l 15.27199,-1.324111 2.97577,1.648083 3.3065,-4.449744 -8.92731,-7.087228 -1.98398,3.29656 -10.64297,1.245006 v -3.310473 l 2.62636,-4.549518 -16.195407,-7.580143 5.345337,11.51312 v 4.888991 l -13.53566,1.583685 -9.919101,-1.648479 7.935121,9.559354 4.794384,-2.142587 10.725256,-0.929779 v 9.772419 L 81.098565,94.303205 71.283612,92.672217 C 72.209669,73.517081 87.997417,58.45516 107.17491,58.430989 Z m -35.896465,34.343387 7.83614,9.439704 4.794384,-2.14219 20.387961,-1.236261 v 0.310456 L 83.133424,121.12369 c -7.583638,-6.81158 -11.921919,-16.52038 -11.936868,-26.713951 0.01489,-0.545672 0.04219,-1.090934 0.08189,-1.635363 z m 41.108795,9.294494 8.76814,16.8061 10.31423,2.02254 c -6.62606,6.09104 -15.29441,9.47743 -24.2947,9.49098 -8.880011,-0.0146 -17.440917,-3.3127 -24.035523,-9.25963 l 13.756276,-5.95432 7.401267,-7.40126 v 21.9943 l 8.22371,-6.16779 -0.13339,-20.58598 z',
    resistance: 'M -95.964844 138.63086 A 210.11172 210.11172 0 0 0 -306.07617 348.74219 A 210.11172 210.11172 0 0 0 -95.964844 558.85352 A 210.11172 210.11172 0 0 0 114.14844 348.74219 A 210.11172 210.11172 0 0 0 -95.964844 138.63086 z M -95.964844 171.96484 A 176.77669 176.77669 0 0 1 80.8125 348.74219 A 176.77669 176.77669 0 0 1 36.978516 465.05469 L -0.97460938 382.30078 L -14.646484 408.54492 L -140.39453 408.54492 L -65.544922 241.50977 L -96.974609 172.97656 L -228.20703 465.72266 A 176.77669 176.77669 0 0 1 -272.74023 348.74219 A 176.77669 176.77669 0 0 1 -95.964844 171.96484 z M -59.599609 318.21289 L -72.525391 344.38867 L -101.43359 348.58594 L -80.517578 368.95898 L -85.455078 397.72852 L -59.599609 384.14648 L -33.744141 397.72852 L -38.681641 368.95898 L -17.765625 348.58594 L -46.671875 344.38867 L -59.599609 318.21289 z M -228.03516 465.91992 L 36.171875 465.91992 A 176.77669 176.77669 0 0 1 -95.964844 525.51953 A 176.77669 176.77669 0 0 1 -228.03516 465.91992 z '
}

function drawAsset(nodeName, config) {
    const {selected, kind, list, back} = config
    const amount = back ? 1 : list.length > 1 ? list.reduce((a, b) => { return b.deck ? a + b.deck : a + 1}, 1) : 1
    const {width, height} = getDocumentSize(kind, amount)
    console.log(`generating document: ${width} x ${height} px`)
    let document = SVG().addTo(nodeName).size(width, height)
    document.rect(width, height).fill('#000')
    switch(kind) {
        case 'deck': drawCardList(document, list, selected, drawCharacter); break
        case 'vehicle': drawCardList(document, list, selected, drawVehicle); break
        case 'token': drawToken(document, list[0], selected); break
    }
    if (selected == 'terrain') drawCardList(document, list, selected, drawTerrain, kind)
    return document
}

function getDocumentSize(kind, amount) {
    let width, height
    let horizontal = 1
    if (kind == 'deck') {
        width = DECK_WIDTH
        height = DECK_HEIGHT
        horizontal = 10
    } else if (kind == 'vehicle') {
        width = VEHICLE_WIDTH
        height = VEHICLE_HEIGHT
        horizontal = 2
    } else if (kind == 'token') {
        width = height = TOKEN_SIZE
    } else {
        width = height = TERRAIN_SIZE
        horizontal = 10
    }
    let perLine = amount > horizontal ? horizontal : amount
    return {width: width*perLine, height:Math.ceil(amount/perLine)*height}
}

function drawCardList(ctx, list, selected, drawProcess, kind) {
    let x = 0, y = 0
    const imagePath = '/images/' + selected
    for (let i = 0; i < list.length; i++) {
        let elem = list[i]
        for (let j = 0; j < elem.deck || j < 1; j++) {
            elem.faction = kind
            elem.index = elem.index || i
            let card = drawProcess(ctx, elem, imagePath).move(x, y)
            x += card.width()
            if (x + card.width() > ctx.width()) {
                x = 0
                y += card.height()
            }
        }
    }
    //hidden card must be on the last slot
    if (list.length == 1) return
    let hiddenCard = drawProcess(ctx, {back: selected})
    if (hiddenCard) hiddenCard.move(ctx.width() - hiddenCard.width(), ctx.height() - hiddenCard.height())
}

function drawCharacter(ctx, card, imagePath) {
    let content = ctx.group()
    content.rect(DECK_WIDTH, DECK_HEIGHT)
    if (card.back) {
        drawCardBack(content, card.back, DECK_WIDTH, DECK_HEIGHT)
        return content
    }
    if (card.image) {
        content.add(ctx.image(`${imagePath}/${card.image}`))
    }
    content.add(initiativeGroup(ctx, card))
    content.add(nameGroup(ctx, card, DECK_WIDTH, 485))
    content.add(actionsGroup(ctx, card))
    content.attr({card: card.name})
    return content
}

function drawVehicle(ctx, card, imagePath) {
    let content = ctx.group()
    content.rect(VEHICLE_WIDTH, VEHICLE_HEIGHT)
    if (card.back) {
        drawCardBack(content, card.back, VEHICLE_WIDTH, VEHICLE_HEIGHT)
        return content
    }
    if (card.image) {
        content.add(ctx.image(imagePath + '/' + card.image))
    }
    content.add(seatsGroup(ctx, card, VEHICLE_WIDTH, 145))
    content.add(nameGroup(ctx, card, VEHICLE_WIDTH, VEHICLE_HEIGHT-90))
    content.attr({card: card.name})
    return content
}

function drawToken(ctx, card, selected) {
    const width = TOKEN_SIZE, height = TOKEN_SIZE
    console.log('drawing token: '+card.name)
    let content = ctx.group().addClass('token')
    const imagePath = `/images/${selected}/${card.image}`
    content.rect(width, height).fill('#000')
    clippedImageGroup(content, imagePath, 0, 0, width/2, width/2)
    clippedImageGroup(content, imagePath, width/2, width/2, width/2, width/2, function(img) {
        img.addClass('overlay')
    })
    drawCardBack(content, selected, width/2, width/2, 312/(1024/width)).move(width/2, 0)
    let name = card.shortName || card.name || '????'
    let nameGroup = tokenNameGroup(content, name, 73).move(0, width/2)
    content.add(nameGroup.clone().dy(nameGroup.height()).addClass('suppressed'))
    let overlay = tokenOverlayGroup(content, card, 120/(1024/width))
    overlay.cx(width/4).y(width/2-overlay.height()*1.2)
    content.add(overlay.clone().dmove(width/2,width/2).addClass('suppressed'))
}

function drawCardBack(ctx, selected, width, height, symbolSize) {
    let content = ctx.group().addClass('back')
    let back = content.rect(width, height)
    content.path(symbols[selected]).size(symbolSize || 320).center(back.cx(), back.cy())
    return content
}

function drawTerrain(ctx, tile, imagePath) {
    if (tile.back) return
    let content = ctx.group().addClass('terrain')
    let frame = content.rect(TERRAIN_SIZE, TERRAIN_SIZE)
    const div = 7
    for (let i = 0; i < div-1; i++) {
        content.line(0, (i+1)*frame.height()/div, frame.width(), (i+1)*frame.height()/div)
        content.line((i+1)*frame.width()/div, 0, (i+1)*frame.width()/div, frame.height())
    }
    let defenseGroup = content.group().addClass('defense')
    shieldGroup(defenseGroup, tile.defense, false, 90)
    if (tile.height) {
        let hill = shieldGroup(defenseGroup, tile.height, false, 90).addClass('hill')
        hill.x(hill.width()*.45).backward()
    }
    defenseGroup.cx(content.cx()).y(content.height()-defenseGroup.height()-50)
    console.log(tile)
    let tileId = content.text((tile.index + 1).toString() + (tile.faction == 'front' ? 'A': 'B')).leading(0)
    tileId.move(frame.width() - tileId.bbox().width - 10, frame.height() - tileId.bbox().height)
    return content
}

function squadLetter(ctx, letter, size) {
    let content = ctx.group().addClass('squad').addClass(letter)
    let background = content.circle(size).addClass('background')
    let letterText = content.text(letter.toUpperCase()).leading(0)
    letterText.center(background.cx(), background.cy()-(2*size/65))
    if (letter == 'm') letterText.dy(2*size/65)
    content.circle(56*size/65).addClass('foreground').center(background.cx(), background.cy())
    return content
}

function initiativeGroup(ctx, card) {
    let group = ctx.group().addClass('rank')
    let init_box = group.path('M 0 0 h 84 v 84 l -42 24 -42 -24 v -84 z')
    init_box.center(0, 0)
    let initiative = card.initiative ? card.initiative.toString() : '?'
    let init_text = group.text(initiative).leading(0)
    init_text.center(0, 0)
    let letter
    if (card.squad) {
        letter = squadLetter(group, card.squad, 65).cx(init_box.cx()).y(init_box.height()-50)
    }
    if (card.rank && card.rank > 0) {
        let rank_chevron = group.path('M 0 0 l 42 24 42 -24 v 30 l -42 24 -42 -24 v 30 z')
        rank_chevron.center(0, 0).dy(67)
        if (letter) letter.dy(rank_chevron.height()-20)
    }
    group.move(34, 0)
    return group
}

function nameGroup(ctx, card, w, y) {
    let group = ctx.group().addClass('name')
    group.rect(w, 90).addClass('box')
    let name_text = group.text(card.name.toUpperCase())
        .addClass('big')
        .leading(0)
        .move(w*.97, 7)
    name_text.dmove(-name_text.bbox().width, 0)
    let char_text = group.text(card.character || card.quote || card.vehicle || '')
        .addClass('small')
        .leading(0)
        .move(w*.97, -5)
    char_text.dmove(-char_text.bbox().width, name_text.bbox().height)
    if (card.rank > 0) {
        let star = group.path(ICONS['star'])
        star.addClass('icon')
            .move(w,14).dx(-70-name_text.bbox().width)
    } else if (card.icon) {
        let icon = group.path(ICONS[card.icon])
        icon.addClass('icon')
            .move(w, name_text.y()+name_text.bbox().height/2).dmove(-25-icon.width()-name_text.bbox().width, -3-icon.height()/2)
    }
    if (card.vehicle) {
        let shield = shieldGroup(group, card.wounds, card.heavy && !card.defense).x(20).cy(group.cy()+15)
        let threshold = group.circle(55).addClass('threshold')
            threshold.x(shield.x()+shield.width()+20).cy(shield.cy()+2)
        let thresholdValue = group.text(card.threshold.toString()).leading(0).addClass('threshold')
            thresholdValue.center(threshold.cx(), threshold.cy()+2)
    }
    group.move(0, y)
    return group
}

function shieldGroup(ctx, value, heavy, size) {
    let group = ctx.group()
    let shield = group.path('M 0,-32 24,-19 c 0,0 0,32 -25,48 C -25,13 -25,-18 -25,-18 Z')
    if (size) shield.size(size)
    shield.addClass('shield')
    if (heavy) {
        let heavy = shield.clone().addClass('heavy').scale(.88)
        group.add(heavy)
    }
    let armorValue = group.text(value.toString()).leading(0).addClass('shield')
    armorValue.center(shield.cx(), shield.cy()+armorValue.bbox().height*.05)
    return group
}

function actionCircles(ctx, action) {
    let group = ctx.group()
    let circle = null
    if (action.normal || action.armored) {
        circle = group.circle(40)
        if (action.armored) {
            let armored = group.circle(34).addClass('armored')
            armored.center(circle.cx(), circle.cy())
        }
        let value = action.normal || action.armored
        let value_text = group.text(value.toString()).addClass('value').leading(0)
        value_text.center(circle.cx(), circle.cy()+1)
    }
    if (action.structure || action.squad) {
        let s_circle = group.circle(39)
            .addClass('secondary')
        s_circle.cy(circle.cy()).dx(30)
        if (action.structure) {
            s_circle.addClass('structure')
            s_circle.backward().backward().backward()
        }
        let value = action.structure || action.squad
        let value_text = group.text(value.toString()).addClass('value').addClass('secondary').leading(0)
        value_text.center(s_circle.cx(), s_circle.cy()+1)
    }
    return group
}

function actionLabel(ctx, action) {
    let label = ctx.group().addClass('action')
    let action_text = label.text(action.name)
    if (action.normal || action.armored || action.squad) {
        let circle = actionCircles(label, action)
        circle.cy(action_text.bbox().height-2)
        circle.x(action_text.bbox().width + 10)
    }
    return label
}

function actionsGroup(ctx, card) {
    let content = ctx.group().addClass('actions')
    const w = 512, h = 140
    content.rect(w, h).addClass('box')
    if (card.actions) {
        const hor = w/4, ver = h/4
        const positions = card.actions.length > 2 ? [{x: hor, y: ver}, {x: hor*3, y: ver}, {x: hor, y: ver*3}, {x: hor*3, y: ver*3}] : [{x: hor*2, y: ver}, {x: hor*2, y: ver*3}]
        let pos = 0
        for (const action of card.actions) {
            let action_group = actionLabel(content, action)
            let coords = positions[pos]
            action_group.center(coords.x, coords.y)
            pos += 1
        }
        content.line(0, ver*2, w, ver*2).stroke({width: 1}).addClass('main-stroke')
        if (card.actions.length > 2) {
            content.line(hor*2, 0, hor*2, h).stroke({width: 1}).addClass('main-stroke')
        }
    }
    content.move(0, 575)
    return content
}

function seatGroup(ctx, seat, diameter, x) {
    let content = ctx.group().addClass('seat')
    let circle = content.circle(diameter).fill('red')
    if (seat.icon) {
        let icon = content.path(ICONS[seat.icon]).addClass('icon')
        icon.center(circle.cx(), circle.cy()).scale(2)
    }
    if (seat.actions) {
        let y = diameter+5
        for (const action of seat.actions) {
            let actionGroup = actionLabel(content, action)
            actionGroup.y(y).cx(circle.cx())
            y += actionGroup.height() + 5
        }
    }
    content.x(x)
    return content
}

function seatsGroup(ctx, card, w, y) {
    let content = ctx.group().addClass('seats')
    let diameter = 252
    let spacing = (w-diameter*3)/4
    let x = 0
    for(let seat of card.seats) {
        content.add(seatGroup(content, seat, diameter, x))
        x += spacing+diameter
    }
    content.move(spacing, y)
    return content
}

function clippedImageGroup(ctx, path, x, y, w, h, callback) {
    let content = ctx.group().addClass('clipImage')
    let image = content.image(path, function(ev) {
        let picture = ev.target
        let clipRect = content.rect(w, h).move(x, y)
        if (picture.naturalWidth >= ev.target.naturalHeight) {
            if (w >= h) image.size(null, h).y(y).cx(clipRect.cx())
            else image.size(w).x(x).cy(clipRect.cy())
        } else {
            if (w >= h) image.size(w).x(x).y(y)
            else image.size(null, h).y(y).cx(clipRect.cx())
        }
        image.clipWith(clipRect)
        if (callback) callback(image, clipRect)
    })
}

function tokenOverlayGroup(ctx, card, height) {
    let content = ctx.group()
    let shield = shieldGroup(content, card.defense || card.heavy || '???', !card.defense && card.heavy, height)
    if (card.vehicle && card.defense) {
        let heavyShield = shieldGroup(content, card.heavy, true, height).x(height*1.2)
    }
    if (card.character && card.squad) {
        let letter = squadLetter(content, card.squad, height+10).x(shield.x() + height*1.2).cy(shield.cy())
    }
    return content
}

function tokenNameGroup(ctx, name, height) {
    let content = ctx.group().addClass('name')
    let box = content.rect(TOKEN_SIZE/2, height)
    content.text(name.toUpperCase()).leading(0).center(box.cx(), box.cy()+5)
    return content
}