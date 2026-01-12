import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Pause } from 'lucide-react';
import { musicTracks } from '../data/mock';

const Music = () => {
  const [selectedTrack, setSelectedTrack] = useState(musicTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
    setIsPlaying(true); // Autoplay enabled
  };

  const videoId = getYouTubeID(selectedTrack.youtubeUrl);

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg: px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            Music & Recordings
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Listen to my latest performances and original compositions
          </p>
        </motion.div>

        {/* Featured Player */}
        <motion.div
          initial={{ opacity: 0, scale:  0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b1810] to-[#1a1a1a] p-6 sm:p-8"
        >
          <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-black">
            {videoId ? (
              <iframe
                key={selectedTrack.id}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 :  0}&controls=1&modestbranding=1&rel=0`}
                title={selectedTrack.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Invalid YouTube URL
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm: items-center sm:justify-between">
            <div className="flex-1">
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
              >
                {selectedTrack.title}
              </h3>
              <p
                className="text-gray-400 mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {selectedTrack.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {selectedTrack.duration}
                </span>
                <span>Released: {selectedTrack.releaseDate}</span>
              </div>
            </div>
          </div>
        </motion. div>

        {/* Track List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicTracks.map((track, index) => {
            const isActive = selectedTrack.id === track. id;

            return (
              <motion. div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once:  true }}
                transition={{ duration:  0.6, delay: index * 0.1 }}
                onClick={() => handleSelectTrack(track)}
                className={`rounded-xl p-6 cursor-pointer transition-all border-2
                  ${isActive
                    ? 'bg-[#d4af37]/20 border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                    : 'bg-[#2b1810]/50 border-transparent hover: border-[#d4af37]/50'
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-4">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {track. title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {track.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTrack(track);
                    }}
                    className={`ml-2 p-3 rounded-full transition-all duration-300 flex-shrink-0
                      ${isActive 
                        ? 'bg-[#f5c842] scale-110' 
                        :  'bg-[#d4af37] hover:scale-110'
                      }`}
                  >
                    <Play size={18} fill="#0a0a0a" />
                  </button>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {track.duration}
                  </span>
                  <span>{track.releaseDate}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Streaming Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p
            className="text-lg text-gray-400 mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Listen on your favorite platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Spotify', 'SoundCloud', 'YouTube Music']. map((platform) => (
              <a
                key={platform}
                href="#"
                className="px-6 py-3 rounded-full font-medium transition-all duration-300"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#d4af37',
                  border: '2px solid #d4af37',
                  fontFamily: 'Poppins, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#d4af37';
                  e.target. style.color = '#0a0a0a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1a1a1a';
                  e.target.style.color = '#d4af37';
                }}
              >
                {platform}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import ReactPlayer from 'react-player';
// import { Play, Clock } from 'lucide-react';
// import { musicTracks } from '../data/mock';

// const Music = () => {
//   const [selectedTrack, setSelectedTrack] = useState(musicTracks[0]);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleSelectTrack = (track) => {
//     // Stop current playback
//     setIsPlaying(false);
    
//     // Change track
//     setSelectedTrack(track);
    
//     // Start new track after a brief delay
//     setTimeout(() => {
//       setIsPlaying(true);
//     }, 100);
//   };

//   return (
//     <section id="music" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y:  0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2
//             className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
//             style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
//           >
//             Music & Recordings
//           </h2>
//           <p
//             className="text-lg text-gray-400 max-w-2xl mx-auto"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             Listen to my latest performances and original compositions
//           </p>
//         </motion.div>

//         {/* Featured Player */}
//         <motion.div
//           initial={{ opacity: 0, scale:  0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b1810] to-[#1a1a1a] p-6 sm:p-8"
//         >
//           <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-black">
//             <ReactPlayer
//               key={selectedTrack.id} // ✅ Use ID instead of URL
//               url={selectedTrack.youtubeUrl}
//               width="100%"
//               height="100%"
//               controls
//               playing={isPlaying}
//               onPause={() => setIsPlaying(false)}
//               onPlay={() => setIsPlaying(true)}
//               onEnded={() => setIsPlaying(false)}
//               onError={(e) => console.error('Playback error:', e)}
//               config={{
//                 youtube: {
//                   playerVars: {
//                     modestbranding: 1,
//                     rel: 0,
//                     autoplay: 1,
//                   },
//                 },
//               }}
//             />
//           </div>
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h3
//                 className="text-2xl font-bold mb-2"
//                 style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
//               >
//                 {selectedTrack.title}
//               </h3>
//               <p
//                 className="text-gray-400 mb-2"
//                 style={{ fontFamily:  'Poppins, sans-serif' }}
//               >
//                 {selectedTrack.description}
//               </p>
//               <div className="flex items-center space-x-4 text-sm text-gray-500">
//                 <span className="flex items-center">
//                   <Clock size={16} className="mr-1" />
//                   {selectedTrack.duration}
//                 </span>
//                 <span>Released: {selectedTrack.releaseDate}</span>
//               </div>
//             </div>
//           </div>
//         </motion. div>

//         {/* Track List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {musicTracks.map((track, index) => {
//             const isActive = selectedTrack.id === track.id;

//             return (
//               <motion. div
//                 key={track.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once:  true }}
//                 transition={{ duration:  0.6, delay: index * 0.1 }}
//                 onClick={() => handleSelectTrack(track)}
//                 className={`rounded-xl p-6 cursor-pointer transition-all border-2
//                   ${isActive
//                     ? 'bg-[#d4af37]/20 border-[#d4af37]'
//                     :  'bg-[#2b1810]/50 border-transparent hover:border-[#d4af37]/50'
//                   }`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h4 className="text-xl font-bold text-white mb-1">
//                       {track.title}
//                     </h4>
//                     <p className="text-sm text-gray-400 line-clamp-2">
//                       {track.description}
//                     </p>
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleSelectTrack(track);
//                     }}
//                     className="ml-4 p-3 rounded-full bg-[#d4af37] hover:scale-110 transition flex-shrink-0"
//                   >
//                     <Play size={18} fill="#0a0a0a" />
//                   </button>
//                 </div>

//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span className="flex items-center">
//                     <Clock size={14} className="mr-1" />
//                     {track.duration}
//                   </span>
//                   <span>{track.releaseDate}</span>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Streaming Links */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="mt-16 text-center"
//         >
//           <p
//             className="text-lg text-gray-400 mb-6"
//             style={{ fontFamily: 'Poppins, sans-serif' }}
//           >
//             Listen on your favorite platform
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <a
//               href="#"
//               className="px-6 py-3 rounded-full font-medium transition-all duration-300"
//               style={{
//                 backgroundColor: '#1a1a1a',
//                 color: '#d4af37',
//                 border:  '2px solid #d4af37',
//                 fontFamily: 'Poppins, sans-serif',
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style. backgroundColor = '#d4af37';
//                 e.target.style. color = '#0a0a0a';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style. backgroundColor = '#1a1a1a';
//                 e.target. style.color = '#d4af37';
//               }}
//             >
//               Spotify
//             </a>
//             <a
//               href="#"
//               className="px-6 py-3 rounded-full font-medium transition-all duration-300"
//               style={{
//                 backgroundColor: '#1a1a1a',
//                 color: '#d4af37',
//                 border: '2px solid #d4af37',
//                 fontFamily:  'Poppins, sans-serif',
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = '#d4af37';
//                 e.target.style.color = '#0a0a0a';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = '#1a1a1a';
//                 e.target.style.color = '#d4af37';
//               }}
//             >
//               SoundCloud
//             </a>
//             <a
//               href="#"
//               className="px-6 py-3 rounded-full font-medium transition-all duration-300"
//               style={{
//                 backgroundColor: '#1a1a1a',
//                 color: '#d4af37',
//                 border: '2px solid #d4af37',
//                 fontFamily: 'Poppins, sans-serif',
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = '#d4af37';
//                 e.target.style.color = '#0a0a0a';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = '#1a1a1a';
//                 e.target.style.color = '#d4af37';
//               }}
//             >
//               YouTube Music
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Music;