// config cek buat bagian login sama register
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Masukan username kamu",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Masukan email kamu",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Masukan password kamu",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Masukan email kamu",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Masukan password kamu",
    componentType: "input",
    type: "password",
  },
];

//bagian p
export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Shirt", label: "Shirt" },
      { id: "Pants", label: "Pants" },
      { id: "Shoes", label: "Shoes" },
      { id: "phone", label: "phone" },
      { id: "Vape", label: "Vape" },
    ],
  },
  // {
  //   // label: "Brand",
  //   name: "brand",
  //   componentType: "select",
  //   options: [
  //     { id: "nike", label: "Nike" },
  //     { id: "adidas", label: "Adidas" },
  //     { id: "puma", label: "Puma" },
  //     { id: "levi", label: "Levi's" },
  //     { id: "zara", label: "Zara" },
  //     { id: "h&m", label: "H&M" },
  //   ],
  // },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "Shirt",
    label: "Shirt",
    path: "/shop/listing",
  },
  {
    id: "Pants",
    label: "Pants",
    path: "/shop/listing",
  },
  {
    id: "Shoes",
    label: "Shoes",
    path: "/shop/listing",
  },
  {
    id: "phone",
    label: "phone",
    path: "/shop/listing",
  },
  {
    id: "Vape",
    label: "Vape",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  Shirt: "Shirt",
  Pants: "Pants",
  Shoes: "Shoes",
  phone: "phone",
  Vape: "Vape",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "Shirt", label: "Shirt" },
    { id: "Pants", label: "Pants" },
    { id: "Shoes", label: "Shoes" },
    { id: "phone", label: "phone" },
    { id: "Vape", label: "Vape" },
  ],
  // brand: [
  //   { id: "nike", label: "Nike" },
  //   { id: "adidas", label: "Adidas" },
  //   { id: "puma", label: "Puma" },
  //   { id: "levi", label: "Levi's" },
  //   { id: "zara", label: "Zara" },
  //   { id: "h&m", label: "H&M" },
  // ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },

];


//input di bawah ini untuk bagian pengisian alamat di profile user dan akan di lempar ke bagian pembayaran dan cekot
export const addressFormControls = [
  {
    label: "Alamat",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "masukan alamat kamu!",
  },
  {
    label: "Kota",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "masukan kota kamu!",
  },
  {
    label: "Kodepos",
    name: "pincode",
    componentType: "input",
    type: "number",
    placeholder: "masukan kode pos kamu!",
  },
  {
    label: "Nohp",
    name: "phone",
    componentType: "input",
    type: "number",
    placeholder: "masukan nomor telephone kamu!",
  },
  {
    label: "Catatan",
    name: "notes",
    componentType: "textarea",
    placeholder: "catatan seperti patokan alamat, nama rumah, dll...",
  },
];
