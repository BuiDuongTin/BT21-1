// Helper: lấy element và set text
function setText(id, text) {
  document.getElementById(id).textContent = text;
}

// Helper: format tiền VNĐ
function formatVND(n) {
  return Number(n).toLocaleString("vi-VN") + " VNĐ";
}

/* =========================
   Câu 1: Constructor Product
   ========================= */
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

setText(
  "cau1",
  [
    "Đã khai báo constructor function Product(id, name, price, quantity, category, isAvailable).",
    "Thuộc tính mỗi Product:",
    "- id: mã sản phẩm",
    "- name: tên sản phẩm",
    "- price: giá sản phẩm",
    "- quantity: số lượng tồn kho",
    "- category: danh mục",
    "- isAvailable: trạng thái bán (true/false)",
  ].join("\n")
);

/* =========================================
   Câu 2: Khởi tạo mảng products (>= 6 sp)
   ít nhất 2 danh mục khác nhau
   ========================================= */
const products = [
  new Product(1, "iPhone 15 Pro Max", 35000000, 10, "Electronics", true),
  new Product(2, "Samsung S24 Ultra", 32000000, 15, "Electronics", true),
  new Product(3, "MacBook Pro M3", 45000000, 0, "Electronics", false),
  new Product(4, "AirPods Pro 2", 6500000, 30, "Accessories", true),
  new Product(5, "Apple Watch Ultra 2", 22000000, 8, "Accessories", true),
  new Product(6, "Magic Keyboard", 4500000, 2, "Accessories", true),
];

const categories = [...new Set(products.map((p) => p.category))];

setText(
  "cau2",
  [
    `Đã tạo mảng products gồm ${products.length} sản phẩm.`,
    `Danh mục hiện có (${categories.length}): ${categories.join(", ")}.`,
  ].join("\n")
);

/* =========================
   Hiển thị bảng sản phẩm
   ========================= */
function renderProductTable(list) {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Tên sản phẩm</th>
        <th>Giá</th>
        <th>Tồn kho</th>
        <th>Danh mục</th>
        <th>Đang bán</th>
      </tr>
    </thead>
    <tbody>
      ${list
        .map(
          (p) => `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${formatVND(p.price)}</td>
          <td>${p.quantity}</td>
          <td>${p.category}</td>
          <td class="${p.isAvailable ? "ok" : "no"}">${
            p.isAvailable ? "true" : "false"
          }</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;
  const container = document.getElementById("productTable");
  container.innerHTML = "";
  container.appendChild(table);
}

renderProductTable(products);

/* ==================================
   Câu 3: Tạo mảng mới chỉ name, price
   ================================== */
const namePriceList = products.map((p) => ({ name: p.name, price: p.price }));

setText(
  "cau3",
  "Mảng mới (name, price):\n" +
    namePriceList
      .map((x, i) => `${i + 1}. ${x.name} - ${formatVND(x.price)}`)
      .join("\n")
);

/* =======================================
   Câu 4: Lọc sản phẩm còn hàng (quantity>0)
   ======================================= */
const inStock = products.filter((p) => p.quantity > 0);

setText(
  "cau4",
  `Có ${inStock.length} sản phẩm còn hàng:\n` +
    inStock
      .map((p, i) => `${i + 1}. ${p.name} (SL: ${p.quantity})`)
      .join("\n")
);

/* ==================================================
   Câu 5: Kiểm tra có ít nhất 1 sp giá > 30.000.000 ?
   ================================================== */
const hasOver30m = products.some((p) => p.price > 30000000);
const over30mList = products.filter((p) => p.price > 30000000);

setText(
  "cau5",
  `Kết quả: ${hasOver30m}\n` +
    (hasOver30m
      ? "Các sản phẩm > 30.000.000:\n" +
        over30mList
          .map((p, i) => `${i + 1}. ${p.name} - ${formatVND(p.price)}`)
          .join("\n")
      : "Không có sản phẩm nào > 30.000.000")
);

/* ===========================================================
   Câu 6: Kiểm tra tất cả sản phẩm category = "Accessories"
         có isAvailable = true không?
   =========================================================== */
const accessories = products.filter((p) => p.category === "Accessories");
const allAccessoriesAvailable = accessories.every((p) => p.isAvailable === true);

setText(
  "cau6",
  `Kết quả: ${allAccessoriesAvailable}\n` +
    "Danh sách Accessories:\n" +
    accessories
      .map((p, i) => `${i + 1}. ${p.name} - isAvailable: ${p.isAvailable}`)
      .join("\n")
);

/* ======================================
   Câu 7: Tính tổng giá trị kho (price*quantity)
   ====================================== */
const totalInventoryValue = products.reduce(
  (sum, p) => sum + p.price * p.quantity,
  0
);

setText(
  "cau7",
  "Tổng giá trị kho hàng = Σ(price * quantity)\n" +
    `Tổng: ${formatVND(totalInventoryValue)}\n\n` +
    "Chi tiết:\n" +
    products
      .map(
        (p, i) =>
          `${i + 1}. ${p.name}: ${formatVND(p.price)} * ${
            p.quantity
          } = ${formatVND(p.price * p.quantity)}`
      )
      .join("\n")
);

/* ==========================================
   Câu 8: Dùng for...of duyệt products in:
          Tên - Danh mục - Trạng thái
   ========================================== */
let cau8Out = "Duyệt bằng for...of:\n";
let idx8 = 1;
for (const p of products) {
  cau8Out += `${idx8}. ${p.name} - ${p.category} - ${
    p.isAvailable ? "Đang bán" : "Ngừng bán"
  }\n`;
  idx8++;
}
setText("cau8", cau8Out.trimEnd());

/* ==========================================
   Câu 9: Dùng for...in để:
          - In ra tên thuộc tính
          - In ra giá trị tương ứng
   (demo trên sản phẩm đầu tiên)
   ========================================== */
const first = products[0];
let cau9Out = `for...in trên sản phẩm: ${first.name}\n` + "-".repeat(45) + "\n";

for (const key in first) {
  // in ra tên thuộc tính và giá trị tương ứng
  const value = key === "price" ? formatVND(first[key]) : first[key];
  cau9Out += `${key}: ${value}\n`;
}
setText("cau9", cau9Out.trimEnd());

/* ==========================================
   Câu 10: Lấy danh sách tên sản phẩm đang bán
           và còn hàng (isAvailable=true & quantity>0)
   ========================================== */
const sellingAndInStockNames = products
  .filter((p) => p.isAvailable === true && p.quantity > 0)
  .map((p) => p.name);

setText(
  "cau10",
  `Có ${sellingAndInStockNames.length} sản phẩm đang bán và còn hàng:\n` +
    sellingAndInStockNames.map((name, i) => `${i + 1}. ${name}`).join("\n")
);

/* =========================
   Console log (tuỳ chọn)
   ========================= */
console.log("products:", products);
console.log("Câu 3 (namePriceList):", namePriceList);
console.log("Câu 4 (inStock):", inStock);
console.log("Câu 5 (hasOver30m):", hasOver30m, over30mList);
console.log("Câu 6 (allAccessoriesAvailable):", allAccessoriesAvailable);
console.log("Câu 7 (totalInventoryValue):", totalInventoryValue);
console.log("Câu 10 (sellingAndInStockNames):", sellingAndInStockNames);