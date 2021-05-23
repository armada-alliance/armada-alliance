import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VibGF5ZXJpbyIsImEiOiJja29oMzRwYTMxMXJpMnVxcDJrczh1Zm1oIn0.lHS4NebmckI-T1NfLiwGXA'

export default function MapSection({ lat, lng, zoom = 8 }) {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.scrollZoom.disable();

        map.current.on('load', function () {

            var size = 50;

            // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
            // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
            var pointer = {
                width: size,
                height: size,
                data: new Uint8Array(size * size * 4),

                // get rendering context for the map canvas when layer is added to the map
                onAdd: function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    this.context = canvas.getContext('2d');
                },

                // called once before every frame where the icon will be used
                render: function (params) {
                    var duration = 1000;
                    var t = (performance.now() % duration) / duration;

                    var radius = (size / 2) * 0.3;
                    var outerRadius = (size / 2) * 0.7 * t + radius;
                    var context = this.context;

                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        outerRadius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(59, 214, 113,' + (1 - t) + ')';
                    context.fill();

                    // draw inner circle
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgb(59, 214, 113)';
                    context.strokeStyle = 'rgb(55, 181, 99)';
                    context.lineWidth = 2 + 4;
                    context.fill();
                    context.stroke();

                    // draw inner circle
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(59, 214, 113, 0)';
                    context.strokeStyle = 'rgb(59, 214, 113)';
                    context.lineWidth = 2 + 4;
                    context.fill();
                    context.stroke();

                    // update this image's data with data from the canvas
                    this.data = context.getImageData(
                        0,
                        0,
                        this.width,
                        this.height
                    ).data;

                    // continuously repaint the map, resulting in the smooth animation of the dot
                    map.current.triggerRepaint();

                    // return `true` to let the map know that the image was updated
                    return true;
                }
            };

            map.current.addImage('location', pointer, { pixelRatio: 2 });

            // Add a GeoJSON source with 3 points.
            map.current.addSource('location', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    features: [
                        {
                            id: 'location',
                            'type': 'Feature',
                            'properties': {
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [lng, lat]
                            }
                        }
                    ]
                }
            });
            // Add a circle layer
            map.current.addLayer({
                'id': 'location',
                'type': 'symbol',
                'source': 'location',
                'layout': {
                    'icon-image': 'location',
                    "icon-allow-overlap": true
                }
            });

            // Center the map on the coordinates of any clicked circle from the 'circle' layer.
            map.current.on('click', 'points', function (e) {
                map.current.flyTo({
                    center: e.features[0].geometry.coordinates
                });
            });

            // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
            map.current.on('mouseenter', 'points', function () {
                map.current.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.current.on('mouseleave', 'points', function () {
                map.current.getCanvas().style.cursor = '';
            });
        })
    });

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0">
            <div
                ref={mapContainer}
                className="map-container h-full"
            />
        </div>

    )
}