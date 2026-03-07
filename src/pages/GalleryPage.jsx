import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { SkeletonCard } from '../components/Loaders';
import { FaTimes, FaExpand, FaPlay } from 'react-icons/fa';

const GalleryPage = () => {
    const { data: gallery, loading } = useFetch('/api/gallery');
    const [selectedImage, setSelectedImage] = useState(null);

    if (loading) return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-64 bg-slate-800 rounded-xl animate-pulse"></div>)}
            </div>
        </div>
    );

    return (
        <div className="GalleryPage_container pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Gallery
                </h1>
                <p className="text-gray-400">Sneak peek into my life and workspace.</p>
            </motion.div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mx-auto">
                {gallery.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid shadow-lg border border-slate-700 hover:border-blue-500 transition-all"
                        onClick={() => setSelectedImage(item)}
                    >
                        {item.type === 'video' ? (
                            <div className="relative">
                                <video
                                    src={item.image}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                    muted
                                    loop
                                    onMouseOver={event => event.target.play()}
                                    onMouseOut={event => event.target.pause()}
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm border border-white/20">
                                        <FaPlay className="text-white text-xl pl-1" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={item.image}
                                alt={item.title || 'Gallery Image'}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                        )}

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <FaExpand className="text-white text-3xl" />
                        </div>
                        {item.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-bold">{item.title}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-12 right-0 text-white text-3xl hover:text-red-500 transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <FaTimes />
                            </button>

                            {selectedImage.type === 'video' ? (
                                <video
                                    src={selectedImage.image}
                                    className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                />
                            )}

                            {selectedImage.title && (
                                <p className="text-center text-white mt-4 text-xl font-bold">{selectedImage.title}</p>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
