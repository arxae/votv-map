var hashedPoints = new Set()
references.markers = []

function updateHashVisuals(pointindex) {
    let ref = references.markers[pointindex]
    if (!ref) return

    if (hashedPoints.has(pointindex)) {
        if (!ref.hashCircle) {
            ref.hashCircle = L.circleMarker(ref.marker.getLatLng(), {
                radius: 20,
                color: '#ff0000',
                weight: 3,
                fillColor: '#ff0000',
                fillOpacity: 0.15,
                interactive: false
            })
            ref.hashCircle.addTo(ref.layerGroup)
        }
        ref.marker.getElement()?.classList.add('hashed-marker')
    } else {
        if (ref.hashCircle) {
            ref.layerGroup.removeLayer(ref.hashCircle)
            ref.hashCircle = null
        }
        ref.marker.getElement()?.classList.remove('hashed-marker')
    }
}

function updateHashButton(pointindex) {
    information_hash_button.classList.remove('hidden')
    if (hashedPoints.has(pointindex)) {
        information_hash_button.textContent = 'Unmark Hash'
        information_hash_button.classList.add('hashed')
    } else {
        information_hash_button.textContent = 'Mark for Hash'
        information_hash_button.classList.remove('hashed')
    }
}

function toggleHash(pointindex) {
    if (hashedPoints.has(pointindex)) {
        hashedPoints.delete(pointindex)
    } else {
        hashedPoints.add(pointindex)
    }
    updateHashVisuals(pointindex)
    updateHashButton(pointindex)
    updateHashRoute()
}

function distanceSquared(markerA, markerB) {
    let dx = markerA.xPos - markerB.xPos
    let dy = markerA.yPos - markerB.yPos
    return dx * dx + dy * dy
}

function getAlphaIndex() {
    return markers.findIndex(data => data.name === 'Alpha' && data.category === 'Satellite Dishes')
}

function computeHashRoute() {
    let alphaIndex = getAlphaIndex()
    if (alphaIndex === -1) return []

    let visitIndices = new Set([alphaIndex])
    for (let pointindex of hashedPoints) {
        if (markers[pointindex].category === 'Satellite Dishes') {
            visitIndices.add(pointindex)
        }
    }

    if (visitIndices.size <= 1) return []

    let unvisited = new Set(visitIndices)
    let route = [alphaIndex]
    unvisited.delete(alphaIndex)
    let current = alphaIndex

    while (unvisited.size > 0) {
        let nearest = null
        let nearestDist = Infinity
        for (let index of unvisited) {
            let dist = distanceSquared(markers[current], markers[index])
            if (dist < nearestDist) {
                nearestDist = dist
                nearest = index
            }
        }
        route.push(nearest)
        unvisited.delete(nearest)
        current = nearest
    }
    route.push(alphaIndex)
    return route
}

var hashRouteLayer = null

function segmentArrowAngle(fromMarker, toMarker) {
    let from = convertGameToLeaflet([fromMarker.xPos, fromMarker.yPos])
    let to = convertGameToLeaflet([toMarker.xPos, toMarker.yPos])
    let dLat = to[0] - from[0]
    let dLng = to[1] - from[1]
    return Math.atan2(dLng, dLat) * 180 / Math.PI
}

function arrowPolygonLatLngs(center, angleDeg, size) {
    let rad = angleDeg * Math.PI / 180
    let tip = [
        center[0] + Math.cos(rad) * size,
        center[1] + Math.sin(rad) * size
    ]
    let backRad = rad + Math.PI
    let baseCenter = [
        center[0] + Math.cos(backRad) * size * 0.65,
        center[1] + Math.sin(backRad) * size * 0.65
    ]
    let wing = size * 0.5
    let left = [
        baseCenter[0] + Math.cos(rad + Math.PI / 2) * wing,
        baseCenter[1] + Math.sin(rad + Math.PI / 2) * wing
    ]
    let right = [
        baseCenter[0] + Math.cos(rad - Math.PI / 2) * wing,
        baseCenter[1] + Math.sin(rad - Math.PI / 2) * wing
    ]
    return [tip, left, right]
}

function addHashRouteArrows(route, layerGroup) {
    for (let i = 0; i < route.length - 1; i++) {
        let from = markers[route[i]]
        let to = markers[route[i + 1]]
        if (from.xPos === to.xPos && from.yPos === to.yPos) continue

        let position = convertGameToLeaflet([(from.xPos + to.xPos) / 2, (from.yPos + to.yPos) / 2])
        let angle = segmentArrowAngle(from, to)
        L.polygon(arrowPolygonLatLngs(position, angle, 8), {
            color: '#cc0000',
            weight: 1,
            fillColor: '#ff0000',
            fillOpacity: 1,
            interactive: false
        }).addTo(layerGroup)
    }
}

function updateHashRoute() {
    if (hashRouteLayer) {
        map.removeLayer(hashRouteLayer)
        hashRouteLayer = null
    }

    let route = computeHashRoute()
    if (route.length < 2) return

    hashRouteLayer = L.layerGroup()
    let coordinates = route.map(pointindex => convertGameToLeaflet([markers[pointindex].xPos, markers[pointindex].yPos]))
    let routeLine = L.polyline(coordinates, {
        smoothFactor: 0,
        color: '#ff0000',
        weight: 2,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false
    })
    routeLine.addTo(hashRouteLayer)
    addHashRouteArrows(route, hashRouteLayer)
    hashRouteLayer.addTo(map)
    routeLine.bringToBack()
}

function mapClickEvent() {
    // Reset information text when user clicks off a point
    information_content.dataset.viewedindex = 'none'
    information_header.innerHTML = 'Select a Point'
    information_coords.innerHTML = ''
    information_hash_button.classList.add('hidden')
    information_text.innerHTML = 'Click on a point on the map to see some information about what it is and where it\'s located, along with some additional pictures that can help you pinpoint <i>exactly</i> where it is and what it looks like.<br><br>Use the <i>Points</i> tab to hide and show certain points on the map.'
    information_images.replaceChildren()
}

function pointClickEvent() {
    // Update information text when point is clicked, and focus on info tab
    selectTab('panetabs')
    if (this.options.pointindex == information_content.dataset.viewedindex) {
        // we've already selected this marker, no need to update
        return
    }
    information_content.dataset.viewedindex = this.options.pointindex
    let data = markers[this.options.pointindex]
    information_header.innerHTML = data.name
    information_coords.innerHTML = `x: <u>${data.xPos}</u>, y: <u>${data.yPos}</u>`
    information_text.innerHTML = data.description
    information_images.replaceChildren()
    if (data.related_images && data.related_images.length) {
        data.related_images.forEach((link, imageindex) => {
            let element = document.createElement('img')
            element.src = link
            element.onclick = function() { previewImage(element) }
            element.classList.add('information_image')
            element.dataset.pointindex = this.options.pointindex
            element.dataset.imageindex = imageindex
            information_images.appendChild(element)
        })
    }
    updateHashButton(this.options.pointindex)
}

function toggleCategoryButton() {
    // Parse and pass information to function
    setCategoryVisibility(this.dataset.id, !parseInt(this.dataset.visible), {button: this})
}

function setCategoryVisibility(categoryname, setting, {button=undefined, updatestorage=true}) {
    // Hide or show layer and change visibility button (button must exist in the page)
    // if (button == undefined) button = references[categoryname].menuparent.querySelector('.category_parentbutton')
    let layer = references[categoryname].leafletgroup
    if (setting) {
        layer.addTo(map)
        button.classList.add('highlighted_element')
        button.dataset.visible = 1
    } else {
        map.removeLayer(layer)
        button.classList.remove('highlighted_element')
        button.dataset.visible = 0
    }
    // Update storage
    if (updatestorage && Boolean(setting) != settings.settings[`${categoryname}_visible`]) {
        settings.settings[`${categoryname}_visible`] = Boolean(setting)
        pushToStorage()
    }
    syncWidgets()
}

function categoryVisibilityCallback(settings_id, value) {
    if (settings[settings_id.replace('_visible', '')] != undefined) { // Sanity Check
        setCategoryVisibility(settings_id.replace('_visible', ''), value, {updatestorage: false})
    }
}

// Create markers and categories for each when nessessary
var markerzoffset = 0
markers.forEach((data, pointindex) => {
    // If the icon hasn't been loaded before, load it into ref.icons
    if (!references.icons[data.icon]) {
        references.icons[data.icon] = L.icon({
            iconUrl: data.icon,
            iconSize: [24, 24]
        })
    }

    let categoryid = data.category ? data.category : 'miscellaneous'
    let categoryname = categories[categoryid] && categories[categoryid].displayname ? categories[categoryid].displayname : categoryid
    let formattedid = `category_${sanitizeString(categoryid)}`
    if (!references[formattedid]) {
        // Prepare settings
        let categoryvisible = (formattedid == 'category_satellite_dishes' || formattedid == 'category_transformers' || formattedid == 'category_points_of_interest' || formattedid == 'category_cr') // The default shown/hidden categories
        let setting_id = `${formattedid}_visible`
        registerSetting(setting_id, categoryvisible, 'boolean', {callback: categoryVisibilityCallback})
        if (settings.settings[setting_id] != undefined) {
            categoryvisible = settings.settings[setting_id]
        }

        // Create generic category container element
        let categorybutton = document.createElement('button')
        categorybutton.title = categoryname
        categorybutton.classList.add('points_categorybutton')
        categorybutton.classList.add('highlight_on_hover')
        categorybutton.dataset.id = formattedid
        categorybutton.addEventListener('click', toggleCategoryButton)
        if (!categoryvisible) {
            categorybutton.dataset.visible = 0
        } else {
            categorybutton.classList.add('highlighted_element')
            categorybutton.dataset.visible = 1
        }

        // Icon
        let categoryicon = document.createElement('img')
        //categoryicon.src = '../icons/glowing_cyan_argemia.png'
        categoryicon.src = (categories[categoryid] && categories[categoryid].icon ? categories[categoryid].icon : data.icon)
        // categoryicon.src = 'new-points/autogenerated/1085967092072845463.webp'
        categoryicon.classList.add('points_catbuttonimg')
        categorybutton.appendChild(categoryicon)

        // Text label
        let categorylabel = document.createElement('span')
        categorylabel.innerHTML = categoryname
        categorylabel.classList.add('points_catbuttonlabel')
        categorybutton.appendChild(categorylabel)

        // Add references
        references[formattedid] = {
            'element': categorybutton,
            'leafletgroup': L.layerGroup()
        }

        // Group stuff
        let groupname = categories[categoryid] && categories[categoryid].group ? categories[categoryid].group : 'Miscellaneous'
        let groupid = sanitizeString(groupname)
        if (!references[`categorygroup_${groupid}`]) {
            // Create group header
            let groupheader = document.createElement('div')
            groupheader.innerHTML = groupname
            groupheader.classList.add('points_groupheader')
            information_points.appendChild(groupheader)

            // Create group container
            let groupcontainer = document.createElement('div')
            groupcontainer.id = `categorygroup_${groupid}`
            groupcontainer.classList.add('points_categorygroup')
            information_points.appendChild(groupcontainer)

            // Add group to references
            references[`categorygroup_${groupid}`] = {
                'element': groupcontainer
            }
        }
        references[`categorygroup_${groupid}`].element.appendChild(categorybutton)

        // layercontrol.addOverlay(references[categoryname].leafletgroup, categoryname) //DEBUG
        if (categoryvisible) references[formattedid].leafletgroup.addTo(map)
    }

    // Create the marker
    let marker = L.marker(
        convertGameToLeaflet([data.xPos,data.yPos]), 
        {
            icon: references.icons[data.icon],
            'zIndexOffset': markerzoffset,
            'pointindex': pointindex
        }
    )
    markerzoffset += 1
    // Bind click event, add popup, add to category layer
    marker.on('click', pointClickEvent)
    if (settings.settings.marker_popup_labels != undefined && settings.settings.marker_popup_labels == true) {
        marker.bindPopup(L.popup({ // Make enable/disableable in user settings?
            'content': data.name,
            'offset': [0,3],
            'autoPan': false
        }))
    }
    marker.addTo(references[formattedid].leafletgroup)
    references.markers[pointindex] = {
        marker: marker,
        hashCircle: null,
        layerGroup: references[formattedid].leafletgroup
    }
})

// Sync UI
syncWidgets()

// Create lines
lines.forEach((data, lineindex) => {
    let categoryid = data.category ? data.category : 'miscellaneous'
    let polygon = L.polyline(data.coordinates.map(convertGameToLeaflet),
        {
            'smoothFactor': 0.5,
            'color': data.color,
            'weight': data.linethickness,
            'lineCap': 'square',
            'lineJoin': 'miter',
            'fill': Boolean(data.fill),
            'fillColor': data.fill,
            'interactive': false
        }
    )
    if (data.category) {
        // limitation: the line can only add itself to layers that already exist, otherwise it will error
        polygon.addTo(references[`category_${sanitizeString(categoryid)}`].leafletgroup)
    } else {
        polygon.addTo(map)
    }
})

information_hash_button.addEventListener('click', () => {
    if (information_content.dataset.viewedindex == 'none') return
    toggleHash(Number(information_content.dataset.viewedindex))
})

map.on('click', mapClickEvent)
mapClickEvent() // Setup points panel

