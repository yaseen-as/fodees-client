import { Restourent } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restourent: Restourent;
};

function SearchResultCard({ restourent }: Props) {
  return (
    <div>
      <Link
        to={`/detail/${restourent._id}`}
        className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
      >
        <AspectRatio ratio={16 / 6}>
          <img
            src={restourent.imageUrl}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
            {restourent.restaurantName}
          </h3>
          <div id="card-content" className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-row flex-wrap ">
              {restourent.cuisines.map((item, index) => (
                <span className="flex">
                  <span>
                    {item}
                    {index < restourent.cuisines.length - 1 && <Dot />}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="text-green-600" />
                {restourent.estimatedDeliveryTime}mins
              </div>
              <div className="flex gap-1 items-center">
                <Banknote />
                Delivery from ${(restourent.deliveryPrice / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SearchResultCard;
