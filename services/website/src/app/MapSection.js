import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import mapboxgl from 'mapbox-gl'
import cx from 'classnames'
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VibGF5ZXJpbyIsImEiOiJja29oMzRwYTMxMXJpMnVxcDJrczh1Zm1oIn0.lHS4NebmckI-T1NfLiwGXA'

import numeral from 'numeral'

const toAda = (input, end = false) => numeral(input / 1000000).format('0,0a');


let tooltipContainer = null

function PoolInfo({ pool }) {
    return (
        <div className="text-white text-center">
            <div className="space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full lg:w-20 lg:h-20 shadow border relative border-gray-200 bg-white">
                    <div className={cx("absolute top-2 left-2 right-2 bottom-2 bg-center bg-cover rounded-full", pool.adapools.data.handles.icon ? "opacity-100" : "opacity-20")} style={{ backgroundImage: `url(${pool.icon})` }}></div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                        <h3>{pool.ticker}</h3>
                        <div className="text-xs">{toAda(pool.adapools.data.total_stake)} ₳ / {toAda(pool.adapools.data.pledge)} ₳</div>
                        <div className="text-xs text-gray-400">Joined {moment(pool.memberSince).format('YYYY-MM-DD')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class Tooltip extends React.Component {
    render() {

        const feature = this.props.features.find(feature => {
            return feature.properties && feature.properties.type === 'pool'
        })

        const pool = JSON.parse(feature.properties.data)

        return (
            <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom-0">
                <div className="flex-child px-6 py-6 bg-gray-700 text-white shadow-md rounded-lg w-60">
                    <PoolInfo
                        pool={pool}
                    />
                </div>
                <span className="flex-child text-gray-700 triangle triangle--d"></span>
            </div>
        );
    }
}

function setTooltip(features) {

    const feature = features.find(feature => {
        return feature.properties && feature.properties.type === 'pool'
    })

    if (feature) {
        ReactDOM.render(
            React.createElement(
                Tooltip, {
                features
            }),
            tooltipContainer
        );
    } else {
        ReactDOM.unmountComponentAtNode(tooltipContainer)
    }
}

export default function MapSection({ pools: allPools }) {

    const pools = allPools.filter(pool => !pool.errors.length)

    const bounds = pools
        .filter(
            pool => pool.location
        )
        .reduce((result, pool) => {
            result.extend(pool.location)
            return result
        }, new mapboxgl.LngLatBounds())

    const pools_with_location = pools
        .filter(
            pool => pool.location
        )

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        tooltipContainer = document.createElement('div')

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            // style: 'mapbox://styles/sublayerio/ckpdyzif95fvl17o7f9hkr8gf',
            // center: [lng, lat],
            // zoom: zoom
        });
        // map.current.scrollZoom.disable();

        map.current.fitBounds(bounds, { padding: 200 });

        // Container to put React generated content in.
        tooltipContainer = document.createElement('div');

        const tooltip = new mapboxgl.Marker(tooltipContainer, {
            offset: [-120, 0]
        }).setLngLat([0, 0]).addTo(map.current);

        map.current.on('mousemove', (e) => {
            const features = map.current.queryRenderedFeatures(e.point);
            tooltip.setLngLat(e.lngLat);
            map.current.getCanvas().style.cursor = features.length ? 'pointer' : '';
            setTooltip(features);
        });

        let imagesByPoolId = {}
        pools_with_location.forEach((pool) => {
            const img = new Image()
            img.crossOrigin = "Anonymous";
            img.src = pool.icon;
            img.onload = () => {
                imagesByPoolId[pool.id] = img
            }
        })

        map.current.on('load', function () {

            pools_with_location.forEach(pool => {

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

                        // const img = imagesByPoolId[pool.id]

                        // if (img) {
                        //     context.save();
                        //     context.beginPath();
                        //     context.arc(
                        //         this.width / 2,
                        //         this.height / 2,
                        //         radius,
                        //         0,
                        //         Math.PI * 2
                        //     );
                        //     context.closePath();
                        //     context.clip();

                        //     if (!pool.adapools.data.handles.icon) {
                        //         context.globalAlpha = 0.2;
                        //     }
                        //     context.drawImage(img, 80, 80, 40, 40);

                        //     context.beginPath();
                        //     context.arc(
                        //         this.width / 2,
                        //         this.height / 2,
                        //         radius,
                        //         0,
                        //         Math.PI * 2
                        //     );
                        //     context.clip();
                        //     context.closePath();
                        //     context.restore();
                        // }

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

                map.current.addImage(pool.id, pointer, { pixelRatio: 2 });

                // Add a GeoJSON source with 3 points.
                map.current.addSource(pool.id, {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        features: [
                            {
                                id: pool.id,
                                'type': 'Feature',
                                'properties': {
                                    type: 'pool',
                                    data: JSON.stringify(pool)
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': pool.location
                                }
                            }
                        ]
                    }
                });
                // Add a circle layer
                map.current.addLayer({
                    'id': pool.id,
                    'type': 'symbol',
                    'source': pool.id,
                    'layout': {
                        'icon-image': pool.id,
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

            map.current.fitBounds(map.current.getBounds());
        })
    });

    return (
        <div>
            <div
                ref={mapContainer}
                className="map-container h-96 relative"
            />
        </div>
    )
}