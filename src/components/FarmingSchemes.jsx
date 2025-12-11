import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FarmingSchemes = ({ onClose }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await fetch("http://127.0.0.1:5000/api/scrape");

        const res = await fetch("http://127.0.0.1:5000/api/news");
        const data = await res.json();
        setNews(data.news);
      } catch (error) {
        console.error("Fetch error:", error);
      }
      setLoading(false);
    };

    load();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-3"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full relative"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-xl hover:scale-110 transition"
            onClick={onClose}
          >
            ❌
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-4 rounded-xl shadow mb-5">
            <h2 className="text-2xl font-extrabold tracking-wide">
              🌾 Kerala Farming Schemes
            </h2>
            <p className="opacity-90 text-sm">Latest verified updates</p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="border-4 border-green-500 border-t-transparent rounded-full w-12 h-12 mx-auto"
              ></motion.div>
              <p className="mt-4 text-gray-600">Fetching latest schemes...</p>
            </div>
          ) : (
            <div className="max-h-[450px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 border rounded-xl shadow-sm hover:shadow-lg hover:bg-green-50 transition cursor-pointer"
                >
                  {/* Title */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-green-700 hover:underline"
                  >
                    {item.title}
                  </a>

                  {/* Date (if available) */}
                  {item.date && (
                    <p className="text-sm text-gray-500 mt-1">📅 {item.date}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FarmingSchemes;
