import { Annotation, Camera, MapView, PointAnnotation } from "@maplibre/maplibre-react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet, StatusBar } from "react-native";
import api from "./api";

const style = {
        "version": 8,

          "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        "sources": {
                "osm": {
                        "type": "raster",
                        "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                        "tileSize": 256,
                        "attribution": "&copy; OpenStreetMap Contributors",
                        "maxzoom": 19
                },
                "martin": {
                        "type": "vector",
                        "tiles": ["http://172.20.10.12:3000/markers/{z}/{x}/{y}","http://172.20.10.12:3000/nyc_homicides/{z}/{x}/{y}"],
                        "attribution": "Martin",
                        "maxzoom": 19
                }
        },
        // so you first look up martin's catalog route, then you query with the actual tile id 
        // and there it gets advertised what source-layers (server-side called vector_layers) are available
        "layers": [
                {
                        "id": "osm",
                        "type": "raster",
                        "source": "osm" // This must match the source key above
                },
                {
                        "id": "helsinki-points",
                        "type": "circle",
                        "source": "martin",
                        "source-layer": "markers", // <- must match what Martin advertises
                        "paint": {
                        "circle-radius": 6,
                        "circle-color": "#FF0000"
                }

                },
                {
                        "id": "anythinghomicides",
                        "type": "circle",
                        "source": "martin",
                        "source-layer": "nyc_homicides",
                        "paint": {
                                "circle-color": "#888888",
                        }
                },
                {
                        "id": "anythingstreets",
                        "type": "line",
                        "source": "martin",
                        "source-layer": "nyc_streets",
                        "paint": {
                                "line-color": "#1e90ff",
                                "line-width": 3
                        }
                },
                // {
                //         "id": "country-borders",
                //         "type": "line",
                //         "source": "martin",
                //         "source-layer": "land-border-country",
                //         "paint": {
                //                 "line-color": "#000000",
                //                 "line-width": 2
                //         }
                // },
                // {
                //         "id": "country-labels",
                //         "type": "symbol",
                //         "source": "martin",
                //         "source-layer": "country-name",
                //         "layout": {
                //                 "text-field": "{NAME}",
                //                 "text-font": ["Open Sans Semibold"],
                //                 "text-size": 12
                //         },
                //         "paint": {
                //                 "text-color": "#333333"
                //         }
                // }
        ]
};
export default function App() {
        // const [inputValue, setInputValue] = useState("");
        // const [items, setItems] = useState([]);
        const [coords, setCoords] = useState([0, 0]);
        useEffect(() => {
                api.GET("/markers").then((v) => {
                        setCoords([v.data[0].longitude, v.data[0].latitude])
                })
        }, [])
        const [isExpanded, setIsExpanded] = useState(false)

        const addItem = () => {
                if (inputValue.trim() !== "") {
                        // setItems([...items, inputValue]);
                        // setInputValue("");
                }
        };
        const handleClick = (e) => {
                console.log(e)
        }
        return (
                <SafeAreaView style={styles.container}>
                        <Text style={styles.header}>My Basic UI</Text>
                        <MapView style={{ flex: 1 }} mapStyle={style} onPress={handleClick} >
                                <Camera zoomLevel={5} centerCoordinate={[25.1699,50.9384]}/>
                                <PointAnnotation
                                        id="marker-1"
                                        snippet=" YEA"
                                        coordinate={coords} // [longitude, latitude]
                                        onSelected={function() {

                                                api.POST("/markers", { body: { name: "Helsinki", longitude: 0.53215, latitude: 0.3126 } }).then(({ data, error, response }) => {
                                                        if (response.status != 200) {
                                                                console.log(error)
                                                        } else {
                                                                console.log(data)
                                                        }
                                                }).catch((e) => console.log(e, "ERROR"))
                                                setIsExpanded(true)
                                        }}
                                        style={styles.marker}
                                >
                                        <View style={styles.customMarker}>
                                                {isExpanded ? (
                                                        <Text style={styles.markerText}>FUN BOULDER</Text>
                                                )
                                                        : (
                                                                <Text style={styles.markerText}>Hidden Boulder</Text>

                                                        )
                                                }

                                        </View>
                                </PointAnnotation>
                        </MapView>
                </SafeAreaView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginTop: StatusBar.currentHeight,
                padding: 16,
                backgroundColor: "#f9f9f9",
        },
        header: {
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 16,
        },
        inputContainer: {
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
        },
        input: {
                flex: 1,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
                marginRight: 8,
                height: 40,
        },
        marker: {
                backgroundColor: "#000"
        },
        listItem: {
                padding: 12,
                backgroundColor: "#e0e0e0",
                borderRadius: 8,
                marginBottom: 8,
        },
        itemText: {
                fontSize: 16,
        },
});

