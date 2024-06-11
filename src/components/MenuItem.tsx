import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: any;
  addToCart?: any;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <>
      <Card
        className="cursor-pointer border-none
      hover:shadow-md transition-all duration-300 rounded-sm"
        onClick={addToCart}
      >
        <CardHeader>
          <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">BDT{menuItem.price}</CardContent>
      </Card>
    </>
  );
};

export default MenuItem;
