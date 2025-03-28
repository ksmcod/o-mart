export interface SelectOptionType {
  value: string;
  label: string;
}

type ProductCategory = SelectOptionType[];

interface ProductSubCategory {
  category: string;
  sub_categories: SelectOptionType[];
}

export const product_categories: ProductCategory = [
  { value: "mobiles_and_accessories", label: "Mobiles and Accessories" },
  { value: "computers_and_accessories", label: "Computers and Accessories" },
  { value: "gaming_and_consoles", label: "Gaming and Consoles" },
  { value: "audio_and_headphones", label: "Audio and Headphones" },
];

export const product_sub_categories: ProductSubCategory[] = [
  {
    category: "mobiles_and_accessories",
    sub_categories: [
      { value: "smartphones", label: "Smartphones" },
      { value: "tablets", label: "Tablets" },
      { value: "smartwatches", label: "Smart Watches" },
      { value: "chargers_and_cables", label: "Chargers and Cables" },
      { value: "powerbanks", label: "Power Banks" },
    ],
  },
  {
    category: "computers_and_accessories",
    sub_categories: [
      { value: "laptop_computers", label: "Laptops" },
      { value: "desktop_computers", label: "Desktops" },
      { value: "monitors", label: "Monitors" },
      { value: "keyboards_and_mice", label: "Keyboards and Mice" },
      { value: "harddrives_and_ssds", label: "Hard Drives and SSDs" },
      { value: "printers_and_scanners", label: "Printers and Scanners" },
      { value: "chargers_and_cables", label: "Chargers and Cables" },
    ],
  },
  {
    category: "gaming_and_consoles",
    sub_categories: [
      { value: "gaming_laptops", label: "Gaming Laptops" },
      { value: "gaming_consoles", label: "Gaming Consoles" },
      { value: "gaming_controllers", label: "Gaming Controllers" },
      { value: "vr_headsets", label: "VR Headsets" },
      { value: "gaming_chairs_and_desks", label: "Gaming Chairs and Desks" },
    ],
  },
  {
    category: "audio_and_headphones",
    sub_categories: [
      { value: "earbuds_and_headphones", label: "Earbuds and Headphones" },
      { value: "speakers", label: "Speakers" },
    ],
  },
];
