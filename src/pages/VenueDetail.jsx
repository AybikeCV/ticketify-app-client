import { useEffect, useState } from "react";
import service from "../services/index.services";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Loader from "../components/Loader";

function VenueDetail() {
  const { id } = useParams();
  const [allVenues, setAllVenues] = useState(null);

  useEffect(() => {
    getVenueData();
  }, [id]);

  const getVenueData = async () => {
    try {
      const response = await service.get(`/venues/${id}`);
      console.log(response.data);
      setAllVenues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!allVenues) {
    return <Loader />;
  }

  const { venue, upcomingConcerts } = allVenues;
  const safeUpcomingConcerts = Array.isArray(upcomingConcerts) ? upcomingConcerts : [];

  const coordinates = venue?.location?.coordinates || [0, 0];

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <div className="h-[400px] overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold">{venue.name}</h1>

        <p className="text-zinc-400 mt-2">{venue.address}</p>

        <p className="text-zinc-400 mt-3">
          {venue.city}, {venue.country}
        </p>

        <p className="text-zinc-300 mt-6 leading-relaxed max-w-3xl">
          {venue.description}
        </p>

        <div className="mt-6 text-zinc-500">Capacity: {venue.capacity}</div>

        <div className="mt-12 rounded-xl overflow-hidden border border-zinc-800">
          <MapContainer
            center={[coordinates[1], coordinates[0]]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-[400px] w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[coordinates[1], coordinates[0]]}>
              <Popup>{venue.name}</Popup>
            </Marker>
          </MapContainer>

          <a //users can go to Google Maps//good for UX
            href={`https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#1B5E4A] hover:underline"
          >
            Open in Maps
          </a>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Concerts</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {safeUpcomingConcerts.map((concert) => (
              <Link key={concert._id} to={`/concerts/${concert._id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#1B5E4A]/40 transition hover:-translate-y-1">
                  <img
                    src={concert.image}
                    alt={concert.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{concert.title}</h3>

                    <p className="text-[#1B5E4A] mt-2">{concert.artist}</p>

                    <p className="text-zinc-500 mt-3">
                      {new Date(concert.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default VenueDetail;
