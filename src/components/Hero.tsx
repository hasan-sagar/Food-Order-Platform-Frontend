import heroImage from "../assets/hero.png";

export default function Hero() {
  return (
    <div>
      <img
        src={heroImage}
        alt=""
        className="w-full max-h-[600px] object-cover"
      />
    </div>
  );
}
