import appImage from "../assets/mobile.png";
import appDownload from "../assets/appDownload.png";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-white rounded-lg shadow-xl py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-[#75A107]">
          Touch into a takeway today
        </h1>
        <span className="text-xl">Food is just a click way</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={appImage} alt="" className="h-[500px]" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order Takeway Faster
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownload} alt="" />
        </div>
      </div>
    </div>
  );
}
