import React, { useRef, useState } from 'react';

const AudioPlayer = ({ id  }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);


    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    return (
        <div id={`audio-player-${id}`}>
            <audio
                ref={audioRef}
                src={`https://the-quran-project.github.io/Quran-Audio/Data/4/${id}.mp3`}
                autoPlay
                onEnded={handleEnded}
            />
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default AudioPlayer;
