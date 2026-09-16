var hashedPoints = new Set()
var repairPoints = new Set()
var upgradePoints = new Set()
references.markers = []

const MARK_STROKE_WEIGHT = 5

const MARK_TYPES = [
    { id: 'hash', label: 'Hash', points: hashedPoints, color: '#ff0000', fillOpacity: 0.25, radius: 20, button: information_hash_button },
    { id: 'repair', label: 'Repair', points: repairPoints, color: '#00cc44', fillOpacity: 0.25, radius: 24, button: information_repair_button },
    { id: 'upgrade', label: 'Upgrade', points: upgradePoints, color: '#2288ff', fillOpacity: 0.25, radius: 28, button: information_upgrade_button },
]

function updateMarkVisuals(pointindex) {
    let ref = references.markers[pointindex]
    if (!ref) return
    if (!ref.markCircles) ref.markCircles = {}

    for (let mark of MARK_TYPES) {
        if (ref.markCircles[mark.id]) {
            ref.layerGroup.removeLayer(ref.markCircles[mark.id])
            ref.markCircles[mark.id] = null
        }
    }

    let activeMarks = MARK_TYPES.filter(mark => mark.points.has(pointindex))
    for (let mark of activeMarks) {
        ref.markCircles[mark.id] = L.circleMarker(ref.marker.getLatLng(), {
            radius: mark.radius,
            color: mark.color,
            weight: MARK_STROKE_WEIGHT,
            fillColor: mark.color,
            fillOpacity: mark.fillOpacity,
            interactive: false
        })
        ref.markCircles[mark.id].addTo(ref.layerGroup)
    }

    ref.marker.getElement()?.classList.toggle('hashed-marker', hashedPoints.has(pointindex))
}

function updateMarkButtons(pointindex) {
    information_mark_buttons.classList.remove('hidden')
    for (let mark of MARK_TYPES) {
        let isMarked = mark.points.has(pointindex)
        mark.button.textContent = isMarked ? `Unmark ${mark.label}` : `Mark for ${mark.label}`
        mark.button.classList.toggle('marked', isMarked)
    }
}

function toggleMark(markId, pointindex) {
    let mark = MARK_TYPES.find(entry => entry.id === markId)
    if (!mark) return

    if (mark.points.has(pointindex)) {
        mark.points.delete(pointindex)
    } else {
        mark.points.add(pointindex)
    }
    updateMarkVisuals(pointindex)
    updateMarkButtons(pointindex)
    updatePlanRoute()
}

function segmentColorForNode(pointindex) {
    if (hashedPoints.has(pointindex)) return MARK_TYPES[0].color
    if (repairPoints.has(pointindex)) return MARK_TYPES[1].color
    if (upgradePoints.has(pointindex)) return MARK_TYPES[2].color
    return MARK_TYPES[0].color
}

function distanceSquared(markerA, markerB) {
    let dx = markerA.xPos - markerB.xPos
    let dy = markerA.yPos - markerB.yPos
    return dx * dx + dy * dy
}

function getAlphaIndex() {
    return markers.findIndex(data => data.name === 'Alpha' && data.category === 'Satellite Dishes')
}

function getMarkedSatelliteIndices() {
    let visitIndices = new Set()
    for (let mark of MARK_TYPES) {
        for (let pointindex of mark.points) {
            if (markers[pointindex].category === 'Satellite Dishes') {
                visitIndices.add(pointindex)
            }
        }
    }
    return visitIndices
}

function computePlanRoute() {
    let alphaIndex = getAlphaIndex()
    if (alphaIndex === -1) return []

    let visitIndices = getMarkedSatelliteIndices()
    visitIndices.add(alphaIndex)

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

var planRouteLayer = null

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

function addRouteArrow(from, to, color, layerGroup) {
    let fromMarker = markers[from]
    let toMarker = markers[to]
    if (fromMarker.xPos === toMarker.xPos && fromMarker.yPos === toMarker.yPos) return

    let position = convertGameToLeaflet([(fromMarker.xPos + toMarker.xPos) / 2, (fromMarker.yPos + toMarker.yPos) / 2])
    let angle = segmentArrowAngle(fromMarker, toMarker)
    L.polygon(arrowPolygonLatLngs(position, angle, 8), {
        color: color,
        weight: 1,
        fillColor: color,
        fillOpacity: 1,
        interactive: false
    }).addTo(layerGroup)
}

function updatePlanRoute() {
    if (planRouteLayer) {
        map.removeLayer(planRouteLayer)
        planRouteLayer = null
    }

    let route = computePlanRoute()
    if (route.length < 2) return

    planRouteLayer = L.layerGroup()
    for (let i = 0; i < route.length - 1; i++) {
        let from = route[i]
        let to = route[i + 1]
        let color = segmentColorForNode(to)
        let coordinates = [
            convertGameToLeaflet([markers[from].xPos, markers[from].yPos]),
            convertGameToLeaflet([markers[to].xPos, markers[to].yPos])
        ]
        L.polyline(coordinates, {
            smoothFactor: 0,
            color: color,
            weight: MARK_STROKE_WEIGHT,
            lineCap: 'round',
            lineJoin: 'round',
            interactive: false
        }).addTo(planRouteLayer)
        addRouteArrow(from, to, color, planRouteLayer)
    }
    planRouteLayer.addTo(map)
}

function mapClickEvent() {
    // Reset information text when user clicks off a point
    information_content.dataset.viewedindex = 'none'
    information_header.innerHTML = 'Select a Point'
    information_coords.innerHTML = ''
    information_mark_buttons.classList.add('hidden')
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
    updateMarkButtons(this.options.pointindex)
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
        markCircles: {},
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

for (let mark of MARK_TYPES) {
    mark.button.addEventListener('click', () => {
        if (information_content.dataset.viewedindex == 'none') return
        toggleMark(mark.id, Number(information_content.dataset.viewedindex))
    })
}

map.on('click', mapClickEvent)
mapClickEvent() // Setup points panel

