import { useState } from "react";
import { supabase } from "../../supabaseClient";


export default function ProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("male");
  const [sizes, setSizes] = useState([]); // array of strings
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSize = (s) => {
    setSizes((prev) => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]));
  };

  const handleImagesChange = (index, value) => {
    setImages(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const payload = {
        name,
        desc,
        productimagelink: thumbnail,
        images: images.filter(Boolean),
        price: price ? Number(price) : null,
        category,
        sizes,
        stock: Number(stock) || 0,
        metadata: { createdBy: "admin-ui" }
      };

      const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      setMessage("Product added successfully");
      // reset form
      setName(""); setDesc(""); setThumbnail(""); setImages(["", "", "", "", ""]);
      setPrice(""); setCategory("male"); setSizes([]); setStock(0);
    } catch (err) {
      console.error(err);
      setMessage("Error: " + (err.message || "Failed to add"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Item name</label>
          <input value={name} onChange={e => setName(e.target.value)} required className="w-full input" />
        </div>

        <div>
          <label className="block text-sm">Item description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full input" />
        </div>

        <div>
          <label className="block text-sm">Thumbnail image (URL)</label>
          <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full input" />
        </div>

        <div>
          <label className="block text-sm">Gallery images (5)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {images.map((img, idx) => (
              <input
                key={idx}
                value={img}
                onChange={e => handleImagesChange(idx, e.target.value)}
                placeholder={`Image ${idx + 1} URL`}
                className="input"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Price</label>
            <input value={price} onChange={e => setPrice(e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="input">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm">Sizes available</label>
          <div className="flex gap-2 mt-2">
            {["XS","S","M","L","XL","XXL"].map(s => (
              <button
                type="button"
                key={s}
                onClick={() => toggleSize(s)}
                className={`px-3 py-1 rounded ${sizes.includes(s) ? "bg-yellow-400 text-black" : "bg-white/10"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm">Stock (total units)</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="input" />
        </div>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="btn-white px-4 py-2 rounded">
            {loading ? "Adding..." : "Add Product"}
          </button>
          <span className="text-sm text-green-300">{message}</span>
        </div>
      </form>
    </div>
  );
}
