import {
  AddressAutofill,
  AddressMinimap,
  config,
  useConfirmAddress,
} from "@mapbox/search-js-react";
import React, { useCallback, useEffect, useState } from "react";
import Form from "./components/FormComponent";
import MiniMap from "./components/MiniMap";

export default function FormPage({ setForm, setFormValue, FormValue }) {
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] = useState();
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");
  
  const [Value, setValue] = useState({
    Country: "",
    State: "",
    District: "",
    City: "",
    PostalCode: "",
    Street: "",
    Longitude: undefined,
    Latitude: undefined,
    Full_Address: "",
  });

  useEffect(() => {
    const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature) => {
      ["exact", "high", "low"].includes(
        feature.properties.match_code.confidence
      );
    },
  });

  const handleFeatureSelect = (feature) => {
   console.log(feature)
   const regex = /\d+/; // Regular expression to match one or more digits
   const numbers = feature.filter((item) => regex.test(item)).map((item) => parseInt(item));

      setValue((prevValue) => ({
    ...prevValue,
    PostalCode: numbers ,Full_Address:feature.join(", ")
  }))
  console.log(feature.join(", "))
  };

  const handleRetrieve = useCallback(
    (res) => {
      console.log(res);
      const feature = res.features[0];
      const { coordinates } = feature.geometry;
      const {
        country,
        
        region: state, // Rename 'region' to 'state'
        // region_code: state_code, // Rename 'statecode' to 'state_code'
        district,
        locality: city,
        street,
        postcode,
        full_address,
      } = feature.properties;
      setValue({
        Country: country,
        State: state,
        District: district,
        City: city,
        PostalCode: postcode,
        Street: street,
        Longitude: coordinates[0],
        Latitude: coordinates[1],
        Full_Address: full_address,
      });
      setFeature(feature);
      setShowMinimap(true);
    },
    [setFeature, setShowMinimap]
  );

  function handleSaveMarkerLocation(coordinate) {
    console.log(`Marker moved to ${JSON.stringify(coordinate)}.`);
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // console.log(inputValue)
      console.log(formRef);
      const result = await showConfirm();
      if (result.type === "nochange") submitForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showConfirm]
  );

  function submitForm() {
    setShowValidationText(true);
    setFormValue((pre) => [...pre, Value]);

    setTimeout(() => {
      resetForm();
      setForm(false);
    }, 2500);
  }

  function resetForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setValue({
      Country: "",
      State: "",
      District: "",
      City: "",
      PostalCode: "",
      Street: "",
      Longitude: undefined,
      Latitude: undefined,
      Full_Address: "",
    });
    setShowValidationText(false);
    setFeature(null);
    console.log(FormValue);
  }

  return (
    <div className="absolute z5  w-full min-h-fit bg-gray-200 p-24 ">
      <div className="text-end text-3xl text-black p-2 m-5">
        <button type="button" onClick={() => setForm(false)}>
          close
        </button>
      </div>
      <div className="w-full flex">
        <div className="w-1/2">
          <AddressAutofill
            accessToken={token}
            onRetrieve={handleRetrieve}
            popoverOptions={{
              placement: "top-start",
              flip: true,
              offset: 5,
            }}
            confirmOnBrowserAutofill={{
              minimap: true,
              skipConfirmModal: (feature) =>
                ["exact", "high", "low"].includes(
                  feature.properties.match_code.confidence
                ),
            }}
            theme={{
              variables: {
                colorPrimary: "myBrandRed",
              },
            }}
          >
            <Form
              REF={formRef}
              Value={Value}
              setValue={setValue}
              onSubmit={handleSubmit}
              ResetForm={resetForm}
            />
          </AddressAutofill>
        </div>
        <div className="w-1/2">
          <MiniMap
            lat={10.0274901}
            lng={10.0274901}
            setLat={(v) => setValue((pre) => ({ ...pre, Latitude: v }))}
            setLng={(v) => setValue((pre) => ({ ...pre, Longitude: v }))}
            updatePlaceName={handleFeatureSelect}
          />
        </div>
      </div>
      {/* Validation text */}
      {showValidationText && (
        <div id="validation-msg" className=" txt-bold mx-auto text-green-700">
          Order successfully submitted.
        </div>
      )}

      <div className="  py-10 text-center">
        Visual confirmation map
        <div id="minimap-container" className="h240 w360 mx-auto ">
          <AddressMinimap
            footer=""
            keepMarkerCentered
            adjustBtnText="Adjust"
            cancelBtnText="Cancel"
            canAdjustMarker={true}
            satelliteToggle={true}
            feature={feature}
            show={showMinimap}
            onSaveMarkerLocation={handleSaveMarkerLocation}
          />
        </div>
      </div>
    </div>
  );
}
