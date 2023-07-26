import React from "react";

export default function Form({ REF, onSubmit, ResetForm, setValue, Value }) {
  return (
    <form
      ref={REF}
      onSubmit={onSubmit}
      className=" mx-auto px-2 my-2 rounded  flex flex-col top-[10%] left-[40%] w-1/2 h-max bg-white justify-evenly"
    >
      <div className="w-full text-center text-2xl font-serif font-semibold p-3">
        Add Your Pin
      </div>
      <label className="font-medium mt-1">Street Address</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="address"
        autoComplete="street-address"
        placeholder="Address"
        type="text"
        value={Value.Street}
        onChange={(e) =>  setValue((prevValue) => ({
          ...prevValue,
          Street: e.target.value 
        }))}
      />

      <label className="font-medium mt-1">City</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="city"
        autoComplete="address-level3"
        placeholder="City"
        value={Value.City}
        onChange={(e) =>  setValue((prevValue) => ({
          ...prevValue,
          City: e.target.value,
        }))}
        type="text"
      />
      <label className="font-medium mt-1">District</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="address"
        autoComplete="address-level2"
        placeholder="Address"
        type="text"
        value={Value.District}
        onChange={(e) =>   setValue((prevValue) => ({
          ...prevValue,
          District: e.target.value ,
        }))}
      />
      <label className="font-medium mt-1">State</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="state"
        autoComplete="address-level1"
        placeholder="State"
        value={Value.State}
        onChange={(e) =>  setValue((prevValue) => ({
          ...prevValue,
          State: e.target.value,
        }))}
        type="text"
      />

      <label className="font-medium mt-1">Country Name</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="country"
        autoComplete="country-name"
        placeholder="Country"
        value={Value.Country}
        onChange={(e) =>   setValue((prevValue) => ({
          ...prevValue,
          Country: e.target.value
        }))}
        type="text"
      />
      <label className="font-medium mt-1">Postal Code</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="postcode"
        autoComplete="postal-code"
        placeholder="Postcode"
        type="text"
        value={Value.PostalCode}
        onChange={(e) =>  setValue((prevValue) => ({
          ...prevValue,
          PostalCode: e.target.value,
        }))}
      />

      <label className="font-medium mt-1">Latitude</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="address"
        placeholder="Latitude"
        type="text"
        value={Value.Latitude}
        onChange={(e) =>  setValue((prevValue) => ({
          ...prevValue,
          Latitude: e.target.value ,
        }))}
      />
      <label className="font-medium mt-1">Longitude</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="address"
        placeholder="Longitude"
        type="text"
        value={Value.Longitude}
        onChange={(e) =>   setValue((prevValue) => ({
          ...prevValue,
          Longitude: e.target.value ,
        }))}
      />
      <label className="font-medium mt-1">Full Address</label>
      <input
        className="w-full ring-1  ring-gray-300 rounded-md p-1"
        name="address"
        // autoComplete="address-line2"
        placeholder="Longitude"
        type="text"
        value={Value.Full_Address}
        onChange={(e) =>   setValue((prevValue) => ({
          ...prevValue,
          Full_Address: e.target.value ,
        }))}
      />
      <div className="w-full text-center text-lg px-0 my-[13px] gap-1">
        <button
          type="submit"
          className="w-5/12  p-1 rounded-lg text-center font-serif transition ease-in-out delay-150 bg-gray-50 ring-1  ring-gray-300 hover:-translate-x-1 hover:scale-110 hover:bg-blue-600 duration-300 "
        >
          submit
        </button>

        <button
          className="w-5/12  p-1 rounded-lg text-center font-serif transition ease-in-out delay-150 bg-gray-50 ring-1  ring-gray-300 hover:-translate-x-1 hover:scale-110 hover:bg-blue-600 duration-300 "
          type="button"
          //  className="btn round btn--gray-light ml3" id="btn-reset"
          onClick={ResetForm}
        >
          {" "}
          Reset
        </button>
      </div>
    </form>
  );
}
