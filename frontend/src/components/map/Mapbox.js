import Map, {Source, Layer} from 'react-map-gl';
import {useEffect, useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import axiosConfig from "../../api/axiosConfig";

const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    }
};

export function Mapbox() {
    const [viewState, setViewState] = useState({
        longitude: -94.60098399999998,
        latitude: 29.66140400000006,
        zoom: 10
    });
    const [geoJSON, setGeoJSON] = useState({});

    
    useEffect(() => {
        axiosConfig.get("/get_geojson_pipeline/").then(response => {
            setGeoJSON(response.data);
        })
    }, [])
    return (
        <Map {...viewState}
             onMove={evt => setViewState(evt.viewState)}
             mapboxAccessToken="pk.eyJ1IjoidHlzdGVyZyIsImEiOiJjbDFwYnF2cmQwdGIzM2xtamF6Zmhqb2dpIn0.ujCKFeNPbcfb0oGDwzwvlw"
             style={{width: "100%", height: 700}}
             mapStyle="mapbox://styles/mapbox/light-v9"
             onMouseMove={onHover}>
            <Source id="my-data" type="geojson" data={geoJSON}>
                <Layer
                    id="lineLayer"
                    type="line"
                    source="my-data"
                    layout={{
                        "line-join": "round",
                        "line-cap": "round"
                    }}
                    paint={{
                        "line-color": "rgba(255,0,0,0.5)",
                        "line-width": viewState.zoom > 10 ? 2 : 1
                    }}
                />
            </Source>
        </Map>
    );
}