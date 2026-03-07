import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { FaStar, FaQuoteLeft, FaPen } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Spinner } from '../Loaders';
import ReviewModal from '../ReviewModal';

const ReviewsSection = () => {
    const { data: reviews, loading } = useFetch('/api/reviews');
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <div className="py-20"><Spinner /></div>;

    return (
        <section className="py-20 relative overflow-hidden bg-[var(--bg-card)]/50 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-4">Client Reviews</h2>
                        <p className="text-gray-400">What people say about working with me.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all font-semibold"
                    >
                        <FaPen /> Write a Review
                    </button>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center py-10 bg-[var(--bg-card)] rounded-xl border border-slate-800">
                        <p className="text-gray-400 mb-4">No reviews yet. Be the first!</p>
                        <button onClick={() => setIsModalOpen(true)} className="text-primary underline">Write a Review</button>
                    </div>
                ) : (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-12"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review._id}>
                                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 h-full relative">
                                    <FaQuoteLeft className="text-blue-500/20 text-4xl mb-4" />
                                    <div className="flex text-yellow-500 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-700'} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic mb-6">"{review.comment}"</p>
                                    <div>
                                        <h4 className="font-bold text-white">{review.name}</h4>
                                        <p className="text-xs text-gray-500">Client</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
            <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};

export default ReviewsSection;
