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


//bagian admin untuk melakukan uplaod barang, inisialisasi nya, jangan di ubah ubah!
export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "masukan judul barang kamu",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "deskripsikan nama barang kamu",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Shirt", label: "Shirt" },
      { id: "Pants", label: "Pants" },
      { id: "Shoes", label: "Shoes" },
      { id: "Vape", label: "Phone" },
      { id: "Phone", label: "Vape" },
    ],
  },
  {
    label: "harga",
    name: "price",
    componentType: "input",
    type: "text",
    placeholder: "masukan harga utama nya!",
    // gak jalan anjay buat ganti ke rupiah nya owkwkow
    format: (value) => new Intl.NumberFormat('id-ID').format(value),
    onInput: (event) => {
      const rawValue = event.target.value.replace(/\./g, "");
      const formattedValue = new Intl.NumberFormat('id-ID').format(Number(rawValue || 0));
      event.target.value = formattedValue;
    },
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "text",
    placeholder: "(optional) harga jual sebelum nya",
    format: (value) => new Intl.NumberFormat('id-ID').format(value),
    onInput: (event) => {
      const rawValue = event.target.value.replace(/\./g, "");
      const formattedValue = new Intl.NumberFormat('id-ID').format(Number(rawValue || 0));
      event.target.value = formattedValue;
    },
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "masukan stock barang nya",
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
    id: "Vape",
    label: "Vape",
    path: "/shop/listing",
  },
  {
    id: "Phone",
    label: "Phone",
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
  Vape: "Vape",
  Phone: "Phone",
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
    { id: "Shirt", label: " Shirt" },
    { id: "Pants", label: "Pants" },
    { id: "Shoes", label: "Shoes" },
    { id: "Vape", label: "Phone" },
    { id: "Phone", label: "Vape" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "alamat",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "masukan alamat kamu!",
  },
  {
    label: "kota",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "masukan kota kamu!",
  },
  {
    label: "kode pos",
    name: "pincode",
    componentType: "input",
    type: "number",
    placeholder: "masukan kode pos kamu!",
  },
  {
    label: "nomor handphone",
    name: "phone",
    componentType: "input",
    type: "number",
    placeholder: "masukan nomor handphone kamu!",
  },
  {
    label: "catatan",
    name: "notes",
    componentType: "textarea",
    placeholder: "berikan catatan di alamat kamu!",
  },
];
