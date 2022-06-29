import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";
function App() {
  const [viewport, setViewport] = React.useState({
    longitude: 83,
    latitude: 23.5,
    zoom: 3,
  });
  const [addEntryLocation, setAddEntryLocation] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState({});
  const [logEntries, setLogEntries] = React.useState([]);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  React.useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    setAddEntryLocation({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  };
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={(e) => showAddMarkerPopup(e)}
    >
      {logEntries.map((entry) => (
        <Marker
          key={entry._id}
          longitude={entry.longitude}
          latitude={entry.latitude}
          anchor="bottom"
         
        >
          <svg
            className="marker red"
            style={{
              width: `${7 * viewport.zoom}px`,
              height: `${7 * viewport.zoom}px`,
              
            }}
            viewBox="0 0 1024.000000 1024.000000"
            onClick={() => setShowPopup({ ...showPopup, [entry._id]: true })}
          >
            <g
              transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M4900 10234 c-686 -61 -1235 -273 -1760 -680 -142 -110 -397 -362
-514 -509 -375 -469 -597 -995 -682 -1610 -25 -182 -25 -607 0 -790 45 -328
131 -639 253 -908 52 -113 2917 -5727 2923 -5727 4 0 2308 4507 2761 5400 170
338 204 414 271 610 284 836 201 1788 -224 2555 -152 275 -326 505 -557 735
-508 506 -1123 807 -1851 905 -110 15 -523 28 -620 19z m410 -1284 c229 -24
435 -82 639 -180 608 -294 1011 -868 1081 -1540 67 -652 -219 -1312 -743
-1712 -968 -739 -2362 -408 -2893 687 -328 675 -235 1462 242 2052 398 491
1043 758 1674 693z"
              />
            </g>
          </svg>
          {showPopup[entry._id] ? (
            <Popup
              longitude={entry.longitude}
              latitude={entry.latitude}
              anchor="top"
              onClose={() => setShowPopup({ ...showPopup, [entry._id]: false })}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  <i>
                    Visited on:{new Date(entry.visitDate).toLocaleDateString()}
                  </i>
                </small>
                {entry.image ? (
                  <img src={entry.image} alt={entry.title} />
                ) : null}
              </div>
            </Popup>
          ) : null}
        </Marker>
      ))}

      {addEntryLocation ? (
        <>
          <Marker
            longitude={addEntryLocation.longitude}
            latitude={addEntryLocation.latitude}
            anchor="bottom"
          >
            <svg
              className="marker orange"
              style={{
                width: `${7 * viewport.zoom}px`,
                height: `${7 * viewport.zoom}px`,
              }}
              viewBox="0 0 1024.000000 1024.000000"
            >
              <g
                transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M4900 10234 c-686 -61 -1235 -273 -1760 -680 -142 -110 -397 -362
-514 -509 -375 -469 -597 -995 -682 -1610 -25 -182 -25 -607 0 -790 45 -328
131 -639 253 -908 52 -113 2917 -5727 2923 -5727 4 0 2308 4507 2761 5400 170
338 204 414 271 610 284 836 201 1788 -224 2555 -152 275 -326 505 -557 735
-508 506 -1123 807 -1851 905 -110 15 -523 28 -620 19z m410 -1284 c229 -24
435 -82 639 -180 608 -294 1011 -868 1081 -1540 67 -652 -219 -1312 -743
-1712 -968 -739 -2362 -408 -2893 687 -328 675 -235 1462 242 2052 398 491
1043 758 1674 693z"
                />
              </g>
            </svg>
            <Popup
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
              onClose={() => setAddEntryLocation(null)}
            >
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </Popup>
          </Marker>
        </>
      ) : null}
    </Map>
  );
}
export default App;
