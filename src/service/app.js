import axios from "axios";

const apiInfoAddress = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Lấy danh sách tỉnh/thành phố
export const fetchProvinces = async () => {
  try {
    const res = await apiInfoAddress.get("/");
    console.log("Provinces:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

// Lấy chi tiết tỉnh/thành phố theo code (bao gồm quận/huyện và phường/xã)
export const fetchProvinceDetail = async (provinceCode) => {
  try {
    const res = await apiInfoAddress.get(`/p/${provinceCode}?depth=3`);
    console.log("Province detail:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching province detail:", error);
    throw error;
  }
};
