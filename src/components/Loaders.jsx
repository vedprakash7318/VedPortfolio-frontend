import { motion } from 'framer-motion';

export const Spinner = () => (
    <div className="flex justify-center items-center h-40">
        <motion.div
            className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    </div>
);

export const SkeletonCard = () => (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 animate-pulse">
        <div className="h-48 bg-slate-700"></div>
        <div className="p-6 space-y-4">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-700 rounded w-full"></div>
            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
        </div>
    </div>
);

export const PageLoader = () => (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-center">
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
            Portfolio.
        </motion.div>
        <Spinner />
    </div>
);
