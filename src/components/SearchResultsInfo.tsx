import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

export default function SearchResultsInfo({ total, city }: Props) {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurant found in {city}
        <Link className="text-sm ml-2 font-medium" to="/">
          Back to search page
        </Link>
      </span>
    </div>
  );
}
