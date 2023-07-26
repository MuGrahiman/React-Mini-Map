import { Popup } from "react-map-gl";

export default function POP({ Value, setPop, PopUp }) {
  return Value.map((Value, index) => {
    if (index === PopUp)
      return (
        <Popup
        
          anchor="top"
          longitude={Number(Value.Longitude)}
          latitude={Number(Value.Latitude)}
          onClose={() => setPop(false)}
        >
           <div className="w-100 h-100 flex flex-col text-center text-black ">
      <div className="">
        {Value.City} | {Value.State} | {Value.Country} | {Value.Street}
      </div>
            <a
              target="_new" className="text-blue-500 text-decoration-none"
       
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${Value.city}, ${Value.state}`}
            >
              Wikipedia
            </a> 
          </div>
        </Popup>
      );
  });
}
