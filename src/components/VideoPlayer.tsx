import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaTimes } from 'react-icons/fa';

interface VideoPlayerProps {
  src: string;
  thumbnail?: string;
  title?: string;
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onClose?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  thumbnail,
  title,
  className = '',
  showControls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop video when component unmounts or onClose is called
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  // Handle onClose prop changes
  useEffect(() => {
    if (onClose && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setShowThumbnail(true);
    }
  }, [onClose]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  const handleVideoClick = () => {
    if (showThumbnail) {
      togglePlay();
    } else {
      // Toggle controls visibility when video is playing
      setShowControlsOverlay(!showControlsOverlay);
    }
  };

  const handleMouseEnter = () => {
    if (!showThumbnail) {
      setShowControlsOverlay(true);
    }
  };

  const handleMouseLeave = () => {
    if (!showThumbnail) {
      setShowControlsOverlay(false);
    }
  };

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        onClick={handleVideoClick}
      />

      {/* Thumbnail Overlay */}
      {showThumbnail && thumbnail && (
        <div
          className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
          onClick={handleVideoClick}
        >
          <img
            src={thumbnail}
            alt={title || 'Video thumbnail'}
            className="w-full h-full object-cover"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <FaPlay className="w-5 h-5 text-gray-600 ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Video Controls */}
      {showControls && !showThumbnail && (
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity ${showControlsOverlay ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between text-white">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPlaying ? (
                <FaPause className="w-4 h-4" />
              ) : (
                <FaPlay className="w-4 h-4" />
              )}
            </button>

            {/* Title */}
            {title && (
              <span className="text-sm font-medium truncate flex-1 mx-3">
                {title}
              </span>
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                {isMuted ? (
                  <FaVolumeMute className="w-4 h-4" />
                ) : (
                  <FaVolumeUp className="w-4 h-4" />
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaExpand className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Video Player for fullscreen experience
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  src,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <VideoPlayer
          src={src}
          title={title}
          className="w-full h-full"
          showControls={true}
          autoPlay={true}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
