import React, { useEffect, useState, Component } from "react";
import "./longdomap.css";
import { longdo, map, LongdoMap } from "../../../longdo-map/LongdoMap";



//replace a LongdoMap.js file

interface MyProps {}

interface MyState {
  error: any;
  isLoaded: boolean;
  projectlist: any;
}

class Map extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      projectlist: [],
    };
  }
  async componentDidMount() {
    await fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            projectlist: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  initMap() {
    map.Layers.setBase(longdo.Layers.GRAY);
    map.bound({
      minLon: 100,
      minLat: 13,
      maxLon: 105,
      maxLat: 19,
    });
    map.zoom(7, true);
  }

  render() {
    const mapKey = "b8ef95379aca2f8fa1c2c5e473ca6cbc";
    const { isLoaded, projectlist } = this.state;

    return (
      
      <div className="classMap" style={{ height: 450 }}>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
        {projectlist?.map((projectlist: any) => {
          var marker1 = new longdo.Marker(
            {
              lon: projectlist.long,
              lat: projectlist.lat,
            },
            {
              title: `NAME: ${projectlist.projectname}`,
              detail: `NAME: ${projectlist.projectname}
                      RID: ${projectlist.ridnum}`,
              visibleRange: { min: 7, max: 9 },
              draggable: false,
              weight: longdo.OverlayWeight.Top,
            },
          );
          map.Overlays.add(marker1);
        })}
      </div>
    );
  }
}

export default Map;
