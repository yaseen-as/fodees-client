import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};
const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

export default function SortOptionDropdoune({ onChange, sortOption }: Props) {
  const selectedSortOPtion =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sorted by:{selectedSortOPtion}
        </Button>
      </DropdownMenuTrigger>
      {SORT_OPTIONS.map((option) => (
        <DropdownMenuContent
          className="cursor-pointer"
          onChange={() => onChange(option.value)}
        >
          {option.label}
        </DropdownMenuContent>
      ))}
    </DropdownMenu>
  );
}
